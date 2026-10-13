import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import { durationLabel, formatINR, type LandingConfig } from "@/data/landing";
import { CountdownTiles } from "../Countdown";
import EnquireButton from "../enquiry/EnquireButton";

/** "Deals you won't find anywhere" — the four lowest-priced trips in a bento grid. */
export default function DealsSection({ config }: { config: LandingConfig }) {
  const deals = [...config.packages].sort((a, b) => a.price - b.price).slice(0, 4);

  return (
    <section id="deals" className="sr-section" aria-labelledby="sr-deals-title">
      <div className="sr-container">
        <div className="sr-section-hd sr-section-hd--row" data-aos="fade-up">
          <div>
            <p className="sr-eyebrow">Unbeatable Deals</p>
            <h2 id="sr-deals-title" className="sr-title">Deals You Won&apos;t Find Anywhere</h2>
            <p className="sr-lead">{config.dealsLead}</p>
          </div>
          <CountdownTiles label="Deal ends in" />
        </div>

        <div className="sr-bento">
          {deals.map((pkg, i) => (
            <article key={pkg.id} className={`sr-deal${i === 0 ? " sr-deal--feature" : ""}`} data-aos="fade-up" data-aos-delay={i * 90}>
              <Image
                src={pkg.image}
                alt={pkg.imageAlt}
                fill
                placeholder="blur"
                sizes={i === 0 ? "(max-width: 900px) 100vw, 560px" : "(max-width: 900px) 100vw, 380px"}
              />
              <div className="sr-deal-shade" aria-hidden="true" />
              {pkg.oldPrice && <span className="sr-deal-save">Save {formatINR(pkg.oldPrice - pkg.price)}</span>}
              <div className="sr-deal-body">
                <span className="sr-deal-duration">{pkg.stops?.join(" · ") ?? durationLabel(pkg.nights)}</span>
                <h3 className="sr-deal-title">{pkg.title}</h3>
                <p className="sr-deal-price">
                  {formatINR(pkg.price)} <span>{config.priceUnit}</span>
                </p>
                <EnquireButton packageId={pkg.id} source="deals" className="sr-btn sr-btn--glass sr-btn--sm">
                  Enquire Now <FiArrowRight aria-hidden="true" />
                </EnquireButton>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
