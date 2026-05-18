export const demoIntro = {
  eyebrow: "Book a demo",
  heading: "See Closewell on your own ledger.",
  body: "Thirty minutes with a finance lead on our team. Bring one account that eats your close week and we’ll reconcile it live, with every step cited.",
  agenda: [
    { index: "01", text: "A live reconciliation on a sample of your data, read-only" },
    { index: "02", text: "Ledger Q&A: ask a question you’d normally chase for a day" },
    { index: "03", text: "A draft policy library built from your last close" },
  ],
  quote: "We saw our own bank rec prepared, with the evidence linked, in the first call. That sold the team.",
  assurances: ["Read-only by default", "SSO & role-based access", "No model training on your data"],
} as const;

export const demoForm = {
  heading: "Tell us about your close",
  body: "We reply within one business day with two or three times that work.",
  submit: "Request a demo",
  consent: "By submitting you agree to be contacted about Closewell. No spam, ever.",
  success: {
    heading: "Thanks, we’ll be in touch.",
    body: "A finance lead will reply within one business day with times for your demo.",
  },
} as const;

export const roleOptions = [
  "Controller",
  "CFO / VP Finance",
  "Accounting manager",
  "Staff accountant",
  "Other",
] as const;

export const ledgerOptions = [
  "NetSuite",
  "Sage Intacct",
  "QuickBooks Online",
  "Xero",
  "Microsoft Dynamics",
  "Something else",
] as const;

export const closeLengthOptions = [
  { value: "under5", label: "Under 5 days" },
  { value: "5-10", label: "5–10 days" },
  { value: "10plus", label: "10+ days" },
] as const;

export type RoleOption = (typeof roleOptions)[number];
export type LedgerOption = (typeof ledgerOptions)[number];
export type CloseLength = (typeof closeLengthOptions)[number]["value"];
