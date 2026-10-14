import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import { LuCalendarDays, LuHeart, LuSparkles, LuTag } from "react-icons/lu";
import { days, formatINR, type LandingConfig, type TourPackage } from "@/data/landing";
import SwipeRow from "../packages/SwipeRow";
import ViewButton from "../packages/ViewButton";

/** Up to two theme chips: the package's badge (or first type), then its next type. */
function themeChips(pkg: TourPackage, config: LandingConfig) {
  const labels = pkg.types.map(t => config.packageTypes.find(p => p.key === t)?.label).filter((l): l is string => !!l);
  const chips = pkg.badge ? [pkg.badge, ...labels] : labels;
  return [...new Set(chips)].slice(0, 2);
}

/** "Srivastava Route Exclusives" — every trip, cheapest first, as a swipeable row of tall photo cards. */
export default function DealsSection({ config }: { config: LandingConfig }) {
  const deals = [...config.packages].sort((a, b) => a.price - b.price);

  return (
    <section id="deals" className="sr-section" aria-labelledby="sr-deals-title">
      <div className="sr-container">
        <div className="sr-section-hd" data-aos="fade-up">
          <h2 id="sr-deals-title" className="sr-excl-title">
            Srivastava Route Exclusives – <span className="sr-shimmer">{config.deals.place}</span> Packages
          </h2>
          <p className="sr-excl-lead">{config.deals.lead}</p>
        </div>

        <SwipeRow className="sr-excl-row" label={`${config.deals.place} packages`}>
          {deals.map((pkg, i) => {
            const save = pkg.oldPrice ? pkg.oldPrice - pkg.price : 0;
            return (
              <article key={pkg.id} className="sr-excl" data-aos={i < 3 ? "fade-up" : undefined} data-aos-delay={i < 3 ? i * 90 : undefined}>
                <Image quality={90} src={pkg.image} alt={pkg.imageAlt} fill placeholder="blur" draggable={false} sizes="(max-width: 900px) 80vw, 420px" />
                <div className="sr-excl-shade" aria-hidden="true" />

                <p className="sr-excl-price">
                  {pkg.oldPrice && <s>{formatINR(pkg.oldPrice)}</s>}
                  <strong>{formatINR(pkg.price)}</strong>
                  <span>{config.priceUnit}</span>
                </p>

                <div className="sr-excl-body">
                  <h3 className="sr-excl-name">{pkg.title}</h3>
                  <p className="sr-excl-route">{pkg.route.join(", ")}</p>

                  <ul className="sr-excl-chips" aria-label="Trip details">
                    {themeChips(pkg, config).map(label => (
                      <li key={label}>
                        {/honeymoon|couple/i.test(label) ? <LuHeart aria-hidden="true" /> : <LuSparkles aria-hidden="true" />}
                        {label}
                      </li>
                    ))}
                    <li>
                      <LuCalendarDays aria-hidden="true" /> {days(pkg.nights)} Days
                    </li>
                    {save > 0 && (
                      <li className="sr-excl-chip-save">
                        <LuTag aria-hidden="true" /> Save {formatINR(save)}
                      </li>
                    )}
                  </ul>

                  <ViewButton packageId={pkg.id} className="sr-excl-cta">
                    Explore package <FiArrowRight aria-hidden="true" />
                  </ViewButton>
                </div>
              </article>
            );
          })}
        </SwipeRow>
      </div>
    </section>
  );
}
