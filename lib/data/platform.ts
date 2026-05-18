import type { Stat } from "@/types/content";
import { daniel, elena, maya } from "@/lib/data/testimonials";

export const platformHero = {
  eyebrow: "Platform",
  heading: { before: "An AI close agent, on your ", highlight: "ledger", after: "." },
  body: "Put Closewell agents to work preparing the close, matching cash, building revenue schedules and answering questions, all grounded in your own ledger and policies.",
  connectsTo: ["NetSuite", "Sage Intacct", "QuickBooks", "Xero"],
  connectsMore: "and more",
  ledger: {
    title: "Your ledger",
    systems: ["NetSuite", "SAP", "Any GL"],
    note: "Stays exactly as it is. Read-only by default.",
  },
  agents: {
    title: "Cited every time.",
    lanes: [
      { label: "Revenue schedules", value: "$120k recognized" },
      { label: "Cash matching", value: "412 matched" },
      { label: "Close prep", value: "84 JEs posted" },
      { label: "Ledger Q&A", value: "38 answers cited" },
    ],
    handoff: { label: "Sent to you", value: "2 items · Dana" },
  },
} as const;

export const platformProblem = {
  eyebrow: "The problem",
  segments: [
    { text: "Finance teams keep policies in ", emphasis: false },
    { text: "people’s heads", emphasis: true },
    { text: ", evidence in ", emphasis: false },
    { text: "twelve places", emphasis: true },
    { text: ", and spend the first ten days of every month proving last month’s numbers.", emphasis: false },
  ],
  tags: ["Scattered evidence", "Unwritten policies", "Late answers"],
} as const;

export const platformContrast = {
  eyebrow: "With Closewell",
  heading: "The same team, a different month-end.",
  rows: [
    { title: "Evidence as you go", now: "A close prepared all month", before: "A close that starts on day one" },
    { title: "Time for analysis", now: "Review, don’t rebuild when close week arrives", before: "Nights spent re-keying spreadsheets" },
    { title: "Answers with sources", now: "Ask the ledger, get an answer in seconds", before: "A dashboard nobody trusts" },
  ],
} as const;

export const platformLayers = {
  eyebrow: "Agent and team",
  heading: "Who does what, on one shared ledger.",
  body: "Closewell takes the repeatable work and pulls your team in only where judgment matters. Both read the same ledger, the same written policies and the same history.",
  team: {
    title: "Your finance team",
    body: "Reviews and signs off. Pulled in where judgment matters: write-offs, estimates, new contract terms and policy changes.",
  },
  core: {
    label: "CLOSEWELL",
    title: "The grounded finance layer",
    subtitle: ", across every system and policy doc",
    modules: [
      { index: "01", title: "Policy library", body: "Your accounting policies, written down and cited." },
      { index: "02", title: "Close agents", body: "Matching, reconciling, drafting, answering." },
      { index: "03", title: "Evidence trail", body: "Every step linked to its source." },
    ],
  },
  systems: {
    title: "Your existing systems",
    items: ["NetSuite", "SAP", "Oracle", "Salesforce", "Billing", "Payroll", "Excel", "Email", "Bank feeds"],
  },
} as const;

export const integrations = {
  eyebrow: "Integrations",
  heading: "Works with your ledger. No migration.",
  body: "Closewell reads from your GL, drafts entries back into it for approval, and keeps the evidence where your auditors already look.",
  ledgers: ["NetSuite", "Sage Intacct", "Dynamics 365", "QuickBooks", "SAP", "Oracle Cloud", "Zoho", "Xero"],
  note: "Read-only until you say otherwise",
} as const;

export const principles = {
  eyebrow: "Our principles",
  heading: "What makes an agent finance-grade?",
  items: [
    "Grounded in your data",
    "Policies you can read",
    "People sign off",
    "Every answer cited",
    "Learns from reviews",
    "Read-only by default",
  ],
} as const;

export const pilotNotes: { company: string; stat: Stat; body: string; person: typeof maya }[] = [
  {
    company: "Harborline Logistics",
    stat: { value: "Day 1", label: "Recs ready" },
    body: "Bank and card reconciliations prepared before day one of close.",
    person: maya,
  },
  {
    company: "Fernway Health",
    stat: { value: "12 mo", label: "Policies written" },
    body: "Written policy library built from twelve months of past entries.",
    person: daniel,
  },
  {
    company: "Quarry Labs",
    stat: { value: "Slack", label: "Answers cited" },
    body: "CFO questions answered in Slack with the source entries linked.",
    person: elena,
  },
];

export const blogFeature = {
  eyebrow: "From the blog",
  heading: "What “grounded” means for a finance agent",
  body: "A generic chatbot guesses. A finance agent should quote the entry, the document and the policy behind every answer. Here is how Closewell does it.",
  author: { initials: "CW", name: "Nora V.", role: "Head of Finance Product", date: "Aug 13, 2026" },
  sample: {
    question: "Why did software spend rise in August?",
    answer: "Up $18.2K vs July. Two annual renewals were billed in August instead of amortized.",
    citations: ["JE-4471", "INV-88213", "Prepaid policy §3.2"],
  },
} as const;

export const platformFaqIntro = {
  eyebrow: "FAQ",
  heading: "Questions finance teams ask us.",
  body: "Still deciding? A 30-minute demo on one of your own accounts answers the rest.",
} as const;
