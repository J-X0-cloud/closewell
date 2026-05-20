import type Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import type {
  BankLine,
  Citation,
  JournalEntryDraft,
  OpenInvoice,
  TransactionMatch,
} from "@/types/agent";
import { formatCents } from "@/lib/format";
import { sameCounterparty, type LedgerSource } from "@/lib/agent/ledger";
import { findPolicy } from "@/lib/agent/policies";
import type { PolicyIndex } from "@/lib/agent/retrieval";

/* ------------------------------------------------------------------------------------------------
 * Input schemas (validated before any tool runs)
 * ---------------------------------------------------------------------------------------------- */

const period = z.string().regex(/^\d{4}-\d{2}$/, "Use yyyy-mm");
const accountNumber = z.string().regex(/^\d{4}$/, "Use a four-digit GL account");

export const toolInputSchemas = {
  getLedgerEntries: z.object({
    account: accountNumber.optional(),
    period: period.optional(),
    counterparty: z.string().min(1).optional(),
    entity: z.enum(["US", "UK", "DE"]).optional(),
    limit: z.number().int().min(1).max(200).default(50),
  }),
  matchTransactions: z.object({
    bankLineIds: z.array(z.string()).max(100).optional(),
    autoCloseThresholdCents: z.number().int().min(0).max(1_000_000).default(5_000),
  }),
  draftJournalEntry: z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    description: z.string().min(3).max(240),
    lines: z
      .array(
        z.object({
          account: accountNumber,
          debitCents: z.number().int().min(0).default(0),
          creditCents: z.number().int().min(0).default(0),
          memo: z.string().max(240).optional(),
        }),
      )
      .min(2),
    policyIds: z.array(z.string()).min(1),
    sourceDocuments: z.array(z.string()).default([]),
  }),
  citePolicy: z.object({
    query: z.string().min(3),
    policyId: z.string().optional(),
    k: z.number().int().min(1).max(8).default(3),
  }),
} as const;

export type ToolName = keyof typeof toolInputSchemas;
export type ToolInput<N extends ToolName> = z.infer<(typeof toolInputSchemas)[N]>;

/* ------------------------------------------------------------------------------------------------
 * Tool definitions sent to the model
 * ---------------------------------------------------------------------------------------------- */

export const closeAgentTools: Anthropic.Tool[] = [
  {
    name: "getLedgerEntries",
    description:
      "Read posted general ledger entries. Filter by GL account, period (yyyy-mm), counterparty or entity. Returns entry ids you must cite when you use a figure.",
    eager_input_streaming: true,
    input_schema: {
      type: "object",
      properties: {
        account: { type: "string", description: "Four-digit GL account, e.g. 6310" },
        period: { type: "string", description: "Accounting period as yyyy-mm" },
        counterparty: { type: "string", description: "Vendor or customer name" },
        entity: { type: "string", enum: ["US", "UK", "DE"] },
        limit: { type: "integer", minimum: 1, maximum: 200 },
      },
      additionalProperties: false,
    },
  },
  {
    name: "matchTransactions",
    description:
      "Match unreconciled bank lines to open invoices, one to one or one to many. Applies SHORT-PAY-01: shortfalls at or under the threshold are closed, larger ones are returned for review. Never posts entries.",
    eager_input_streaming: true,
    input_schema: {
      type: "object",
      properties: {
        bankLineIds: {
          type: "array",
          items: { type: "string" },
          description: "Bank line ids to match. Omit to match every unreconciled line.",
        },
        autoCloseThresholdCents: {
          type: "integer",
          description: "Short-pay auto-close threshold in cents. Defaults to the policy value (5000).",
        },
      },
      additionalProperties: false,
    },
  },
  {
    name: "draftJournalEntry",
    description:
      "Draft a journal entry for human approval. Amounts are in cents. The draft must balance and cite at least one policy id. Drafts are never posted by the agent.",
    eager_input_streaming: true,
    input_schema: {
      type: "object",
      properties: {
        date: { type: "string", description: "Entry date, yyyy-mm-dd" },
        description: { type: "string" },
        lines: {
          type: "array",
          minItems: 2,
          items: {
            type: "object",
            properties: {
              account: { type: "string" },
              debitCents: { type: "integer", minimum: 0 },
              creditCents: { type: "integer", minimum: 0 },
              memo: { type: "string" },
            },
            required: ["account"],
            additionalProperties: false,
          },
        },
        policyIds: { type: "array", items: { type: "string" }, minItems: 1 },
        sourceDocuments: { type: "array", items: { type: "string" } },
      },
      required: ["date", "description", "lines", "policyIds"],
      additionalProperties: false,
    },
  },
  {
    name: "citePolicy",
    description:
      "Search the company's written accounting policies and return the most relevant sections with citation ids. Use before applying any rule.",
    eager_input_streaming: true,
    input_schema: {
      type: "object",
      properties: {
        query: { type: "string", description: "What you need the policy to answer" },
        policyId: { type: "string", description: "Restrict the search to one policy, e.g. REV-REC-01" },
        k: { type: "integer", minimum: 1, maximum: 8 },
      },
      required: ["query"],
      additionalProperties: false,
    },
  },
];

/* ------------------------------------------------------------------------------------------------
 * Execution
 * ---------------------------------------------------------------------------------------------- */

export interface ToolContext {
  ledger: LedgerSource;
  policies: PolicyIndex;
}

export interface ToolExecution {
  ok: boolean;
  /** JSON payload returned to the model as the tool_result content. */
  content: string;
  /** One-line summary for the UI activity feed. */
  summary: string;
  citations: Citation[];
}

type Handler<N extends ToolName> = (input: ToolInput<N>, ctx: ToolContext) => Promise<Omit<ToolExecution, "ok">>;

const handlers: { [N in ToolName]: Handler<N> } = {
  async getLedgerEntries(input, { ledger }) {
    const entries = ledger.listEntries(input);
    const totalCents = entries.reduce((sum, entry) => sum + entry.amountCents, 0);
    return {
      content: JSON.stringify({ count: entries.length, totalCents, entries }),
      summary: `Read ${entries.length} ledger ${entries.length === 1 ? "entry" : "entries"} (${formatCents(totalCents)})`,
      citations: entries.map((entry) => ({ kind: "ledger", ref: entry.id, label: `${entry.id} · ${entry.description}` })),
    };
  },

  async matchTransactions(input, { ledger }) {
    const lines = ledger.listBankLines(input.bankLineIds);
    const matches = lines.map((line) => matchBankLine(line, ledger.listOpenInvoices(line.counterparty), input.autoCloseThresholdCents));
    const needsReview = matches.filter((match) => match.status === "needs_review" || match.status === "unmatched");
    return {
      content: JSON.stringify({ matches }),
      summary: `Matched ${matches.length - needsReview.length} of ${matches.length} bank lines, ${needsReview.length} sent for review`,
      citations: [
        { kind: "policy", ref: "SHORT-PAY-01", label: "SHORT-PAY-01 · Customer short-payments" },
        ...lines.map((line) => ({ kind: "document" as const, ref: line.id, label: `${line.id} · ${line.counterparty}` })),
      ],
    };
  },

  async draftJournalEntry(input, { ledger }) {
    const unknownAccounts = input.lines.filter((line) => !ledger.getAccount(line.account)).map((line) => line.account);
    if (unknownAccounts.length > 0) {
      throw new ToolInputError(`Unknown GL accounts: ${unknownAccounts.join(", ")}`);
    }
    const unknownPolicies = input.policyIds.filter((id) => !findPolicy(id));
    if (unknownPolicies.length > 0) {
      throw new ToolInputError(`Unknown policies: ${unknownPolicies.join(", ")}. Call citePolicy first.`);
    }
    for (const line of input.lines) {
      if ((line.debitCents > 0) === (line.creditCents > 0)) {
        throw new ToolInputError(`Line ${line.account} must have either a debit or a credit`);
      }
    }

    const debits = input.lines.reduce((sum, line) => sum + line.debitCents, 0);
    const credits = input.lines.reduce((sum, line) => sum + line.creditCents, 0);
    const citations: Citation[] = [
      ...input.policyIds.map((id) => ({ kind: "policy" as const, ref: id, label: `${id} · ${findPolicy(id)?.title ?? id}` })),
      ...input.sourceDocuments.map((ref) => ({ kind: "document" as const, ref, label: ref })),
    ];

    const draft: JournalEntryDraft = {
      id: `JE-DRAFT-${Date.now().toString(36).toUpperCase()}`,
      date: input.date,
      description: input.description,
      lines: input.lines,
      balanced: debits === credits,
      citations,
      status: debits === credits ? "awaiting_approval" : "draft",
    };

    return {
      content: JSON.stringify({
        draft,
        ...(draft.balanced ? {} : { differenceCents: debits - credits, note: "Entry does not balance; fix before requesting approval." }),
      }),
      summary: draft.balanced
        ? `Drafted ${draft.id} (${formatCents(debits)}), awaiting approval`
        : `Draft ${draft.id} is unbalanced by ${formatCents(Math.abs(debits - credits))}`,
      citations,
    };
  },

  async citePolicy(input, { policies }) {
    const results = await policies.search(input.query, {
      k: input.k,
      policyIds: input.policyId ? [input.policyId] : undefined,
    });
    return {
      content: JSON.stringify({
        results: results.map(({ id, policyId, section, text, score }) => ({
          citationId: id,
          policyId,
          section,
          text,
          score: Number(score.toFixed(3)),
        })),
      }),
      summary:
        results.length > 0
          ? `Found ${results.map((result) => result.id).join(", ")}`
          : "No written policy covers this; send it to a reviewer",
      citations: results.map((result) => ({ kind: "policy", ref: result.id, label: `${result.policyId} · ${result.section}` })),
    };
  },
};

export class ToolInputError extends Error {}

function isToolName(name: string): name is ToolName {
  return Object.hasOwn(toolInputSchemas, name);
}

/**
 * Validates the model's tool input against its schema and runs the handler. Errors are returned
 * as an unsuccessful execution (sent back to the model with is_error) instead of thrown.
 */
export async function executeTool(name: string, rawInput: unknown, ctx: ToolContext): Promise<ToolExecution> {
  if (!isToolName(name)) {
    return failure(`Unknown tool "${name}"`);
  }

  const parsed = toolInputSchemas[name].safeParse(rawInput);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((issue) => `${issue.path.join(".") || "input"}: ${issue.message}`);
    return failure(`Invalid input for ${name}: ${issues.join("; ")}`);
  }

  try {
    const handler = handlers[name] as Handler<typeof name>;
    const result = await handler(parsed.data as ToolInput<typeof name>, ctx);
    return { ok: true, ...result };
  } catch (error) {
    if (error instanceof ToolInputError) return failure(error.message);
    throw error;
  }
}

function failure(message: string): ToolExecution {
  return { ok: false, content: JSON.stringify({ error: message }), summary: message, citations: [] };
}

/* ------------------------------------------------------------------------------------------------
 * Matching
 * ---------------------------------------------------------------------------------------------- */

/** Finds the invoice (or set of invoices) a bank line settles and classifies the difference. */
export function matchBankLine(line: BankLine, candidates: OpenInvoice[], thresholdCents: number): TransactionMatch {
  const invoices = candidates.filter((invoice) => sameCounterparty(invoice.customer, line.counterparty));
  if (invoices.length === 0) {
    return {
      bankLineId: line.id,
      invoiceIds: [],
      status: "unmatched",
      differenceCents: line.amountCents,
      rationale: `No open invoice for ${line.counterparty}`,
    };
  }

  const best = bestInvoiceSet(line.amountCents, invoices);
  const invoiced = best.reduce((sum, invoice) => sum + invoice.amountCents, 0);
  const shortfall = invoiced - line.amountCents;
  const invoiceIds = best.map((invoice) => invoice.id);
  const numbers = best.map((invoice) => (/^\d+$/.test(invoice.number) ? `#${invoice.number}` : invoice.number)).join(" + ");

  if (shortfall === 0) {
    return {
      bankLineId: line.id,
      invoiceIds,
      status: "matched",
      differenceCents: 0,
      rationale: `Exact match to ${numbers}`,
    };
  }
  if (shortfall > 0 && shortfall <= thresholdCents) {
    return {
      bankLineId: line.id,
      invoiceIds,
      status: "short_pay_within_policy",
      differenceCents: -shortfall,
      policyId: "SHORT-PAY-01",
      rationale: `Short ${formatCents(shortfall)} on ${numbers}; within SHORT-PAY-01 §2, write off to 6150`,
    };
  }
  return {
    bankLineId: line.id,
    invoiceIds,
    status: "needs_review",
    differenceCents: -shortfall,
    policyId: "SHORT-PAY-01",
    rationale: `${shortfall > 0 ? "Short" : "Over"} ${formatCents(Math.abs(shortfall))} on ${numbers}; above policy, sent to the Controller (SHORT-PAY-01 §3)`,
  };
}

/**
 * Chooses the subset of invoices a receipt most plausibly settles: the smallest total at or above
 * the amount received (customers short-pay far more often than they overpay), falling back to the
 * closest total below it.
 */
const UNDERPAID_PENALTY = Number.MAX_SAFE_INTEGER / 2;

function bestInvoiceSet(amountCents: number, invoices: OpenInvoice[]): OpenInvoice[] {
  const pool = invoices.slice(0, 12);
  let best: OpenInvoice[] = [];
  let bestDistance = Number.POSITIVE_INFINITY;

  for (let mask = 1; mask < 1 << pool.length; mask++) {
    const subset = pool.filter((_, i) => mask & (1 << i));
    const total = subset.reduce((sum, invoice) => sum + invoice.amountCents, 0);
    const distance = total >= amountCents ? total - amountCents : UNDERPAID_PENALTY + (amountCents - total);
    if (distance < bestDistance || (distance === bestDistance && subset.length < best.length)) {
      best = subset;
      bestDistance = distance;
    }
  }
  return best;
}
