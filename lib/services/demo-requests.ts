import "server-only";
import { serverEnv } from "@/lib/env";
import { isWorkEmail, type DemoRequest } from "@/lib/validation/demo-request";

export type LeadTier = "priority" | "standard" | "nurture";

export interface QualifiedLead extends DemoRequest {
  id: string;
  tier: LeadTier;
  score: number;
  reasons: string[];
  receivedAt: string;
}

/** ERPs Closewell ships native connectors for. */
const NATIVE_LEDGERS = new Set(["NetSuite", "Sage Intacct", "QuickBooks Online", "Xero", "Microsoft Dynamics"]);

/**
 * Scores an inbound demo request so sales can prioritise. Long closes on a supported ledger,
 * owned by a controller or finance leader, are the best fit.
 */
export function qualifyLead(request: DemoRequest, now = new Date()): QualifiedLead {
  let score = 0;
  const reasons: string[] = [];

  if (request.closeDays === "10plus") {
    score += 40;
    reasons.push("Close runs 10+ days");
  } else if (request.closeDays === "5-10") {
    score += 25;
    reasons.push("Close runs 5–10 days");
  }

  if (NATIVE_LEDGERS.has(request.ledger)) {
    score += 25;
    reasons.push(`Native connector for ${request.ledger}`);
  }

  if (request.role === "Controller" || request.role === "CFO / VP Finance") {
    score += 20;
    reasons.push(`Decision maker: ${request.role}`);
  }

  if (isWorkEmail(request.email)) {
    score += 10;
  } else {
    reasons.push("Personal email domain");
  }

  if (request.focus.length > 20) {
    score += 5;
    reasons.push("Named a first account to review");
  }

  const tier: LeadTier = score >= 70 ? "priority" : score >= 40 ? "standard" : "nurture";

  return {
    ...request,
    id: crypto.randomUUID(),
    tier,
    score,
    reasons,
    receivedAt: now.toISOString(),
  };
}

export interface LeadSink {
  deliver(lead: QualifiedLead): Promise<void>;
}

/** Posts the qualified lead to the configured CRM webhook. */
class WebhookLeadSink implements LeadSink {
  constructor(private readonly url: string) {}

  async deliver(lead: QualifiedLead): Promise<void> {
    const response = await fetch(this.url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ type: "demo_request", lead }),
    });
    if (!response.ok) {
      throw new Error(`Lead webhook responded ${response.status}`);
    }
  }
}

/** Local development sink. */
class ConsoleLeadSink implements LeadSink {
  async deliver(lead: QualifiedLead): Promise<void> {
    console.info("[demo-request]", lead.tier, lead.score, lead.email, lead.reasons.join("; "));
  }
}

export function leadSink(): LeadSink {
  const { DEMO_WEBHOOK_URL } = serverEnv();
  return DEMO_WEBHOOK_URL ? new WebhookLeadSink(DEMO_WEBHOOK_URL) : new ConsoleLeadSink();
}
