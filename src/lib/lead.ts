// Shared between the enquiry forms and the /api/enquiry route so both sides
// validate the same way.

export const COUNTRY_CODES = [
  { code: "+91", label: "IN +91", min: 10, max: 10 },
  { code: "+1", label: "US +1", min: 10, max: 10 },
  { code: "+44", label: "UK +44", min: 10, max: 10 },
  { code: "+971", label: "AE +971", min: 9, max: 9 },
  { code: "+61", label: "AU +61", min: 9, max: 9 },
  { code: "+65", label: "SG +65", min: 8, max: 8 },
  { code: "+977", label: "NP +977", min: 10, max: 10 },
] as const;

export const phoneRule = (code: string) =>
  COUNTRY_CODES.find(c => c.code === code) ?? { code, label: code, min: 7, max: 15 };

export type Lead = {
  name: string;
  countryCode: string;
  phone: string;
  travelDate?: string;
  travellers?: string;
  packageName?: string;
  /** Landing page destination, e.g. "Bangkok Pattaya". */
  destination?: string;
  message?: string;
  /** Which form on the page the lead came from. */
  source: string;
  /** Honeypot — real visitors never see or fill it. */
  website?: string;
};

export function validateLead(lead: Partial<Lead>): string | null {
  if (!lead.name || lead.name.trim().length < 2) return "Please enter your name.";
  if (lead.name.length > 80) return "Name is too long.";
  const rule = phoneRule(lead.countryCode ?? "+91");
  const phone = (lead.phone ?? "").replace(/\D/g, "");
  if (phone.length < rule.min || phone.length > rule.max) {
    return rule.min === rule.max
      ? `Please enter a valid ${rule.min}-digit phone number.`
      : "Please enter a valid phone number.";
  }
  if (lead.countryCode === "+91" && !/^[6-9]/.test(phone)) return "Please enter a valid Indian mobile number.";
  if ((lead.message ?? "").length > 1000) return "Message is too long.";
  return null;
}

export function leadWhatsappText(lead: Lead) {
  return [
    `Hi! I'd like to plan a ${lead.destination ?? "holiday"} trip.`,
    `Name: ${lead.name}`,
    `Phone: ${lead.countryCode} ${lead.phone}`,
    lead.packageName && `Package: ${lead.packageName}`,
    lead.travelDate && `Travel date: ${lead.travelDate}`,
    lead.travellers && `Travellers: ${lead.travellers}`,
    lead.message && `Note: ${lead.message}`,
  ]
    .filter(Boolean)
    .join("\n");
}
