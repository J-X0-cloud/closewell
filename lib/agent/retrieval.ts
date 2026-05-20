import type { PolicyChunk, PolicyDocument } from "@/types/agent";
import { policyLibrary } from "@/lib/agent/policies";

/* ------------------------------------------------------------------------------------------------
 * Chunking
 * ---------------------------------------------------------------------------------------------- */

export interface ChunkOptions {
  /** Soft upper bound on chunk length in characters. */
  maxChars: number;
  /** Characters repeated from the previous window when a section has to be split. */
  overlap: number;
}

const DEFAULT_CHUNK_OPTIONS: ChunkOptions = { maxChars: 700, overlap: 120 };
const SECTION_HEADING = /^§\d+\s+.+$/;

/**
 * Splits a policy into section-aligned chunks. Each "§n" section becomes one chunk; sections longer
 * than `maxChars` are split into overlapping windows on sentence boundaries so a citation still
 * points at a single section.
 */
export function chunkPolicy(
  policy: PolicyDocument,
  options: Partial<ChunkOptions> = {},
): PolicyChunk[] {
  const { maxChars, overlap } = { ...DEFAULT_CHUNK_OPTIONS, ...options };
  const sections: { heading: string; lines: string[] }[] = [];

  for (const rawLine of policy.body.split("\n")) {
    const line = rawLine.trim();
    if (!line) continue;
    if (SECTION_HEADING.test(line)) {
      sections.push({ heading: line, lines: [] });
    } else if (sections.length === 0) {
      sections.push({ heading: "§0 Overview", lines: [line] });
    } else {
      sections[sections.length - 1]?.lines.push(line);
    }
  }

  return sections.flatMap(({ heading, lines }) => {
    const section = heading.split(/\s+/)[0] ?? heading;
    const text = lines.join(" ");
    return splitWindows(text, maxChars, overlap).map((window, part) => ({
      id: `${policy.id}${section}${part > 0 ? `.${part}` : ""}`,
      policyId: policy.id,
      policyTitle: policy.title,
      section: heading,
      text: `${policy.title} (${policy.id} v${policy.version}), ${heading}: ${window}`,
    }));
  });
}

function splitWindows(text: string, maxChars: number, overlap: number): string[] {
  if (text.length <= maxChars) return [text];
  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g) ?? [text];
  const windows: string[] = [];
  let current = "";

  for (const sentence of sentences) {
    if (current.length + sentence.length > maxChars && current.length > 0) {
      windows.push(current.trim());
      current = current.slice(Math.max(0, current.length - overlap));
    }
    current += sentence;
  }
  if (current.trim()) windows.push(current.trim());
  return windows;
}

/* ------------------------------------------------------------------------------------------------
 * Embeddings
 * ---------------------------------------------------------------------------------------------- */

/** Any embedding model: a hosted API in production, the hashing embedder for local runs and tests. */
export interface EmbeddingProvider {
  readonly id: string;
  readonly dimensions: number;
  embed(texts: string[]): Promise<Float32Array[]>;
}

const STOPWORDS = new Set([
  "a", "an", "and", "are", "as", "at", "be", "by", "for", "from", "has", "in", "is", "it", "of",
  "on", "or", "that", "the", "to", "was", "were", "will", "with", "why", "did", "does", "what",
]);

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9§$%.\-\s]/g, " ")
    .split(/\s+/)
    .map((token) => token.replace(/^[.\-]+|[.\-]+$/g, ""))
    .filter((token) => token.length > 1 && !STOPWORDS.has(token));
}

/** FNV-1a 32-bit hash. */
function hash(value: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/**
 * Deterministic feature-hashing embedder over unigrams and bigrams. It needs no network access,
 * which keeps retrieval reproducible in CI and lets the agent run against the sample ledger offline.
 */
export class HashingEmbedder implements EmbeddingProvider {
  readonly id = "hashing-v1";

  constructor(readonly dimensions = 512) {}

  async embed(texts: string[]): Promise<Float32Array[]> {
    return texts.map((text) => this.embedOne(text));
  }

  private embedOne(text: string): Float32Array {
    const vector = new Float32Array(this.dimensions);
    const tokens = tokenize(text);
    const features = [...tokens, ...tokens.slice(1).map((token, i) => `${tokens[i]}_${token}`)];

    for (const feature of features) {
      const h = hash(feature);
      const index = h % this.dimensions;
      const sign = (h >>> 31) === 0 ? 1 : -1;
      vector[index] = (vector[index] ?? 0) + sign;
    }
    return normalize(vector);
  }
}

function normalize(vector: Float32Array): Float32Array {
  let norm = 0;
  for (const value of vector) norm += value * value;
  norm = Math.sqrt(norm);
  if (norm === 0) return vector;
  return vector.map((value) => value / norm);
}

export function cosineSimilarity(a: Float32Array, b: Float32Array): number {
  if (a.length !== b.length) {
    throw new Error(`Vector size mismatch: ${a.length} vs ${b.length}`);
  }
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    const x = a[i] ?? 0;
    const y = b[i] ?? 0;
    dot += x * y;
    normA += x * x;
    normB += y * y;
  }
  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

/* ------------------------------------------------------------------------------------------------
 * Index + similarity search
 * ---------------------------------------------------------------------------------------------- */

export interface SearchOptions {
  k?: number;
  minScore?: number;
  policyIds?: string[];
}

export interface ScoredChunk extends PolicyChunk {
  score: number;
}

export class PolicyIndex {
  private constructor(
    private readonly embedder: EmbeddingProvider,
    private readonly chunks: PolicyChunk[],
    private readonly vectors: Float32Array[],
  ) {}

  static async build(
    policies: PolicyDocument[],
    embedder: EmbeddingProvider = new HashingEmbedder(),
    chunkOptions?: Partial<ChunkOptions>,
  ): Promise<PolicyIndex> {
    const chunks = policies.flatMap((policy) => chunkPolicy(policy, chunkOptions));
    const vectors = await embedder.embed(chunks.map((chunk) => chunk.text));
    return new PolicyIndex(embedder, chunks, vectors);
  }

  get size(): number {
    return this.chunks.length;
  }

  async search(query: string, { k = 4, minScore = 0.05, policyIds }: SearchOptions = {}): Promise<ScoredChunk[]> {
    const [queryVector] = await this.embedder.embed([query]);
    if (!queryVector) return [];
    const allowed = policyIds?.length ? new Set(policyIds) : null;

    return this.chunks
      .map((chunk, i) => ({ chunk, vector: this.vectors[i] }))
      .filter(({ chunk, vector }) => vector !== undefined && (!allowed || allowed.has(chunk.policyId)))
      .map(({ chunk, vector }) => ({ ...chunk, score: cosineSimilarity(queryVector, vector as Float32Array) }))
      .filter((result) => result.score >= minScore)
      .sort((a, b) => b.score - a.score)
      .slice(0, k);
  }
}

let defaultIndex: Promise<PolicyIndex> | undefined;

/** Lazily builds the index over the policy library once per server instance. */
export function getPolicyIndex(): Promise<PolicyIndex> {
  defaultIndex ??= PolicyIndex.build(policyLibrary);
  return defaultIndex;
}
