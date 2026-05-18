import type { Person } from "@/types/content";

export const shiftCopy = {
  before: {
    eyebrow: "The problem",
    heading: "Month-end still lives in spreadsheets, inboxes and people’s heads.",
    body: "Controllers spend the first ten days of every month proving the numbers instead of using them. The checklist tools track the work. Nobody actually does it except your team, late at night.",
  },
  after: {
    eyebrow: "With Closewell",
    heading: "An agent that closes the books with you.",
    body: "Closewell does the prep and brings in the right person when judgment is needed. Every number traces back to a ledger entry and a written policy.",
  },
} as const;

export const scatteredWork = {
  spreadsheet: { file: "Recon_Q3_FINAL_v7.xlsx", tag: "Manual", statLabel: "Unmatched lines", stat: "142" },
  invoices: {
    file: "invoices_Q3.pdf",
    tag: "Key by hand",
    rows: [
      { vendor: "Northwind Co.", amount: "$12,480.00" },
      { vendor: "Acme Labs", amount: "$3,902.55" },
      { vendor: "Bluepeak LLC", amount: "$28,140.00" },
      { vendor: "Vertex Mfg.", amount: "$1,204.18" },
    ],
    note: "Re-type 84 rows into the GL",
  },
  inbox: {
    label: "Inbox",
    unread: "9,481",
    threads: [
      { subject: "Re: Q3 accrual, need backup", unread: true },
      { subject: "Re: Re: where is the AP file?", unread: true },
      { subject: "Fwd: bank statement (3)", unread: false },
    ],
  },
  chat: {
    channel: "#month-end-close",
    messages: [
      { text: "did the JE get posted??", mine: false },
      { text: "which version is final???", mine: true },
    ],
  },
  journal: {
    title: "Journal entry · draft",
    tag: "Unbalanced",
    lines: [
      { side: "Dr", account: "Prepaid expense" },
      { side: "Cr", account: "Cash · 1000" },
    ],
    difference: "$2,552",
  },
  folders: ["Q3 Close (final)", "Backups_OLD"],
} as const;

type KeyPerson = Person & { note: string };

const priya: KeyPerson = {
  name: "Priya",
  initials: "PS",
  role: "Controller",
  note: "Only she has the prepaid schedule",
};
const owen: KeyPerson = {
  name: "Owen",
  initials: "OB",
  role: "FP&A Lead",
  note: "Knows the FX revaluation logic",
};
const theo: KeyPerson = {
  name: "Theo",
  initials: "TW",
  role: "Sr. Accountant",
  note: "The recon macro lives on his laptop",
};

export const keyPeople: KeyPerson[] = [priya, owen, theo];

export interface CloseRunStep {
  label: string;
  value: string;
  detail: string;
}

export const closeRun = {
  title: "Close run · Q3 FY26",
  steps: [
    { label: "Reconciled", value: "14 accounts", detail: "$2,552 cleared" },
    { label: "Matched", value: "1,284 transactions", detail: "100%" },
    { label: "Drafted", value: "38 journal entries", detail: "balanced" },
    { label: "Flux explanations", value: "written", detail: "22 lines" },
  ] satisfies CloseRunStep[],
  lock: { label: "Lock period", value: "Q3 FY26", detail: "Full audit trail attached" },
  reviews: [
    {
      id: "flux",
      person: priya,
      prompt: "Flux review: Data platform",
      figure: "+$31,400",
      context: "Closewell flags a one-time backfill.",
      action: "Approve note",
      resolved: "Approved · flux note attached",
    },
    {
      id: "fx",
      person: owen,
      prompt: "FX revaluation on the €1.2M intercompany loan, no policy precedent.",
      figure: null,
      context: "Your call.",
      action: "Sign off",
      resolved: "Signed off · policy saved",
    },
  ],
} as const;
