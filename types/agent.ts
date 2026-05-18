/** Ledger domain types shared by the agent tools and the API routes. */

export type AccountType = "asset" | "liability" | "equity" | "revenue" | "expense";

export interface Account {
  number: string;
  name: string;
  type: AccountType;
}

export interface LedgerEntry {
  id: string;
  /** ISO date (yyyy-mm-dd) */
  date: string;
  period: string;
  account: string;
  description: string;
  counterparty?: string;
  /** Positive = debit, negative = credit, in minor units (cents). */
  amountCents: number;
  sourceDocument?: string;
  entity: "US" | "UK" | "DE";
}

export interface BankLine {
  id: string;
  date: string;
  counterparty: string;
  reference: string;
  amountCents: number;
}

export interface OpenInvoice {
  id: string;
  number: string;
  customer: string;
  issuedOn: string;
  dueOn: string;
  amountCents: number;
}

export type MatchStatus = "matched" | "short_pay_within_policy" | "needs_review" | "unmatched";

export interface TransactionMatch {
  bankLineId: string;
  invoiceIds: string[];
  status: MatchStatus;
  differenceCents: number;
  policyId?: string;
  rationale: string;
}

export interface JournalLine {
  account: string;
  debitCents: number;
  creditCents: number;
  memo?: string;
}

export interface JournalEntryDraft {
  id: string;
  date: string;
  description: string;
  lines: JournalLine[];
  balanced: boolean;
  citations: Citation[];
  status: "draft" | "awaiting_approval";
}

export interface PolicyDocument {
  id: string;
  title: string;
  version: number;
  owner: string;
  updatedOn: string;
  body: string;
}

export interface PolicyChunk {
  id: string;
  policyId: string;
  policyTitle: string;
  section: string;
  text: string;
}

export interface Citation {
  kind: "policy" | "ledger" | "document";
  ref: string;
  label: string;
}

/** Events streamed to the client from /api/agent as newline-delimited JSON. */
export type AgentStreamEvent =
  | { type: "text"; delta: string }
  | { type: "tool_call"; id: string; name: string; input: unknown }
  | { type: "tool_result"; id: string; name: string; ok: boolean; summary: string }
  | { type: "citation"; citation: Citation }
  | { type: "done"; stopReason: string | null; turns: number }
  | { type: "error"; message: string };
