import type { Capability } from "@/types/content";

/** The six workflows shown in the "What it does" tab set (homepage and platform page). */
export const capabilities: Capability[] = [
  {
    id: "revenue",
    index: "01",
    label: "Revenue schedules",
    heading: "Contracts in, schedules out.",
    bullets: [
      "Reads each contract and builds the deferred revenue waterfall and entries",
      "Drafts the ASC 606 memo, with the clauses it relied on quoted",
      "Keeps invoicing and billing in step with the schedule",
      "Handles usage pricing, true-ups and mid-term amendments",
    ],
    cta: { label: "See revenue workflows", href: "/get-started" },
    preview: {
      kind: "revenue",
      steps: [
        "Salesforce contract",
        "ASC 606",
        "Journal entry drafted",
        "Deferred revenue waterfall",
        "606 memo & SSP analysis",
      ],
    },
  },
  {
    id: "cash",
    index: "02",
    label: "Cash matching",
    heading: "Cash that matches itself.",
    bullets: [
      "Matches bank lines to invoices and bills the day they land",
      "Reconciles to your own workpaper template, daily",
      "Keeps the 13-week cash view current",
    ],
    cta: { label: "See cash workflows", href: "/get-started" },
    preview: {
      kind: "cash",
      matched: { counterparty: "Harlow Freight", amount: "$12,442", policy: "SHORT-PAY-01" },
      exception: { counterparty: "Byte Foods", amount: "$9,405" },
      forecastLabel: "13-wk forecast",
      forecast: [42, 46, 44, 51, 49, 55, 58, 54, 61, 63, 60, 66, 70],
    },
  },
  {
    id: "close",
    index: "03",
    label: "Month-end close",
    heading: "A close that prepares itself.",
    bullets: [
      "Runs accruals, prepaids and fixed-asset schedules",
      "Drafts journal entries with the evidence attached",
      "Ties out reconciliations and keeps the trail",
      "Writes flux commentary as the numbers move",
    ],
    cta: { label: "See the close workflow", href: "/controllers" },
    preview: {
      kind: "close",
      rows: [
        { label: "Subledgers · accruals, prepaids & others, running", status: "running" },
        { label: "Journal entries · auto-drafted and posted", status: "done" },
        { label: "Reconciliations · 34 of 36 complete", status: "done" },
        { label: "Intercompany rec · with you for review", status: "review" },
      ],
      footer: "Sign off when you’re ready",
    },
  },
  {
    id: "ar-ap",
    index: "04",
    label: "AR and AP",
    heading: "Receivables and payables, handled.",
    bullets: [
      "Sends reminders and logs promised payment dates",
      "Captures, codes and schedules vendor bills",
      "Drafts replies to routine vendor and customer emails",
      "Anything outside your terms comes to you",
    ],
    preview: {
      kind: "ar-ap",
      rows: [
        { ledger: "AR", text: "INV-2201 · reminder sent · promised Fri" },
        { ledger: "AP", text: "Vendor bill · coded 6420 · scheduled net-30" },
        { ledger: "AR", text: "Fairmont asks net-60, sent to you", flagged: true },
      ],
    },
  },
  {
    id: "reporting",
    index: "05",
    label: "Reporting packs",
    heading: "The reporting pack, drafted.",
    bullets: [
      "Consolidates entities across ledgers",
      "Builds the pack in your template",
      "Explains the variances in plain English",
    ],
    cta: { label: "See reporting", href: "/get-started" },
    preview: {
      kind: "reporting",
      entities: ["US", "UK", "DE"],
      figures: [
        { label: "Revenue", value: "$8.4M" },
        { label: "Opex", value: "$3.1M" },
      ],
      note: "Opex +6% vs plan, commentary drafted",
    },
  },
  {
    id: "qa",
    index: "06",
    label: "Ledger Q&A",
    heading: "Ask your ledger anything.",
    bullets: [
      "Ask in plain English, in Slack or the app",
      "Every answer links the entries and policy it used",
      "Click any figure to open the transaction behind it",
    ],
    cta: { label: "See Ledger Q&A", href: "/get-started" },
    preview: {
      kind: "qa",
      question: "Why did infra cost rise?",
      answer: {
        lead: "Cloud infra",
        figure: "+$31.4K",
        rest: ", a one-time Data platform backfill on Sep 18.",
      },
      confidence: "99%",
      source: "NetSuite · GL",
    },
  },
];
