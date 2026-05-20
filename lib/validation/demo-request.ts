import { z } from "zod";
import { closeLengthOptions, ledgerOptions, roleOptions } from "@/lib/data/demo";

const closeLengthValues = closeLengthOptions.map((option) => option.value) as [
  (typeof closeLengthOptions)[number]["value"],
  ...(typeof closeLengthOptions)[number]["value"][],
];

export const demoRequestSchema = z.object({
  firstName: z.string().trim().min(1, "Enter your first name").max(80),
  lastName: z.string().trim().min(1, "Enter your last name").max(80),
  email: z.string().trim().toLowerCase().email("Enter a valid work email"),
  company: z.string().trim().max(120).optional().default(""),
  role: z.enum(roleOptions),
  ledger: z.enum(ledgerOptions),
  closeDays: z.enum(closeLengthValues),
  focus: z.string().trim().max(2000).optional().default(""),
});

export type DemoRequestInput = z.input<typeof demoRequestSchema>;
export type DemoRequest = z.output<typeof demoRequestSchema>;

/** Consumer mailboxes are accepted but routed to a lower-priority queue. */
const PERSONAL_DOMAINS = new Set(["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com"]);

export function isWorkEmail(email: string): boolean {
  const domain = email.split("@")[1] ?? "";
  return domain.length > 0 && !PERSONAL_DOMAINS.has(domain);
}
