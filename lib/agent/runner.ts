import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import type { AgentStreamEvent, Citation } from "@/types/agent";
import { serverEnv } from "@/lib/env";
import { sampleLedger, type LedgerSource } from "@/lib/agent/ledger";
import { CLOSE_AGENT_SYSTEM_PROMPT } from "@/lib/agent/prompts";
import { getPolicyIndex } from "@/lib/agent/retrieval";
import { closeAgentTools, executeTool, type ToolContext } from "@/lib/agent/tools";

export interface RunAgentOptions {
  messages: Anthropic.MessageParam[];
  emit: (event: AgentStreamEvent) => void;
  signal?: AbortSignal;
  ledger?: LedgerSource;
}

let client: Anthropic | undefined;

function anthropic(): Anthropic {
  client ??= new Anthropic({ apiKey: serverEnv().ANTHROPIC_API_KEY });
  return client;
}

/**
 * Runs the close agent: streams model text to the caller, executes tool calls against the ledger
 * and policy index, and loops until the model finishes or the turn budget is spent.
 */
export async function runCloseAgent({ messages, emit, signal, ledger = sampleLedger }: RunAgentOptions): Promise<void> {
  const { ANTHROPIC_MODEL, AGENT_MAX_TURNS } = serverEnv();
  const ctx: ToolContext = { ledger, policies: await getPolicyIndex() };
  const history: Anthropic.MessageParam[] = [...messages];
  const cited = new Set<string>();

  const emitCitations = (citations: Citation[]) => {
    for (const citation of citations) {
      const key = `${citation.kind}:${citation.ref}`;
      if (cited.has(key)) continue;
      cited.add(key);
      emit({ type: "citation", citation });
    }
  };

  for (let turn = 1; turn <= AGENT_MAX_TURNS; turn++) {
    const stream = anthropic().messages.stream(
      {
        model: ANTHROPIC_MODEL,
        max_tokens: 16000,
        thinking: { type: "adaptive" },
        system: [{ type: "text", text: CLOSE_AGENT_SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
        tools: closeAgentTools,
        messages: history,
      },
      { signal },
    );

    stream.on("text", (delta) => emit({ type: "text", delta }));
    const message = await stream.finalMessage();
    history.push({ role: "assistant", content: message.content });

    const toolUses = message.content.filter((block): block is Anthropic.ToolUseBlock => block.type === "tool_use");

    if (message.stop_reason === "refusal") {
      emit({ type: "error", message: "The request was declined. Rephrase the question around your ledger." });
      emit({ type: "done", stopReason: message.stop_reason, turns: turn });
      return;
    }

    if (message.stop_reason === "max_tokens" && toolUses.length > 0) {
      // A tool call cut off mid-input cannot be trusted; stop rather than run it.
      emit({ type: "error", message: "The response was cut off before a tool call completed." });
      emit({ type: "done", stopReason: message.stop_reason, turns: turn });
      return;
    }

    if (message.stop_reason !== "tool_use" || toolUses.length === 0) {
      emit({ type: "done", stopReason: message.stop_reason, turns: turn });
      return;
    }

    for (const toolUse of toolUses) {
      emit({ type: "tool_call", id: toolUse.id, name: toolUse.name, input: toolUse.input });
    }

    // Run every call from this turn concurrently and return all results in one user message.
    const results = await Promise.all(
      toolUses.map(async (toolUse): Promise<Anthropic.ToolResultBlockParam> => {
        const execution = await executeTool(toolUse.name, toolUse.input, ctx);
        emit({ type: "tool_result", id: toolUse.id, name: toolUse.name, ok: execution.ok, summary: execution.summary });
        if (execution.ok) emitCitations(execution.citations);
        return {
          type: "tool_result",
          tool_use_id: toolUse.id,
          content: execution.content,
          ...(execution.ok ? {} : { is_error: true }),
        };
      }),
    );

    history.push({ role: "user", content: results });
  }

  emit({ type: "error", message: `Stopped after ${AGENT_MAX_TURNS} tool turns without a final answer.` });
  emit({ type: "done", stopReason: null, turns: AGENT_MAX_TURNS });
}
