import type { AgentStreamEvent } from "@/types/agent";

const encoder = new TextEncoder();

/** Encodes one agent event as a line of newline-delimited JSON. */
export function encodeEvent(event: AgentStreamEvent): Uint8Array {
  return encoder.encode(`${JSON.stringify(event)}\n`);
}

/**
 * Reads an NDJSON agent stream in the browser, yielding events as they arrive. Partial lines are
 * buffered until their newline lands.
 */
export async function* readAgentStream(body: ReadableStream<Uint8Array>): AsyncGenerator<AgentStreamEvent> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      let newline = buffer.indexOf("\n");
      while (newline !== -1) {
        const line = buffer.slice(0, newline).trim();
        buffer = buffer.slice(newline + 1);
        if (line) yield JSON.parse(line) as AgentStreamEvent;
        newline = buffer.indexOf("\n");
      }
    }
    const rest = buffer.trim();
    if (rest) yield JSON.parse(rest) as AgentStreamEvent;
  } finally {
    reader.releaseLock();
  }
}
