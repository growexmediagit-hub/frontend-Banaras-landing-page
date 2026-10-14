"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FiMenu, FiPhone, FiX } from "react-icons/fi";
import logo from "@/assets/images/srivastava-route-logo.png";
import { SITE } from "@/data/site";
import { maxDiscountPct } from "@/data/landing";
import ContactPill from "./ContactPill";
import { CountdownInline } from "./Countdown";
import { useEnquiry, useLanding } from "./enquiry/EnquiryProvider";

export default function Header() {
  const { open } = useEnquiry();
  const config = useLanding();
  const nav = [
    { href: "#packages", label: "Packages" },
    { href: "#itinerary", label: "Itinerary" },
    ...(config.experiences ? [{ href: "#experiences", label: "Things To Do" }] : []),
    { href: "#destinations", label: "Destinations" },
    { href: "#why-us", label: "Why Us" },
    { href: "#faq", label: "FAQs" },
  ];
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className={`sr-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="sr-topbar">
        <div className="sr-container sr-topbar-inner">
          <p>
            <span className="sr-topbar-spark" aria-hidden="true">✦</span>
            <strong>{config.offer.name}</strong> — up to {maxDiscountPct(config)}% off {config.name} packages · ends in <CountdownInline />
          </p>
        </div>
      </div>

      <div className="sr-nav">
        <a href="#top" className="sr-logo" aria-label={`${SITE.brand} — back to top`}>
          <Image src={logo} alt={`${SITE.brand} Travel Company`} priority sizes="170px" />
        </a>

        <nav id="sr-menu" className={`sr-menu${menuOpen ? " is-open" : ""}`} aria-label="Main">
          {nav.map(item => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
          <a href={`tel:${SITE.phoneE164}`} className="sr-menu-phone">
            <FiPhone aria-hidden="true" /> {SITE.phoneDisplay}
          </a>
        </nav>

        <div className="sr-nav-actions">
          <ContactPill greeting={config.whatsapp.greeting} />
          <button type="button" className="sr-btn sr-btn--gold sr-btn--sm" onClick={() => open({ source: "header" })}>
            Book Now
          </button>
          <button
            type="button"
            className="sr-burger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="sr-menu"
            onClick={() => setMenuOpen(o => !o)}
          >
            {menuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  );
}
