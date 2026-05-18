import type { HowItWorksStep } from "@/types/content";

export const howItWorksIntro = {
  eyebrow: "How it works",
  heading: "Grounded in your books, not the internet.",
  body: "Closewell reads your ledger and policies, does the work, and learns from every review.",
  loop: {
    title: "Review → remember → repeat",
    body: "Every exception you resolve becomes a written rule Closewell follows next month.",
  },
} as const;

export const howItWorksSteps: HowItWorksStep[] = [
  {
    id: "data",
    label: "Your data",
    title: "Everything the close touches.",
    description:
      "Your GL, the systems around it, and the spreadsheets, PDFs and threads your team actually works in.",
  },
  {
    id: "policies",
    label: "Your policies",
    title: "How your team decides, written down.",
    description:
      "Past entries, recon notes and sign-offs become a policy library Closewell cites on every action.",
  },
  {
    id: "work",
    label: "The work",
    title: "Prepared all month, not in close week.",
    description:
      "Reconciliations run and entries post as the data lands. Anything without a precedent comes to you.",
  },
  {
    id: "review",
    label: "Your review",
    title: "Numbers you can trace.",
    description:
      "Flux, budget against actuals and the forecast, each figure one click from the entry behind it.",
  },
];

export const dataScene = {
  structured: ["CRM", "Billing", "Banks", "Payroll"],
  hub: "ERP",
  unstructured: ["Excel", "Docs", "Email", "Slack and Teams"],
  result: "One indexed ledger",
} as const;

export const policyScene = {
  evidence: ["Prior journal entries", "Recon notes, judgment calls", "Sign-offs and approvals"],
  policy: {
    id: "REV-REC-01 · ASC 606",
    fields: [
      { label: "Trigger", value: "Contract signed" },
      { label: "Booked to", value: "GL 4020" },
    ],
  },
} as const;

export const workScene = [
  { label: "Reconciliations · running", owner: "AGENT", needsYou: false },
  { label: "Journal entries · posted", owner: "AGENT", needsYou: false },
  { label: "FX revaluation · your call needed", owner: "DA", needsYou: true },
] as const;

export const reviewScene = {
  rows: [
    { label: "Flux analysis · October", value: "+8.2%" },
    { label: "Budget vs. actuals", value: "On plan" },
    { label: "Forecast", value: "13-week" },
  ],
  footer: "Every figure traced to its source",
} as const;
