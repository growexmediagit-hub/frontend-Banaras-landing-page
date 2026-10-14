"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa6";
import { FiArrowRight, FiCheck, FiExternalLink, FiGift, FiX } from "react-icons/fi";
import { daysNightsLabel, formatINR } from "@/data/landing";
import { whatsappLink } from "@/data/site";
import { useEnquiry, useLanding } from "../enquiry/EnquiryProvider";
import { INCLUDE_META } from "./includes";

/** Package details popup behind a card's "View" button — everything the slim card leaves out. */
export default function PackageQuickView({ packageId, onClose }: { packageId: string; onClose: () => void }) {
  const config = useLanding();
  const { open } = useEnquiry();
  const dialogRef = useRef<HTMLDivElement>(null);
  const pkg = config.packages.find(p => p.id === packageId);

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus({ preventScroll: true });
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus?.({ preventScroll: true });
    };
  }, [onClose]);

  if (!pkg) return null;
  const save = pkg.oldPrice ? pkg.oldPrice - pkg.price : 0;

  return (
    <div className="sr-modal-backdrop" onClick={onClose}>
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="sr-modal sr-qv"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sr-qv-title"
        onClick={e => e.stopPropagation()}
      >
        <button type="button" className="sr-modal-close" aria-label="Close" onClick={onClose}>
          <FiX aria-hidden="true" />
        </button>

        <div className="sr-qv-media">
          <Image src={pkg.image} alt={pkg.imageAlt} fill placeholder="blur" sizes="(max-width: 560px) 100vw, 520px" />
          {save > 0 && <span className="sr-card-save">Save {formatINR(save)}</span>}
        </div>

        <div className="sr-qv-body">
          <p className="sr-card-duration">{daysNightsLabel(pkg.nights)}</p>
          <h2 id="sr-qv-title" className="sr-qv-title">{pkg.title}</h2>

          <ul className="sr-qv-stops" aria-label="Route">
            {(pkg.stops ?? pkg.route).map(s => (
              <li key={s}>{s}</li>
            ))}
          </ul>

          {pkg.perk && (
            <p className="sr-qv-perk">
              <FiGift aria-hidden="true" /> {pkg.perk}
            </p>
          )}

          <h3 className="sr-qv-hd">Highlights</h3>
          <ul className="sr-qv-highlights">
            {pkg.highlights.map(h => (
              <li key={h}>
                <FiCheck aria-hidden="true" /> {h}
              </li>
            ))}
          </ul>

          {pkg.includes && (
            <>
              <h3 className="sr-qv-hd">Included</h3>
              <ul className="sr-qv-includes">
                {pkg.includes.map(key => {
                  const { icon: Icon, label } = INCLUDE_META[key];
                  return (
                    <li key={key}>
                      <Icon aria-hidden="true" />
                      <span>{label}</span>
                    </li>
                  );
                })}
              </ul>
            </>
          )}

          <div className="sr-qv-foot">
            <p className="sr-card-price">
              <strong>{formatINR(pkg.price)}</strong>
              {pkg.oldPrice && <s>{formatINR(pkg.oldPrice)}</s>}
              <span>{config.priceUnit}</span>
            </p>
            <div className="sr-qv-actions">
              <a
                className="sr-icon-btn"
                href={whatsappLink(`Hi! I'm interested in the "${pkg.title}" package (${daysNightsLabel(pkg.nights)}).`)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ask about ${pkg.title} on WhatsApp`}
              >
                <FaWhatsapp aria-hidden="true" />
              </a>
              <button type="button" className="sr-card-btn sr-card-btn--primary" onClick={() => open({ packageId: pkg.id, source: "quick-view" })}>
                Enquire Now <FiArrowRight aria-hidden="true" />
              </button>
            </div>
          </div>

          {pkg.detailsUrl && (
            <a href={pkg.detailsUrl} target="_blank" rel="noopener" className="sr-price-card-link sr-qv-link">
              Full package details <FiExternalLink aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
