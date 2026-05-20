import type { Account, BankLine, LedgerEntry, OpenInvoice } from "@/types/agent";

/**
 * Read-only view over the customer's general ledger. Production deployments back this with the
 * ERP connector (NetSuite, Sage Intacct, QuickBooks Online, Xero); the in-memory implementation
 * below serves the sample company used in demos and tests.
 */
export interface LedgerSource {
  getAccount(number: string): Account | undefined;
  listAccounts(): Account[];
  listEntries(query: LedgerQuery): LedgerEntry[];
  listBankLines(ids?: string[]): BankLine[];
  listOpenInvoices(customer?: string): OpenInvoice[];
}

export interface LedgerQuery {
  account?: string;
  period?: string;
  counterparty?: string;
  entity?: LedgerEntry["entity"];
  limit?: number;
}

const accounts: Account[] = [
  { number: "1000", name: "Cash · Operating", type: "asset" },
  { number: "1200", name: "Accounts receivable", type: "asset" },
  { number: "1400", name: "Prepaid expense", type: "asset" },
  { number: "2000", name: "Accounts payable", type: "liability" },
  { number: "2100", name: "Accrued liabilities", type: "liability" },
  { number: "2400", name: "Deferred revenue", type: "liability" },
  { number: "2610", name: "Intercompany loan · DE", type: "liability" },
  { number: "4010", name: "Subscription revenue", type: "revenue" },
  { number: "4020", name: "Usage revenue", type: "revenue" },
  { number: "6150", name: "Short-pay write-offs", type: "expense" },
  { number: "6310", name: "Cloud infrastructure", type: "expense" },
  { number: "6320", name: "Software subscriptions", type: "expense" },
  { number: "6420", name: "Freight & logistics", type: "expense" },
  { number: "6510", name: "Marketing services", type: "expense" },
  { number: "7900", name: "FX gain / loss", type: "expense" },
];

const entries: LedgerEntry[] = [
  { id: "JE-4471", date: "2026-08-04", period: "2026-08", account: "6320", description: "Annual renewal · analytics suite", counterparty: "Mode Analytics", amountCents: 1_120_000, sourceDocument: "INV-88213", entity: "US" },
  { id: "JE-4472", date: "2026-08-06", period: "2026-08", account: "6320", description: "Annual renewal · design tools", counterparty: "Figma", amountCents: 700_000, sourceDocument: "INV-88240", entity: "US" },
  { id: "JE-4480", date: "2026-08-15", period: "2026-08", account: "6310", description: "Cloud infra · August usage", counterparty: "AWS", amountCents: 4_210_000, sourceDocument: "INV-AWS-0826", entity: "US" },
  { id: "JE-4502", date: "2026-09-18", period: "2026-09", account: "6310", description: "Data platform backfill · one-time", counterparty: "AWS", amountCents: 3_140_000, sourceDocument: "INV-AWS-0926B", entity: "US" },
  { id: "JE-4503", date: "2026-09-15", period: "2026-09", account: "6310", description: "Cloud infra · September usage", counterparty: "AWS", amountCents: 4_305_000, sourceDocument: "INV-AWS-0926", entity: "US" },
  { id: "JE-4510", date: "2026-09-30", period: "2026-09", account: "2100", description: "Accrual · Osprey Media campaign", counterparty: "Osprey Media", amountCents: -1_200_000, sourceDocument: "SOW-2210", entity: "US" },
  { id: "JE-4511", date: "2026-09-30", period: "2026-09", account: "6510", description: "Accrual · Osprey Media campaign", counterparty: "Osprey Media", amountCents: 1_200_000, sourceDocument: "SOW-2210", entity: "US" },
  { id: "JE-4520", date: "2026-09-30", period: "2026-09", account: "2400", description: "Fairmont · monthly recognition", counterparty: "Fairmont", amountCents: 1_000_000, sourceDocument: "CTR-FAIRMONT-2026", entity: "US" },
  { id: "JE-4521", date: "2026-09-30", period: "2026-09", account: "4010", description: "Fairmont · monthly recognition", counterparty: "Fairmont", amountCents: -1_000_000, sourceDocument: "CTR-FAIRMONT-2026", entity: "US" },
  { id: "JE-4530", date: "2026-09-12", period: "2026-09", account: "6150", description: "Short-pay write-off · Harlow Freight #4471", counterparty: "Harlow Freight", amountCents: 3_800, sourceDocument: "BNK-0912-07", entity: "US" },
  { id: "JE-4541", date: "2026-09-30", period: "2026-09", account: "2610", description: "Intercompany loan balance · EUR 1.2M", counterparty: "Closewell Sample GmbH", amountCents: -129_600_000, sourceDocument: "ICL-2025-01", entity: "DE" },
  { id: "JE-4550", date: "2026-09-22", period: "2026-09", account: "6420", description: "Freight · Q3 carrier invoice", counterparty: "Harlow Freight", amountCents: 1_244_200, sourceDocument: "INV-HF-4471", entity: "UK" },
];

const bankLines: BankLine[] = [
  { id: "BNK-0912-07", date: "2026-09-12", counterparty: "Harlow Freight", reference: "INV 4471", amountCents: 1_240_400 },
  { id: "BNK-0914-02", date: "2026-09-14", counterparty: "Pinecrest Foods", reference: "7729", amountCents: 1_830_500 },
  { id: "BNK-0916-11", date: "2026-09-16", counterparty: "Byte Foods", reference: "REMIT 0916", amountCents: 3_180_000 },
  { id: "BNK-0919-04", date: "2026-09-19", counterparty: "Fairmont Inc", reference: "INV-2201 INV-2202", amountCents: 2_450_000 },
  { id: "BNK-0922-09", date: "2026-09-22", counterparty: "Northwind Co.", reference: "PAYMENT", amountCents: 1_248_000 },
];

const openInvoices: OpenInvoice[] = [
  { id: "inv_4471", number: "4471", customer: "Harlow Freight", issuedOn: "2026-08-12", dueOn: "2026-09-11", amountCents: 1_244_200 },
  { id: "inv_7729", number: "7729", customer: "Pinecrest Foods", issuedOn: "2026-08-14", dueOn: "2026-09-13", amountCents: 1_880_000 },
  { id: "inv_0916a", number: "5102", customer: "Byte Foods", issuedOn: "2026-08-10", dueOn: "2026-09-09", amountCents: 1_600_000 },
  { id: "inv_0916b", number: "5140", customer: "Byte Foods", issuedOn: "2026-08-20", dueOn: "2026-09-19", amountCents: 2_520_500 },
  { id: "inv_2201", number: "INV-2201", customer: "Fairmont", issuedOn: "2026-08-19", dueOn: "2026-09-18", amountCents: 1_450_000 },
  { id: "inv_2202", number: "INV-2202", customer: "Fairmont", issuedOn: "2026-08-19", dueOn: "2026-09-18", amountCents: 1_000_000 },
  { id: "inv_nw01", number: "NW-3310", customer: "Northwind Co.", issuedOn: "2026-08-22", dueOn: "2026-09-21", amountCents: 1_248_000 },
];

function normalizeName(value: string): string {
  return value
    .toLowerCase()
    .replace(/\b(inc|llc|ltd|co|gmbh)\b\.?/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function sameCounterparty(a: string, b: string): boolean {
  return normalizeName(a) === normalizeName(b);
}

export class InMemoryLedger implements LedgerSource {
  constructor(
    private readonly data = { accounts, entries, bankLines, openInvoices },
  ) {}

  getAccount(number: string): Account | undefined {
    return this.data.accounts.find((account) => account.number === number);
  }

  listAccounts(): Account[] {
    return [...this.data.accounts];
  }

  listEntries({ account, period, counterparty, entity, limit = 50 }: LedgerQuery): LedgerEntry[] {
    return this.data.entries
      .filter((entry) => (account ? entry.account === account : true))
      .filter((entry) => (period ? entry.period === period : true))
      .filter((entry) => (entity ? entry.entity === entity : true))
      .filter((entry) =>
        counterparty && entry.counterparty ? sameCounterparty(entry.counterparty, counterparty) : !counterparty,
      )
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, limit);
  }

  listBankLines(ids?: string[]): BankLine[] {
    if (!ids || ids.length === 0) return [...this.data.bankLines];
    const wanted = new Set(ids);
    return this.data.bankLines.filter((line) => wanted.has(line.id));
  }

  listOpenInvoices(customer?: string): OpenInvoice[] {
    if (!customer) return [...this.data.openInvoices];
    return this.data.openInvoices.filter((invoice) => sameCounterparty(invoice.customer, customer));
  }
}

export const sampleLedger: LedgerSource = new InMemoryLedger();
