import "server-only";
import { z } from "zod";

const serverEnvSchema = z.object({
  ANTHROPIC_API_KEY: z.string().min(1).optional(),
  ANTHROPIC_MODEL: z.string().min(1).default("claude-opus-5"),
  AGENT_MAX_TURNS: z.coerce.number().int().min(1).max(20).default(8),
  DEMO_WEBHOOK_URL: z.string().url().optional().or(z.literal("").transform(() => undefined)),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

let cached: ServerEnv | undefined;

/** Parses server-side environment variables once and caches the result. */
export function serverEnv(): ServerEnv {
  cached ??= serverEnvSchema.parse(process.env);
  return cached;
}
