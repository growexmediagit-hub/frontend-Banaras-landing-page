import { FiArrowRight } from "react-icons/fi";
import { daysNightsLabel, discountPct, formatINR, type Slide, type TourPackage } from "@/data/landing";
import EnquireButton from "../enquiry/EnquireButton";
import CardGallery from "./CardGallery";
import ViewButton from "./ViewButton";

type Props = {
  pkg: TourPackage;
  slides: Slide[];
  unit: string;
  priority?: boolean;
};

/** Package card: inset photo slider with badge, duration, title (opens the quick view), sale tag, price, View + Enquire. */
export default function PackageCard({ pkg, slides, unit, priority = false }: Props) {
  const off = discountPct(pkg);
  const save = pkg.oldPrice ? pkg.oldPrice - pkg.price : 0;
  const honeymoon = pkg.badge && /honeymoon/i.test(pkg.badge);

  return (
    <article className="sr-card">
      <CardGallery slides={slides} packageId={pkg.id} priority={priority}>
        {pkg.badge ? (
          <span className={`sr-card-badge${honeymoon ? " sr-card-badge--red" : ""}`}>{pkg.badge}</span>
        ) : (
          save > 0 && <span className="sr-card-save">Save {formatINR(save)}</span>
        )}
      </CardGallery>

      <div className="sr-card-body">
        <p className="sr-card-duration">{daysNightsLabel(pkg.nights)}</p>
        <h3 className="sr-card-title">
          <ViewButton packageId={pkg.id} className="sr-card-link">
            {pkg.title}
          </ViewButton>
        </h3>

        {off > 0 && <span className="sr-card-tag">{off}% off · Save {formatINR(save)}</span>}

        <p className="sr-card-price">
          <strong>{formatINR(pkg.price)}</strong>
          {off > 0 && <s>{formatINR(pkg.oldPrice!)}</s>}
          <span>{unit}</span>
        </p>

        <div className="sr-card-actions">
          <ViewButton packageId={pkg.id} className="sr-card-btn">
            View
          </ViewButton>
          <EnquireButton packageId={pkg.id} source="package-card" className="sr-card-btn sr-card-btn--primary">
            Enquire Now <FiArrowRight aria-hidden="true" />
          </EnquireButton>
        </div>
      </div>
    </article>
  );
}
