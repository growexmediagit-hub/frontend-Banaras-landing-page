import Image from "next/image";
import { FiHeadphones, FiPhone } from "react-icons/fi";
import EnquireButton from "../enquiry/EnquireButton";
import type { LandingConfig } from "@/data/landing";
import { SITE } from "@/data/site";

/** Renders "**bold**" segments of our own config copy as <strong>. */
function withBold(text: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part));
}

/** Long-form copy for search — what people searching these packages want to read — beside a specialist contact card. */
export default function SeoContent({ config }: { config: LandingConfig }) {
  return (
    <section className="sr-section sr-section--cream sr-seo" aria-labelledby="sr-seo-title">
      <div className="sr-container sr-seo-grid">
        <div className="sr-seo-inner">
          <h2 id="sr-seo-title" className="sr-title">{config.seoCopy.title}</h2>
          {config.seoCopy.paragraphs.map((p, i) => (
            <p key={i}>{withBold(p)}</p>
          ))}
        </div>

        <aside className="sr-expert-card" aria-labelledby="sr-expert-title" data-aos="fade-left">
          <h3 id="sr-expert-title" className="sr-expert-title">
            Speak to someone <em>who&apos;s been there</em>
          </h3>
          <div className="sr-expert-body">
            <span className="sr-expert-avatar" aria-hidden="true">
              {config.expertPhoto ? (
                <Image src={config.expertPhoto} alt="" width={72} height={72} sizes="72px" />
              ) : (
                <FiHeadphones />
              )}
            </span>
            <p>Start planning your tailor-made trip by contacting one of our {config.name} specialists.</p>
          </div>
          <a href={`tel:${SITE.phoneE164}`} className="sr-expert-phone">
            <FiPhone aria-hidden="true" /> {SITE.phoneDisplay}
          </a>
          <EnquireButton source="expert-card" className="sr-btn sr-btn--gold sr-expert-cta">
            Make an Enquiry
          </EnquireButton>
        </aside>
      </div>
    </section>
  );
}
