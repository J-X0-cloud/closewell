import type { Guide } from "@/types/content";

export const guidesIntro = {
  eyebrow: "Guides",
  heading: "Field notes for a calmer close.",
  body: "Practical playbooks from the Closewell team for controllers modernizing month-end.",
  cta: { label: "Browse all guides", href: "/platform#blog" },
} as const;

export const guides: Guide[] = [
  {
    kind: "Close playbook",
    title: "The Five-Day Close Checklist for Growing Finance Teams",
    summary:
      "A day-by-day checklist of what to reconcile, review and hand off, with the policies worth writing down first.",
    action: "Get the checklist",
    href: "/get-started",
  },
  {
    kind: "Article",
    title: "Why Grounded AI Beats Generic Chat for Finance Questions",
    summary: "Answers that cite your ledger are answers your auditors can follow.",
    action: "Read the article",
    href: "/platform#blog",
  },
  {
    kind: "Close scorecard · Free tool",
    title: "How Ready Is Your Close for an AI Agent?",
    summary:
      "Ten questions about your reconciliations, policies and data that show where an agent helps first.",
    action: "Take the scorecard",
    href: "/get-started",
  },
];

export const scorecard = {
  eyebrow: "Close readiness",
  heading: "Where would an agent help first?",
  body: "Answer ten quick questions about your close and get a short report on which accounts and workflows to hand to Closewell first, and which to keep with your team.",
  cta: { label: "Take the scorecard", href: "/get-started" },
  sample: {
    title: "Sample readiness report",
    team: "Example team",
    metrics: [
      { label: "Bank recs ready for automation", value: 92 },
      { label: "Policies written down today", value: 18 },
      { label: "Entries with a clear owner", value: 95 },
    ],
    yours: { label: "Your close", note: "Score your close · about 3 minutes" },
  },
} as const;
