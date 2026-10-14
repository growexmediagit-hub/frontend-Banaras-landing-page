import { packageSlides, packagesOfType, type LandingConfig } from "@/data/landing";
import PackageCard from "../packages/PackageCard";
import ViewAllButton from "../packages/ViewAllButton";

/** Short 3-up preview rows per package type, like the atravelq landing pages. */
export default function CategoryRows({ config }: { config: LandingConfig }) {
  return (
    <>
      {config.categoryRows.map((row, i) => {
        const pkgs = packagesOfType(config, row.type).slice(0, 3);
        if (!pkgs.length) return null;
        return (
          <section key={row.type} className={`sr-section${i % 2 ? " sr-section--cream" : ""}`} aria-label={row.title}>
            <div className="sr-container">
              <div className="sr-section-hd sr-section-hd--row" data-aos="fade-up">
                <div>
                  <p className="sr-eyebrow">{row.eyebrow}</p>
                  <h2 className="sr-title">{row.title}</h2>
                </div>
                <ViewAllButton type={row.type} />
              </div>
              <div className="sr-grid sr-rail">
                {pkgs.map((pkg, idx) => (
                  <div key={pkg.id} data-aos="fade-up" data-aos-delay={idx * 100}>
                    <PackageCard pkg={pkg} slides={packageSlides(config, pkg)} unit={config.priceUnit} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
