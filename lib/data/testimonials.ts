import type { Person, Testimonial } from "@/types/content";

export const maya: Person = {
  name: "Maya R.",
  initials: "MR",
  role: "Controller",
  company: "Harborline Logistics",
};

export const daniel: Person = {
  name: "Daniel K.",
  initials: "DK",
  role: "CFO",
  company: "Fernway Health",
};

export const elena: Person = {
  name: "Elena M.",
  initials: "EM",
  role: "VP Finance",
  company: "Quarry Labs",
};

export const testimonialsIntro = {
  eyebrow: "From the pilot",
  heading: "What finance teams say after one close.",
  body: "Notes from controllers and CFOs who ran a close with Closewell during the design pilot.",
} as const;

export const testimonials: Testimonial[] = [
  {
    quote:
      "The reconciliations were waiting for me on day one, each with the bank line and the invoice attached. I spent close week reviewing, not rebuilding.",
    author: maya,
    highlights: [
      { value: "Day 1", label: "Recs ready" },
      { value: "Cited", label: "Every entry" },
    ],
  },
  {
    quote:
      "I asked why software spend jumped and got the answer with the three invoices behind it. That is the first AI tool I’d forward to our auditors.",
    author: daniel,
    highlights: [
      { value: "Slack", label: "Ledger Q&A" },
      { value: "Linked", label: "Source invoices" },
    ],
  },
  {
    quote: "It writes down how we do things, then does them that way. New hires learn our policies from Closewell.",
    author: elena,
    highlights: [
      { value: "Written", label: "Policy library" },
      { value: "Faster", label: "Onboarding" },
    ],
  },
];
