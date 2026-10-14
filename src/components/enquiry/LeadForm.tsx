"use client";

import { useId, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { FiCheck } from "react-icons/fi";
import { COUNTRY_CODES, leadWhatsappText, phoneRule, validateLead, type Lead } from "@/lib/lead";
import { whatsappLink } from "@/data/site";
import { useLanding, useLeadSubmitted } from "./EnquiryProvider";

/** compact: hero card · full: plan-trip section · modal: popup (name + phone only). */
type Variant = "compact" | "full" | "modal";

type Props = {
  variant?: Variant;
  source: string;
  packageName?: string;
  submitLabel?: string;
  onSuccess?: () => void;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

const TRAVELLER_OPTIONS = ["1 Adult", "2 Adults", "3 Adults", "4 Adults", "5–8 People", "9+ (Group)"];

export default function LeadForm({ variant = "compact", source, packageName, submitLabel = "Get Free Itinerary", onSuccess }: Props) {
  const uid = useId();
  const config = useLanding();
  const leadSubmitted = useLeadSubmitted();
  const [form, setForm] = useState({
    name: "",
    countryCode: "+91",
    phone: "",
    travelDate: "",
    travellers: "2 Adults",
    message: "",
    website: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [delivered, setDelivered] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState<Lead | null>(null);

  const rule = phoneRule(form.countryCode);
  // The popup keeps its button muted until the two fields look complete (atravelq behaviour).
  const incomplete = variant === "modal" && (form.name.trim().length < 2 || form.phone.length < rule.min);
  const set = (k: keyof typeof form, v: string) => setForm(f => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const lead: Lead = {
      name: form.name.trim(),
      countryCode: form.countryCode,
      phone: form.phone,
      travelDate: variant === "full" ? form.travelDate : undefined,
      travellers: variant === "modal" ? undefined : form.travellers,
      message: variant === "full" ? form.message.trim() : undefined,
      packageName,
      destination: config.name,
      source,
      website: form.website,
    };
    const invalid = validateLead(lead);
    if (invalid) {
      setError(invalid);
      return;
    }
    setError("");
    setStatus("sending");
    let reachedTeam = false;
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      const data = (await res.json().catch(() => ({}))) as { delivered?: boolean; error?: string };
      if (res.status === 422) {
        setError(data.error ?? "Please check your details.");
        setStatus("idle");
        return;
      }
      reachedTeam = res.ok && data.delivered !== false;
    } catch {
      // Network trouble — fall through to the WhatsApp hand-off rather than losing the visitor.
    }
    setDelivered(reachedTeam);
    window.gtag?.("event", "generate_lead", { form_source: source, package: packageName });
    window.fbq?.("track", "Lead", { content_name: packageName ?? `${config.name} Tour Packages` });
    setSubmitted(lead);
    setStatus("done");
    leadSubmitted();
    onSuccess?.();
  };

  if (status === "done" && submitted) {
    return (
      <div className="sr-form-done" role="status">
        <span className="sr-form-done-icon"><FiCheck aria-hidden="true" /></span>
        <p className="sr-form-done-title">Thank you, {submitted.name.split(" ")[0]}!</p>
        <p className="sr-form-done-text">
          {delivered
            ? `Our ${config.specialist} will call you shortly with your personalised itinerary and best price.`
            : `Tap below to send your request on WhatsApp — our ${config.specialist} will reply with your itinerary right away.`}
        </p>
        <a
          className="sr-btn sr-btn--whatsapp"
          href={whatsappLink(leadWhatsappText(submitted))}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp aria-hidden="true" /> {delivered ? "Chat on WhatsApp now" : "Send on WhatsApp"}
        </a>
      </div>
    );
  }

  return (
    <form className={`sr-form sr-form--${variant}`} onSubmit={submit} noValidate>
      <div className="sr-field">
        <label htmlFor={`${uid}-name`}>Full name</label>
        <input
          id={`${uid}-name`}
          type="text"
          placeholder="Your name *"
          autoComplete="name"
          value={form.name}
          onChange={e => set("name", e.target.value)}
          required
        />
      </div>

      <div className="sr-field">
        <label htmlFor={`${uid}-phone`}>Phone / WhatsApp</label>
        <div className="sr-phone">
          <select
            aria-label="Country code"
            value={form.countryCode}
            onChange={e => {
              set("countryCode", e.target.value);
              set("phone", form.phone.slice(0, phoneRule(e.target.value).max));
            }}
          >
            {COUNTRY_CODES.map(c => (
              <option key={c.code} value={c.code}>{c.label}</option>
            ))}
          </select>
          <input
            id={`${uid}-phone`}
            type="tel"
            inputMode="numeric"
            placeholder="Phone / WhatsApp *"
            autoComplete="tel-national"
            maxLength={rule.max}
            value={form.phone}
            onChange={e => set("phone", e.target.value.replace(/\D/g, "").slice(0, rule.max))}
            required
          />
        </div>
      </div>

      {variant === "full" && (
        <div className="sr-field">
          <label htmlFor={`${uid}-date`}>Travel date</label>
          <input
            id={`${uid}-date`}
            type="date"
            value={form.travelDate}
            onChange={e => set("travelDate", e.target.value)}
          />
        </div>
      )}

      {variant !== "modal" && (
        <div className="sr-field">
          <label htmlFor={`${uid}-pax`}>Travellers</label>
          <select id={`${uid}-pax`} value={form.travellers} onChange={e => set("travellers", e.target.value)}>
            {TRAVELLER_OPTIONS.map(o => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
      )}

      {variant === "full" && (
        <div className="sr-field sr-field--wide">
          <label htmlFor={`${uid}-msg`}>Anything we should know?</label>
          <textarea
            id={`${uid}-msg`}
            rows={3}
            placeholder={config.messagePlaceholder}
            value={form.message}
            onChange={e => set("message", e.target.value)}
          />
        </div>
      )}

      {/* Honeypot: hidden from people and screen readers, irresistible to bots. */}
      <div className="sr-hp" aria-hidden="true">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" value={form.website} onChange={e => set("website", e.target.value)} />
        </label>
      </div>

      {error && <p className="sr-form-error" role="alert">{error}</p>}

      <button
        type="submit"
        className={variant === "modal" ? "sr-modal-submit" : "sr-btn sr-btn--gold sr-btn--block"}
        disabled={status === "sending" || incomplete}
      >
        {status === "sending" ? "Sending…" : submitLabel}
      </button>
      {variant !== "modal" && (
        <p className="sr-form-note">No spam, no obligation — a {config.specialist} will call you back.</p>
      )}
    </form>
  );
}
