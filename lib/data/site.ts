import type { FooterColumn, NavLink } from "@/types/content";

export const siteConfig = {
  name: "Closewell",
  title: "Closewell · The AI close agent for finance teams",
  description:
    "Closewell reconciles accounts, drafts entries and answers finance questions from your own ledger and policies, with every answer cited.",
  tagline: "The AI close agent for finance teams, grounded in your own ledger and policies.",
  email: "hello@closewell.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://closewell.com",
  announcement: "Introducing Closewell",
} as const;

export const mainNav: NavLink[] = [
  { label: "Platform", href: "/platform" },
  { label: "For Controllers", href: "/controllers" },
  { label: "How it works", href: "/#hiw" },
  { label: "FAQ", href: "/platform#faq" },
];

export const primaryCta: NavLink = { label: "Book a demo", href: "/get-started" };

export const footerColumns: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Month-end close", href: "/platform#prod" },
      { label: "Cash matching", href: "/platform#prod" },
      { label: "Revenue schedules", href: "/platform#prod" },
      { label: "Ledger Q&A", href: "/platform#prod" },
    ],
  },
  {
    title: "Teams",
    links: [
      { label: "For Controllers", href: "/controllers" },
      { label: "For CFOs", href: "/platform#rolesx" },
      { label: "How it works", href: "/#hiw" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Platform", href: "/platform" },
      { label: "FAQ", href: "/platform#faq" },
      { label: "Security", href: "/#trust" },
      { label: "Book a demo", href: "/get-started" },
    ],
  },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy", href: "/#trust" },
  { label: "Terms", href: "/#trust" },
  { label: "Security", href: "/#trust" },
];

/** Design-pilot customers shown in the hero logo strip. */
export const customerLogos: string[] = [
  "Harborline",
  "FERNWAY",
  "quarry/labs",
  "Northgate",
  "Tallow&Co",
  "brightwater",
  "OKAPI",
  "Saltmarsh",
  "Veridian",
  "lumen·freight",
];

export const certifications = ["SOC 2 Type II", "GDPR", "ISO/IEC 27001", "CCPA"] as const;
