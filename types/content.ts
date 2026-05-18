export interface NavLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export type Tone = "navy" | "marigold" | "success" | "warning" | "danger" | "muted";

/* ---------- Hero workflow card ---------- */

export type WorkflowId = "cash" | "accrual" | "revenue";

export interface WorkflowSource {
  label: string;
  /** Short monogram used when no logo is shown. */
  mark: string;
  tone: Tone;
}

export interface WorkflowAction {
  counterparty: string;
  reference: string;
  amount: string;
  outcome: string;
}

export interface Workflow {
  id: WorkflowId;
  label: string;
  sources: WorkflowSource[];
  policy: { id: string; rule: string };
  runs: WorkflowAction;
  asks: WorkflowAction & { question: string; reviewer: string };
  remembers: { id: string; rule: string };
}

/* ---------- Capabilities ---------- */

export type CapabilityId = "revenue" | "cash" | "close" | "ar-ap" | "reporting" | "qa";

export type CapabilityPreview =
  | { kind: "revenue"; steps: string[] }
  | {
      kind: "cash";
      matched: { counterparty: string; amount: string; policy: string };
      exception: { counterparty: string; amount: string };
      forecastLabel: string;
      forecast: number[];
    }
  | { kind: "close"; rows: { label: string; status: "done" | "running" | "review" }[]; footer: string }
  | { kind: "ar-ap"; rows: { ledger: "AR" | "AP"; text: string; flagged?: boolean }[] }
  | {
      kind: "reporting";
      entities: string[];
      figures: { label: string; value: string }[];
      note: string;
    }
  | { kind: "qa"; question: string; answer: { lead: string; figure: string; rest: string }; confidence: string; source: string };

export interface Capability {
  id: CapabilityId;
  index: string;
  label: string;
  heading: string;
  bullets: string[];
  cta?: NavLink;
  preview: CapabilityPreview;
}

/* ---------- Marketing primitives ---------- */

export interface Outcome {
  title: string;
  body: string;
  stat: string;
  statLabel: string;
}

export interface Stat {
  value: string;
  unit?: string;
  label: string;
}

export interface Person {
  name: string;
  initials: string;
  role: string;
  company?: string;
}

export interface Testimonial {
  quote: string;
  author: Person;
  highlights: { value: string; label: string }[];
}

export interface Guide {
  kind: string;
  title: string;
  summary: string;
  action: string;
  href: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface RoleCard {
  id: "cfo" | "controller";
  eyebrow: string;
  title: string;
  body: string;
  cta: NavLink;
}

export type HowItWorksScene = "data" | "policies" | "work" | "review";

export interface HowItWorksStep {
  id: HowItWorksScene;
  label: string;
  title: string;
  description: string;
}
