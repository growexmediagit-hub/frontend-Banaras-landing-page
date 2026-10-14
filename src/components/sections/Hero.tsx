import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import { cheapestPackage, formatINR, maxDiscountPct, type LandingConfig } from "@/data/landing";
import EnquireButton from "../enquiry/EnquireButton";
import OfferMarquee from "../OfferMarquee";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export default function Hero({ config }: { config: LandingConfig }) {
  const { hero } = config;
  const from = cheapestPackage(config);
  const pct = maxDiscountPct(config);

  return (
    <section id="top" className="sr-hero" aria-labelledby="sr-hero-title">
      <Image quality={90}
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

      <div className="sr-container">
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

          <div className="sr-hero-ctas sr-hero-in" style={delay(240)}>
            <a href="#packages" className="sr-btn sr-btn--gold">
              Explore Packages <FiArrowRight aria-hidden="true" />
            </a>
            <EnquireButton source="hero" className="sr-btn sr-btn--ghost">
              Connect With An Expert
            </EnquireButton>
          </div>

          <p className="sr-hero-from sr-hero-in" style={delay(320)}>
            <span>
              Packages from <strong>{formatINR(from.price)}</strong>
              {config.priceUnit}
            </span>
            {pct > 0 && <span className="sr-hero-off">Up to {pct}% off</span>}
          </p>
        </div>
      </div>

      <OfferMarquee />
    </section>
  );
}
