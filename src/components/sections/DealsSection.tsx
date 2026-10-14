import Image from "next/image";
import { FiChevronRight } from "react-icons/fi";
import { daysNightsLabel, formatINR, type LandingConfig, type TourPackage } from "@/data/landing";
import EnquireButton from "../enquiry/EnquireButton";

/** First two stops as "2N Pattaya › 2N Bangkok", the rest folded into "+N". */
function StopTrail({ pkg }: { pkg: TourPackage }) {
  const stops = pkg.stops ?? pkg.route;
  return (
    <p className="sr-excl-stops">
      {stops.slice(0, 2).map((stop, i) => {
        const [n, ...place] = stop.split(" ");
        const hasNights = /^\d+N$/.test(n);
        return (
          <span key={stop} className="sr-excl-stop">
            {i > 0 && <FiChevronRight aria-hidden="true" />}
            {hasNights ? (
              <>
                <strong>{n}</strong> {place.join(" ")}
              </>
            ) : (
              stop
            )}
          </span>
        );
      })}
      {stops.length > 2 && <strong className="sr-excl-more">+{stops.length - 2}</strong>}
    </p>
  );
}

/** "Srivastava Route Exclusives" — the three lowest-priced trips as tall photo cards. */
export default function DealsSection({ config }: { config: LandingConfig }) {
  const deals = [...config.packages].sort((a, b) => a.price - b.price).slice(0, 3);

  return (
    <section id="deals" className="sr-section" aria-labelledby="sr-deals-title">
      <div className="sr-container">
        <div className="sr-section-hd" data-aos="fade-up">
          <h2 id="sr-deals-title" className="sr-excl-title">
            Srivastava Route Exclusives – <span className="sr-shimmer">{config.deals.place}</span> Packages
          </h2>
          <p className="sr-excl-lead">{config.deals.lead}</p>
        </div>

        <div className="sr-excl-row">
          {deals.map((pkg, i) => (
            <article key={pkg.id} className="sr-excl" data-aos="fade-up" data-aos-delay={i * 90}>
              <Image src={pkg.image} alt={pkg.imageAlt} fill placeholder="blur" sizes="(max-width: 900px) 80vw, 380px" />
              <div className="sr-excl-shade" aria-hidden="true" />
              {pkg.oldPrice && <span className="sr-excl-save">Save {formatINR(pkg.oldPrice - pkg.price)}</span>}

              <div className="sr-excl-body">
                <p className="sr-excl-duration">{daysNightsLabel(pkg.nights)}</p>
                <h3 className="sr-excl-name">{pkg.title}</h3>
                <StopTrail pkg={pkg} />

                <div className="sr-excl-foot">
                  <p className="sr-excl-price">
                    {pkg.oldPrice && <s>{formatINR(pkg.oldPrice)}</s>}
                    <strong>{formatINR(pkg.price)}</strong> <span>{config.priceUnit}</span>
                  </p>
                  <EnquireButton packageId={pkg.id} source="deals" className="sr-btn sr-excl-cta">
                    Request Callback
                  </EnquireButton>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
