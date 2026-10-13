import Image from "next/image";
import type { IconType } from "react-icons";
import { FaWhatsapp } from "react-icons/fa6";
import { FiCheck, FiClock, FiGift, FiMapPin } from "react-icons/fi";
import { LuBed, LuBus, LuCamera, LuCoffee, LuPlane, LuShip, LuUserRound } from "react-icons/lu";
import { whatsappLink } from "@/data/site";
import { discountPct, durationLabel, formatINR, type Include, type TourPackage } from "@/data/landing";
import EnquireButton from "../enquiry/EnquireButton";

const INCLUDE_META: Record<Include, { icon: IconType; label: string }> = {
  hotel: { icon: LuBed, label: "Hotel" },
  breakfast: { icon: LuCoffee, label: "Breakfast" },
  transfers: { icon: LuBus, label: "Transfers" },
  sightseeing: { icon: LuCamera, label: "Sightseeing" },
  guide: { icon: LuUserRound, label: "Guide" },
  cruise: { icon: LuShip, label: "Cruise" },
  flights: { icon: LuPlane, label: "Flights" },
};

type Props = { pkg: TourPackage; unit: string; priority?: boolean };

export default function PackageCard({ pkg, unit, priority = false }: Props) {
  const pct = discountPct(pkg);
  const save = pkg.oldPrice ? pkg.oldPrice - pkg.price : 0;

  const title = <h3 className="sr-card-title">{pkg.title}</h3>;

  return (
    <article className="sr-card">
      <div className="sr-card-media">
        <Image
          src={pkg.image}
          alt={pkg.imageAlt}
          fill
          placeholder="blur"
          priority={priority}
          sizes="(max-width: 767px) 85vw, (max-width: 1100px) 45vw, 380px"
        />
        {pkg.badge && <span className="sr-card-badge">{pkg.badge}</span>}
        {save > 0 && <span className="sr-card-save">Save {formatINR(save)}</span>}
        <span className="sr-card-duration">
          <FiClock aria-hidden="true" /> {durationLabel(pkg.nights)}
        </span>
      </div>

      <div className="sr-card-body">
        {pkg.stops ? (
          <ul className="sr-card-stops" aria-label="Route">
            {pkg.stops.map(s => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        ) : (
          <p className="sr-card-route">
            <FiMapPin aria-hidden="true" /> {pkg.route.join(" · ")}
          </p>
        )}

        {pkg.detailsUrl ? (
          <a href={pkg.detailsUrl} target="_blank" rel="noopener" className="sr-card-title-link">
            {title}
          </a>
        ) : (
          title
        )}

        {pkg.perk && (
          <p className="sr-card-perk">
            <FiGift aria-hidden="true" /> {pkg.perk}
          </p>
        )}

        <ul className="sr-card-highlights">
          {pkg.highlights.map(h => (
            <li key={h}>
              <FiCheck aria-hidden="true" /> {h}
            </li>
          ))}
        </ul>

        {pkg.includes && (
          <ul className="sr-card-includes" aria-label="Included">
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
        )}

        <div className="sr-card-foot">
          <div className="sr-card-price">
            {pct > 0 && <span className="sr-card-sale">{pct}% off</span>}
            <p>
              <strong>{formatINR(pkg.price)}</strong>
              {pkg.oldPrice && <s>{formatINR(pkg.oldPrice)}</s>}
              <span>{unit}</span>
            </p>
          </div>
          <div className="sr-card-actions">
            <a
              className="sr-icon-btn"
              href={whatsappLink(`Hi! I'm interested in the "${pkg.title}" package (${durationLabel(pkg.nights)}).`)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ask about ${pkg.title} on WhatsApp`}
            >
              <FaWhatsapp aria-hidden="true" />
            </a>
            <EnquireButton packageId={pkg.id} source="package-card" className="sr-btn sr-btn--navy sr-btn--sm">
              Enquire Now
            </EnquireButton>
          </div>
        </div>
      </div>
    </article>
  );
}
