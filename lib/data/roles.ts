import type { RoleCard } from "@/types/content";

export const rolesIntro = {
  heading: "Built for the people who sign off.",
  body: "One agent, two views: answers for the CFO, control for the Controller.",
} as const;

export const roles: RoleCard[] = [
  {
    id: "cfo",
    eyebrow: "CFO",
    title: "Ask the books, get a straight answer.",
    body: "Live answers across every entity, each one cited to the ledger, without waiting for close to finish.",
    cta: { label: "See the CFO view", href: "/platform#rolesx" },
  },
  {
    id: "controller",
    eyebrow: "Controller",
    title: "Own the close, not the busywork.",
    body: "Closewell prepares reconciliations, drafts entries and logs every action with its evidence, so you review and approve.",
    cta: { label: "See the Controller view", href: "/controllers" },
  },
];

export const cfoPreview = {
  label: "Consolidated · Q3",
  value: "$18.4M",
  trendLabel: "Trend",
  trend: [12.1, 13.4, 13.0, 14.6, 15.2, 16.8, 18.4],
  entitiesLabel: "3 entities",
  entities: ["US", "UK", "DE"],
  mode: "Answers mode",
} as const;

export const controllerPreview = {
  label: "Close · prepared",
  progress: "4 of 5",
  rows: [
    { label: "Reconciliations", status: "Complete" },
    { label: "Flux analysis", status: "Running" },
  ],
  footer: "Audit-ready",
} as const;
