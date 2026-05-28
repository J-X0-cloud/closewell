import { demoRequestSchema } from "@/lib/validation/demo-request";
import { leadSink, qualifyLead } from "@/lib/services/demo-requests";

export const runtime = "nodejs";

/** POST /api/demo-requests: validates, qualifies and forwards a "Book a demo" submission. */
export async function POST(request: Request): Promise<Response> {
  const body = await request.json().catch(() => null);
  const parsed = demoRequestSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      { ok: false, fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const lead = qualifyLead(parsed.data);

  try {
    await leadSink().deliver(lead);
  } catch (error) {
    console.error("[demo-request] delivery failed", error);
    return Response.json({ ok: false, error: "We couldn’t send your request. Email hello@closewell.com." }, { status: 502 });
  }

  return Response.json({ ok: true, id: lead.id }, { status: 201 });
}
