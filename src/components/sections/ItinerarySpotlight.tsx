import Image from "next/image";
import { FiCheck, FiClock, FiExternalLink, FiMapPin, FiX } from "react-icons/fi";
import { durationLabel, formatINR, spotlightPackage, type LandingConfig } from "@/data/landing";
import EnquireButton from "../enquiry/EnquireButton";
import RouteMap from "./RouteMap";

/** Day-by-day plan of the bestseller package. */
export default function ItinerarySpotlight({ config }: { config: LandingConfig }) {
  const pkg = spotlightPackage(config);
  if (!pkg.itinerary?.length) return null;

  return (
    <section id="itinerary" className="sr-section" aria-labelledby="sr-itinerary-title">
      <div className="sr-container">
        <div className="sr-section-hd sr-section-hd--center" data-aos="fade-up">
          <p className="sr-eyebrow">Bestseller Itinerary</p>
          <h2 id="sr-itinerary-title" className="sr-title">{pkg.title}</h2>
          <p className="sr-lead">{config.spotlight.intro}</p>
        </div>

        <div className="sr-itin">
          <div className="sr-itin-main">
            <ol className="sr-timeline">
              {pkg.itinerary.map((day, i) => (
                <li key={day.title} data-aos="fade-up" data-aos-delay={i * 80}>
                  <details open={i === 0}>
                    <summary>
                      <span className="sr-timeline-day">Day {i + 1}</span>
                      <span className="sr-timeline-title">{day.title}</span>
                    </summary>
                    <p>{day.detail}</p>
                  </details>
                </li>
              ))}
            </ol>

            {config.spotlight.map && (
              <figure className="sr-route" data-aos="fade-up">
                <RouteMap map={config.spotlight.map} label={`Route map: ${pkg.route.join(" to ")}`} />
                <figcaption>
                  <span className="sr-route-title">Your route</span>
                  <span>{(pkg.stops ?? pkg.route).join(" → ")}</span>
                  <span className="sr-route-key">
                    <i className="sr-route-key-road" aria-hidden="true" /> By road
                    {config.spotlight.map.legs.some(l => l.mode === "boat") && (
                      <>
                        <i className="sr-route-key-boat" aria-hidden="true" /> By boat
                      </>
                    )}
                  </span>
                </figcaption>
              </figure>
            )}

            {!!(pkg.inclusions?.length || pkg.exclusions?.length) && (
              <div className="sr-incl" data-aos="fade-up">
                <div className="sr-incl-box sr-incl-box--yes">
                  <h3>Inclusions</h3>
                  <ul>
                    {pkg.inclusions?.map(x => (
                      <li key={x}><FiCheck aria-hidden="true" /> {x}</li>
                    ))}
                  </ul>
                </div>
                <div className="sr-incl-box sr-incl-box--no">
                  <h3>Exclusions</h3>
                  <ul>
                    {pkg.exclusions?.map(x => (
                      <li key={x}><FiX aria-hidden="true" /> {x}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          <aside className="sr-itin-aside" data-aos="fade-left">
            <div className="sr-price-card">
              <div className="sr-price-card-media">
                <Image quality={90} src={pkg.image} alt={pkg.imageAlt} fill placeholder="blur" sizes="(max-width: 900px) 100vw, 380px" />
                {pkg.badge && <span className="sr-card-badge">{pkg.badge}</span>}
              </div>
              <div className="sr-price-card-body">
                <p className="sr-price-card-meta">
                  <FiClock aria-hidden="true" /> {durationLabel(pkg.nights)}
                </p>
                <p className="sr-price-card-meta">
                  <FiMapPin aria-hidden="true" /> {(pkg.stops ?? pkg.route).join(" → ")}
                </p>
                <p className="sr-price-card-price">
                  <strong>{formatINR(pkg.price)}</strong>
                  {pkg.oldPrice && <s>{formatINR(pkg.oldPrice)}</s>}
                  <span>{config.priceUnit.replace("/", "per ")}</span>
                </p>
                <EnquireButton packageId={pkg.id} source="itinerary" className="sr-btn sr-btn--navy sr-btn--block">
                  Plan This Trip
                </EnquireButton>
                {pkg.detailsUrl && (
                  <a href={pkg.detailsUrl} target="_blank" rel="noopener" className="sr-price-card-link">
                    Full package details <FiExternalLink aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
