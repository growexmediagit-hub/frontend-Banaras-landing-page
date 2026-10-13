import type { LandingConfig } from "@/data/landing";
import PackagesExplorer from "../packages/PackagesExplorer";

export default function PackagesSection({ config }: { config: LandingConfig }) {
  const { eyebrow, title, lead } = config.packagesSection;
  return (
    <section id="packages" className="sr-section sr-section--cream" aria-labelledby="sr-packages-title">
      <div className="sr-container">
        <div className="sr-section-hd sr-section-hd--center" data-aos="fade-up">
          <p className="sr-eyebrow">{eyebrow}</p>
          <h2 id="sr-packages-title" className="sr-title">{title}</h2>
          <p className="sr-lead">{lead}</p>
        </div>
        <div data-aos="fade-up" data-aos-delay="100">
          <PackagesExplorer />
        </div>
      </div>
    </section>
  );
}
