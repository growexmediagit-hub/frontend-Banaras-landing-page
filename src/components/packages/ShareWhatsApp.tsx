"use client";

import { FaWhatsapp } from "react-icons/fa6";
import { daysNightsLabel, formatINR, type TourPackage } from "@/data/landing";
import { SITE } from "@/data/site";

type Props = { pkg: TourPackage; unit: string; className?: string };

/** "Share on WhatsApp" — opens WhatsApp's contact picker with the package and a link to this page. */
export default function ShareWhatsApp({ pkg, unit, className = "sr-share-wa" }: Props) {
  const share = () => {
    const url = `${window.location.origin}${window.location.pathname}`;
    const text =
      `Check out this trip: ${pkg.title} (${daysNightsLabel(pkg.nights)}) — ` +
      `from ${formatINR(pkg.price)}${unit} with ${SITE.brand}.\n${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <button type="button" className={className} onClick={share}>
      <FaWhatsapp aria-hidden="true" /> Share on WhatsApp
    </button>
  );
}
