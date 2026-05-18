import type { Workflow } from "@/types/content";

/** The three policy workflows cycled through in the homepage hero card. */
export const heroWorkflows: Workflow[] = [
  {
    id: "cash",
    label: "Cash",
    sources: [
      { label: "Bank feed", mark: "B", tone: "navy" },
      { label: "Excel", mark: "X", tone: "success" },
      { label: "NetSuite", mark: "N", tone: "muted" },
      { label: "SAP", mark: "S", tone: "navy" },
    ],
    policy: { id: "SHORT-PAY-01", rule: "short ≤ $50 → auto-close" },
    runs: {
      counterparty: "Harlow Freight",
      reference: "#4471",
      amount: "−$38",
      outcome: "posted & closed",
    },
    asks: {
      counterparty: "Pinecrest Foods",
      reference: "#7729",
      amount: "−$495",
      outcome: "awaiting you",
      question: "Approve write-off?",
      reviewer: "Dana, Controller",
    },
    remembers: { id: "SHORT-PAY-01 v2", rule: "≤ $50 or ≤ 5% freight" },
  },
  {
    id: "accrual",
    label: "Accrual",
    sources: [
      { label: "GL history", mark: "G", tone: "navy" },
      { label: "AP inbox", mark: "@", tone: "warning" },
      { label: "SOWs", mark: "W", tone: "muted" },
      { label: "SAP", mark: "S", tone: "navy" },
    ],
    policy: { id: "ACCRUE-01", rule: "no invoice by Day 2 → accrue" },
    runs: {
      counterparty: "Osprey Media",
      reference: "#2210",
      amount: "$12,000",
      outcome: "accrued · reversal set",
    },
    asks: {
      counterparty: "Larkspur retainer",
      reference: "#0417",
      amount: "$48,000",
      outcome: "awaiting you",
      question: "Accrue from the SOW?",
      reviewer: "Dana, Controller",
    },
    remembers: { id: "ACCRUE-01 v2", rule: "auto-accrue repeat vendors" },
  },
  {
    id: "revenue",
    label: "Revenue",
    sources: [
      { label: "Contracts", mark: "C", tone: "navy" },
      { label: "Invoices", mark: "I", tone: "marigold" },
      { label: "NetSuite", mark: "N", tone: "muted" },
      { label: "Stripe", mark: "S", tone: "navy" },
    ],
    policy: { id: "REV-REC-01", rule: "recognize ratably, 12 mo" },
    runs: {
      counterparty: "Fairmont",
      reference: "ACV $120k",
      amount: "$10k/mo",
      outcome: "schedule live",
    },
    asks: {
      counterparty: "Usage true-up",
      reference: "#8841",
      amount: "+$9,400",
      outcome: "awaiting you",
      question: "Bill the overage?",
      reviewer: "Dana, Controller",
    },
    remembers: { id: "REV-REC-01 v2", rule: "true-ups auto-billed ≤ $10k" },
  },
];

export const workflowStepLabels = ["Reads", "Runs", "Asks you", "Remembers"] as const;
