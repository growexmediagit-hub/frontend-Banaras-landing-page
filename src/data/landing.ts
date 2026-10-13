import type { StaticImageData } from "next/image";

// Everything a destination landing page renders comes from one LandingConfig
// (see src/data/destinations/). Keep it plain data — it is passed to client
// components, so no functions or JSX in here.

export type Include = "hotel" | "breakfast" | "transfers" | "sightseeing" | "guide" | "cruise" | "flights";

export type ItineraryDay = { title: string; detail: string };

export type TourPackage = {
  id: string;
  title: string;
  /** Cities in order — used for the route line and structured data. */
  route: string[];
  /** Thrillophilia-style nights per stop, e.g. ["2N Pattaya", "2N Bangkok"]. */
  stops?: string[];
  nights: number;
  price: number;
  oldPrice?: number;
  image: StaticImageData;
  imageAlt: string;
  types: string[];
  highlights: string[];
  badge?: string;
  /** Short freebie shown on the card, e.g. "FREE Coral Island Tour". */
  perk?: string;
  includes?: Include[];
  /** Full package page on the main site, when one exists. */
  detailsUrl?: string;
  itinerary?: ItineraryDay[];
  inclusions?: string[];
  exclusions?: string[];
};

export type ImageItem = { name: string; tagline: string; image: StaticImageData; alt: string };

export type FactIcon = "calendar" | "plane" | "car" | "currency" | "clock" | "passport";

export type Credit = { what: string; who: string; license: string; url: string };

export type LandingConfig = {
  slug: string;
  /** Canonical path of the page. */
  path: string;
  /** Destination as it reads in sentences: "Banaras", "Bangkok Pattaya". */
  name: string;
  /** "Kashi yatra", "Thailand holiday" — used in "Plan your …" copy. */
  tripLabel: string;
  /** "Kashi specialist", "Thailand expert". */
  specialist: string;
  seo: { title: string; description: string; keywords: string[]; ogImage: string; ogAlt: string };
  offer: { name: string; endsAt: string | null };
  hero: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    sub: string;
    image: StaticImageData;
    imageAlt: string;
    trust: string[];
    cardTitle: string;
    cardSub: string;
  };
  priceUnit: string;
  /** Small print under package grids, e.g. "excl. flights". */
  priceNote?: string;
  packageTypes: { key: string; label: string }[];
  categoryRows: { type: string; eyebrow: string; title: string }[];
  packagesSection: { eyebrow: string; title: string; lead: string };
  dealsLead: string;
  packages: TourPackage[];
  spotlight: { packageId: string; intro: string };
  facts?: { label: string; value: string; icon: FactIcon }[];
  places: { eyebrow: string; title: string; lead: string; cta: string; items: ImageItem[] };
  experiences?: { eyebrow: string; title: string; lead: string; items: ImageItem[] };
  why: {
    eyebrow: string;
    title: string;
    lead: string;
    main: StaticImageData;
    mainAlt: string;
    inset: StaticImageData;
    insetAlt: string;
    stamp: [string, string];
    items: { title: string; text: string; icon: "compass" | "shield" | "guide" | "temple" | "food" | "passport" }[];
  };
  steps: { title: string; text: string }[];
  plan: { image: StaticImageData; eyebrow: string; title: string; lead: string; formTitle: string };
  faq: { title: string; lead: string; items: { q: string; a: string }[] };
  /** Paragraphs support **bold** markup. */
  seoCopy: { title: string; paragraphs: string[] };
  credits: Credit[];
  whatsapp: { greeting: string; teasers: string[] };
  messagePlaceholder: string;
};

export const days = (nights: number) => nights + 1;

export const durationLabel = (nights: number) =>
  `${nights} Night${nights > 1 ? "s" : ""} & ${days(nights)} Days`;

export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export const discountPct = (p: TourPackage) =>
  p.oldPrice && p.oldPrice > p.price ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;

export const maxDiscountPct = (c: LandingConfig) => Math.max(0, ...c.packages.map(discountPct));

export const cheapestPackage = (c: LandingConfig) => c.packages.reduce((a, b) => (b.price < a.price ? b : a));

export const spotlightPackage = (c: LandingConfig) =>
  c.packages.find(p => p.id === c.spotlight.packageId) ?? c.packages[0];

export const packagesOfType = (c: LandingConfig, type: string | null) =>
  type ? c.packages.filter(p => p.types.includes(type)) : c.packages;
