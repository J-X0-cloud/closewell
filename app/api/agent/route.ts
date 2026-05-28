import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { renderRequestContext } from "@/lib/agent/prompts";
import { runCloseAgent } from "@/lib/agent/runner";
import { encodeEvent } from "@/lib/agent/stream";
import { serverEnv } from "@/lib/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().trim().min(1).max(8000),
});

const requestSchema = z.object({
  messages: z
    .array(messageSchema)
    .min(1)
    .max(40)
    .refine((messages) => messages.at(-1)?.role === "user", "The last message must come from the user"),
  context: z
    .object({
      entity: z.enum(["US", "UK", "DE"]).optional(),
      period: z
        .string()
        .regex(/^\d{4}-\d{2}$/)
        .optional(),
      reviewer: z.object({ name: z.string().max(80), role: z.string().max(80) }).optional(),
    })
    .default({}),
});

/**
 * POST /api/agent
 * Streams the close agent's answer as newline-delimited JSON events
 * (text deltas, tool calls, tool results, citations, done).
 */
export async function POST(request: Request): Promise<Response> {
  if (!serverEnv().ANTHROPIC_API_KEY) {
    return Response.json({ error: "The agent is not configured on this deployment." }, { status: 503 });
  }

  const body = await request.json().catch(() => null);
  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Invalid request", issues: parsed.error.flatten() }, { status: 400 });
  }

  const { messages, context } = parsed.data;
  const lastIndex = messages.length - 1;
  const history: Anthropic.MessageParam[] = messages.map((message, i) =>
    i === lastIndex
      ? { role: "user", content: `${renderRequestContext(context)}\n\n${message.content}` }
      : { role: message.role, content: message.content },
  );

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const emit = (event: Parameters<typeof encodeEvent>[0]) => controller.enqueue(encodeEvent(event));
      try {
        await runCloseAgent({ messages: history, emit, signal: request.signal });
      } catch (error) {
        emit({ type: "error", message: describeError(error) });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "application/x-ndjson; charset=utf-8",
      "cache-control": "no-store",
      "x-accel-buffering": "no",
    },
  });
}

function describeError(error: unknown): string {
  if (error instanceof Anthropic.RateLimitError) return "The agent is busy. Try again in a moment.";
  if (error instanceof Anthropic.AuthenticationError) return "The agent's API credentials were rejected.";
  if (error instanceof Anthropic.APIUserAbortError) return "Request cancelled.";
  if (error instanceof Anthropic.APIError) return `Model request failed (${error.status ?? "network"}).`;
  return "Something went wrong while preparing the answer.";
}
