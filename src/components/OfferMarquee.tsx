"use client";

import { Fragment } from "react";
import { maxDiscountPct } from "@/data/landing";
import { CountdownInline } from "./Countdown";
import { useLanding } from "./enquiry/EnquiryProvider";

/** Seamless scrolling ticker pinned to the bottom of the hero (two identical tracks). */
export default function OfferMarquee() {
  const config = useLanding();
  const item = (
    <span className="sr-marquee-item">
      <strong>{config.offer.name}</strong> — get up to <strong>{maxDiscountPct(config)}% off</strong> on {config.name} tour packages
      <span className="sr-marquee-dot">✦</span>
      Offer valid for <CountdownInline />
      <span className="sr-marquee-dot">✦</span>
    </span>
  );
  const track = (
    <div className="sr-marquee-track">
      {Array.from({ length: 4 }, (_, i) => <Fragment key={i}>{item}</Fragment>)}
    </div>
  );

  return (
    <div className="sr-marquee" aria-hidden="true">
      {track}
      {track}
    </div>
  );
}
