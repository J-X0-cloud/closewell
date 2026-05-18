import type { Stat } from "@/types/content";

export const controllerHero = {
  eyebrow: "For Controllers",
  heading: "Own the close. Stop rebuilding it.",
  body: "Checklist tools track the work. Closewell does it: reconciliations, entries with evidence attached, flux explained in plain English. You review and sign off, and your team gets its evenings back.",
  badges: ["SOC 1", "SOC 2", "ISO 27001", "GDPR"],
} as const;

export const augustClose = {
  title: "August close · Day 1",
  items: [
    { label: "Bank recs · 6 of 6 ready", state: "done" },
    { label: "Prepaids & accruals drafted", state: "done" },
    { label: "Card clearing matched", state: "done" },
    { label: "Intercompany needs you", state: "review" },
    { label: "Flux notes · 22 lines cited", state: "done" },
  ],
  footer: "Every item links to its evidence",
} as const;

export const controllerBenefits: {
  index: string;
  title: string;
  body: string;
  stat: Stat;
}[] = [
  {
    index: "01",
    title: "You review. Closewell prepares.",
    body: "Closewell prepares reconciliations and journal entries across your GL and drafts the note behind every number. Your team reviews instead of builds.",
    stat: { value: "1", unit: "day", label: "recs ready on the first day of close" },
  },
  {
    index: "02",
    title: "Audit-ready by default.",
    body: "Every entry carries its own evidence and links to the policy that produced it. The trail is built as you go, not at year-end.",
    stat: { value: "100", unit: "%", label: "of entries cited to a source" },
  },
  {
    index: "03",
    title: "Policies that write themselves.",
    body: "Approve or reject and code it your way. Closewell writes each decision into your policy library in plain English, for you to edit.",
    stat: { value: "100", unit: "%", label: "questions answered with citations" },
  },
];

export const closeShift = {
  eyebrow: "The shift",
  heading: "From a ten-day scramble to a close that’s ready early.",
  body: "A typical close is a ten-day sprint of spreadsheets, chasing and last-minute fixes, and the logic that makes it work lives in a few people’s heads. Closewell reads how your close actually runs from the workpapers, schedules and entries your team already produces, writes it down, then prepares it all month.",
  bars: [
    { label: "A typical close", detail: "Spreadsheets, chasing, last-minute fixes", days: 10 },
    { label: "With Closewell", detail: "Prepared all month", days: 3 },
  ],
  footnote: "Close week becomes a review, not a scramble.",
} as const;

export const controllerCapabilities: { index: string; title: string; body: string; tag: string }[] = [
  {
    index: "01",
    title: "Reconciliations",
    body: "Prepared across your balance sheet accounts, with exceptions listed first so your team only spends time where a person is needed.",
    tag: "Exception flagged",
  },
  {
    index: "02",
    title: "Cash matching and bank reconciliation",
    body: "Matches bank lines to your books, one to one or one to many, without rule building. Unmatched items come to you, and each decision becomes a written rule.",
    tag: "Matched, one to many",
  },
  {
    index: "03",
    title: "Journal entries",
    body: "Prepared with supporting evidence and queued for approval. Once you approve, Closewell posts to your ERP with the trail attached. No more manual entries at 11pm on day eight.",
    tag: "Approve, then post",
  },
  {
    index: "04",
    title: "Close checklist",
    body: "One live view of what Closewell prepared, what’s waiting on a reviewer and what’s signed off.",
    tag: "Sign-off ready",
  },
  {
    index: "05",
    title: "Flux analysis",
    body: "First-draft variance notes with the transactions behind them, and anything unusual flagged before the CFO asks.",
    tag: "Anomaly flagged",
  },
];

export const controllerOutcomes = {
  eyebrow: "Outcomes",
  heading: "What changes when the close prepares itself",
  stats: [
    { value: "90", unit: "%", label: "of bank lines matched before close week" },
    { value: "40", unit: "%", label: "of close hours moved from prep to review" },
  ] satisfies Stat[],
} as const;

export const controllerTrust = {
  eyebrow: "Built on trust",
  heading: "AI your auditors can follow.",
  badges: ["SOC 1", "SOC 2", "ISO 27001", "GDPR"],
  body: {
    before: "Closewell prepares the close, bringing your team in wherever ",
    emphasis: "judgment is needed",
    after:
      ". Every output carries the evidence your auditor expects, and nothing posts without approval. During onboarding a CPA on our team reviews your policy library with you.",
  },
  quote:
    "I open the close on day one and the reconciliations are already there, each one with the evidence attached. My job is finally review.",
} as const;

export const controllerSteps = {
  eyebrow: "How it works",
  heading: "Connect, write down, prepare.",
  body: "We connect read-only to your ledger, turn how your team works into written policies, and let Closewell prepare the close on top of them.",
  steps: [
    {
      index: "01",
      label: "Connect",
      title: "Read-only, in a day.",
      body: "Closewell connects to your GL, bank feeds and shared drive, and indexes last year’s close files so it can see how your team really works.",
    },
    {
      index: "02",
      label: "Write down",
      title: "A policy library you own.",
      body: "From past entries and workpapers, Closewell drafts your accounting policies in plain English. Your controller edits and approves them.",
    },
    {
      index: "03",
      label: "Prepare",
      title: "Close, cited.",
      body: "Each month Closewell prepares reconciliations, entries and flux notes against those policies, and every call your team makes updates the library.",
    },
  ],
} as const;
