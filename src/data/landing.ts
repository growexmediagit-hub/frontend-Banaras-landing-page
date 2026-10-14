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
  /** Extra photos for the card slider; when left out, the slider uses this config's place photos for the route's cities. */
  images?: Slide[];
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

export type Slide = { image: StaticImageData; alt: string };

export type ImageItem = { name: string; tagline: string; image: StaticImageData; alt: string };

export type FactIcon = "calendar" | "plane" | "car" | "currency" | "clock" | "passport";

export type Credit = { what: string; who: string; license: string; url: string };

/** Pre-projected SVG route map (see src/data/maps/). Coordinates are in a width × height viewBox. */
export type RouteMap = {
  width: number;
  height: number;
  land: string;
  /** Highlighted state/region drawn over the land. */
  region?: string;
  borders?: string;
  rivers: string;
  stops: { name: string; x: number; y: number; anchor: "start" | "end" | "middle"; dx: number; dy: number; start?: boolean; minor?: boolean; note?: string }[];
  legs: { d: string; mode: "road" | "boat" | "flight" }[];
  labels: { text: string; x: number; y: number; kind: "sea" | "river" | "region" }[];
  icons: { kind: "plane" | "boat"; x: number; y: number }[];
};

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
  };
  priceUnit: string;
  /** Small print under package grids, e.g. "excl. flights". */
  priceNote?: string;
  packageTypes: { key: string; label: string }[];
  categoryRows: { type: string; eyebrow: string; title: string }[];
  packagesSection: { eyebrow: string; title: string; lead: string; /** word in the title that gets the shimmer highlight */ highlight?: string };
  /** "Srivastava Route Exclusives – {place} Packages"; place gets the gold shimmer. */
  deals: { place: string; lead: string };
  packages: TourPackage[];
  spotlight: { packageId: string; intro: string; map?: RouteMap };
  facts?: { label: string; value: string; icon: FactIcon }[];
  places: { eyebrow: string; title: string; lead: string; cta: string; items: ImageItem[] };
  experiences?: { eyebrow: string; title: string; lead: string; items: ImageItem[] };
  /** "Thailand in pictures" carousel. */
  gallery?: { title: string; items: { image: StaticImageData; alt: string; caption: string }[] };
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
  /** Specialist's photo for the "Speak to someone" card; the headphone icon shows until one is set. */
  expertPhoto?: StaticImageData;
  credits: Credit[];
  whatsapp: { greeting: string; teasers: string[] };
  messagePlaceholder: string;
};

export const days = (nights: number) => nights + 1;

export const durationLabel = (nights: number) =>
  `${nights} Night${nights > 1 ? "s" : ""} & ${days(nights)} Days`;

/** atravelq-style card label: "5 days & 4 nights". */
export const daysNightsLabel = (nights: number) =>
  `${days(nights)} day${days(nights) > 1 ? "s" : ""} & ${nights} night${nights > 1 ? "s" : ""}`;

export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export const discountPct = (p: TourPackage) =>
  p.oldPrice && p.oldPrice > p.price ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;

export const maxDiscountPct = (c: LandingConfig) => Math.max(0, ...c.packages.map(discountPct));

export const cheapestPackage = (c: LandingConfig) => c.packages.reduce((a, b) => (b.price < a.price ? b : a));

export const spotlightPackage = (c: LandingConfig) =>
  c.packages.find(p => p.id === c.spotlight.packageId) ?? c.packages[0];

export const packagesOfType = (c: LandingConfig, type: string | null) =>
  type ? c.packages.filter(p => p.types.includes(type)) : c.packages;

/** Photos for a package card's slider: the cover first, then its own extras, or else the route's
 *  place photos topped up with the page's experiences. */
export const packageSlides = (c: LandingConfig, p: TourPackage, max = 5): Slide[] => {
  const toSlide = (i: ImageItem): Slide => ({ image: i.image, alt: i.alt });
  const extras = p.images ?? [
    ...p.route.flatMap(city => c.places.items.filter(i => i.name === city).map(toSlide)),
    ...(c.experiences?.items.map(toSlide) ?? []),
  ];
  const slides = [{ image: p.image, alt: p.imageAlt }, ...extras];
  return slides.filter((s, i) => slides.findIndex(o => o.image.src === s.image.src) === i).slice(0, max);
};
