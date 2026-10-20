import { NextResponse } from "next/server";

// All forms post here. Forwards to the St. Fort's GoHighLevel inbound webhook,
// which stays server-side (GHL_WEBHOOK_URL) and is never sent to the browser.
const FIELDS = [
  "name", "phone", "email", "notes", "preferred_contact", "preferred_time", "inquiry_type", "source", "page_url",
  "landing_page", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid",
] as const;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }

  const lead: Record<string, string> = {};
  for (const f of FIELDS) {
    const v = body[f];
    if (typeof v === "string") lead[f] = v.trim().slice(0, 500);
  }
  if (!lead.name || lead.name.length < 2 || !/^[0-9()+\-.\s]{7,20}$/.test(lead.phone || "")) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });
  }
  if (!["immediate_need", "pre_planning", "callback"].includes(lead.inquiry_type)) lead.inquiry_type = "callback";
  lead.tags = lead.inquiry_type.replace("_", "-");
  lead.submitted_at = new Date().toISOString();

  const url = process.env.GHL_WEBHOOK_URL;
  if (!url) {
    // Preview mode: nothing is stored until the webhook is configured.
    console.info("[lead] GHL_WEBHOOK_URL not set — preview only", lead);
    return NextResponse.json({ ok: true, preview: true });
  }
  try {
    const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(lead) });
    if (!r.ok) throw new Error(String(r.status));
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[lead] webhook failed", e);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
