import { FiArrowRight } from "react-icons/fi";
import { maxDiscountPct, type LandingConfig } from "@/data/landing";
import { CountdownTiles } from "../Countdown";
import EnquireButton from "../enquiry/EnquireButton";

/** Rounded sale card between sections — headline, live countdown, CTA (atravelq style). */
export default function OfferBanner({ config, source }: { config: LandingConfig; source: string }) {
  return (
    <section className="sr-offer-wrap" aria-label="Current offer">
      <div className="sr-container">
        <div className="sr-offer" data-aos="zoom-in-up">
          <p className="sr-offer-text">
            <strong className="sr-offer-name">{config.offer.name}</strong> — Up to{" "}
            <strong>{maxDiscountPct(config)}% OFF</strong> on selected trips
          </p>
          <div className="sr-offer-row">
            <CountdownTiles label="Sale ends in" tone="dark" units={false} />
            <EnquireButton source={source} className="sr-offer-btn">
              Grab This Deal <FiArrowRight aria-hidden="true" />
            </EnquireButton>
          </div>
        </div>
      </div>
    </section>
  );
}
