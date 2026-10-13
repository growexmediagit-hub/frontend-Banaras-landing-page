import Image from "next/image";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { cheapestPackage, formatINR, maxDiscountPct, type LandingConfig } from "@/data/landing";
import EnquireButton from "../enquiry/EnquireButton";
import LeadForm from "../enquiry/LeadForm";
import OfferMarquee from "../OfferMarquee";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export default function Hero({ config }: { config: LandingConfig }) {
  const { hero } = config;
  const from = cheapestPackage(config);
  const pct = maxDiscountPct(config);

  return (
    <section id="top" className="sr-hero" aria-labelledby="sr-hero-title">
      <Image
        src={hero.image}
        alt={hero.imageAlt}
        fill
        priority
        fetchPriority="high"
        placeholder="blur"
        sizes="100vw"
        className="sr-hero-img"
      />
      <div className="sr-hero-shade" aria-hidden="true" />

      <div className="sr-container sr-hero-grid">
        <div className="sr-hero-copy">
          <p className="sr-eyebrow sr-eyebrow--light sr-hero-in" style={delay(0)}>
            {hero.eyebrow}
          </p>
          <h1 id="sr-hero-title" className="sr-hero-title sr-hero-in" style={delay(80)}>
            {hero.titleLead} <span>{hero.titleAccent}</span>
          </h1>
          <p className="sr-hero-sub sr-hero-in" style={delay(160)}>
            {hero.sub}
          </p>

          {pct > 0 && (
            <p className="sr-hero-offer sr-hero-in" style={delay(240)}>
              Get up to <span className="sr-hero-offer-badge">{pct}% off</span> on {config.name} packages
            </p>
          )}
          <hr className="sr-hero-divider sr-hero-in" style={delay(280)} />
          <p className="sr-hero-price sr-hero-in" style={delay(320)}>
            Starting at {from.oldPrice && <s>{formatINR(from.oldPrice)}</s>} <strong>{formatINR(from.price)}</strong>
            <span>{config.priceUnit}</span>
          </p>

          <div className="sr-hero-ctas sr-hero-in" style={delay(380)}>
            <a href="#packages" className="sr-btn sr-btn--gold sr-btn--lg">
              Explore Packages <FiArrowRight aria-hidden="true" />
            </a>
            <EnquireButton source="hero" className="sr-btn sr-btn--ghost sr-btn--lg">
              Connect With An Expert
            </EnquireButton>
          </div>

          <ul className="sr-hero-trust sr-hero-in" style={delay(440)}>
            {hero.trust.map(t => (
              <li key={t}>
                <FiCheckCircle aria-hidden="true" /> {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="sr-hero-card sr-hero-in" style={delay(300)}>
          <p className="sr-hero-card-title">{hero.cardTitle}</p>
          <p className="sr-hero-card-sub">{hero.cardSub}</p>
          <LeadForm source="hero-form" submitLabel="Get My Free Itinerary" />
        </div>
      </div>

      <OfferMarquee />
    </section>
  );
}
