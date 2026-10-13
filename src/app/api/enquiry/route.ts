import { NextResponse } from "next/server";
import { validateLead, type Lead } from "@/lib/lead";

// Receives enquiry-form submissions and forwards them to LEAD_WEBHOOK_URL
// (Google Apps Script, Zapier, Make, a CRM...). `delivered: false` tells the
// client to push the visitor to the WhatsApp hand-off so no lead is lost.

export async function POST(req: Request) {
  let body: Partial<Lead>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Bots fill every field; pretend success so they don't retry.
  if (body.website) return NextResponse.json({ ok: true, delivered: true });

  const error = validateLead(body);
  if (error) return NextResponse.json({ ok: false, error }, { status: 422 });

  const lead = {
    name: body.name!.trim(),
    phone: `${body.countryCode} ${body.phone!.replace(/\D/g, "")}`,
    travelDate: body.travelDate?.slice(0, 40) || "Flexible",
    travellers: body.travellers?.slice(0, 40) || "Not specified",
    destination: body.destination?.slice(0, 60) || "Not specified",
    packageName: body.packageName?.slice(0, 120) || "Not specified",
    message: body.message?.trim().slice(0, 1000) || "",
    source: `${String(body.destination ?? "Landing").slice(0, 60)} landing page — ${String(body.source ?? "form").slice(0, 40)}`,
    page: req.headers.get("referer") ?? "",
    submittedAt: new Date().toISOString(),
  };

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) {
    console.warn("[enquiry] LEAD_WEBHOOK_URL is not set — lead only handed off via WhatsApp:", lead.phone);
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[enquiry] webhook delivery failed", err);
    return NextResponse.json({ ok: true, delivered: false });
  }
}
