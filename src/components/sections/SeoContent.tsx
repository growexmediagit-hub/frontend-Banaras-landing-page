import type { LandingConfig } from "@/data/landing";

/** Renders "**bold**" segments of our own config copy as <strong>. */
function withBold(text: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part));
}

/** Long-form copy for search — what people searching these packages want to read. */
export default function SeoContent({ config }: { config: LandingConfig }) {
  return (
    <section className="sr-section sr-section--cream sr-seo" aria-labelledby="sr-seo-title">
      <div className="sr-container sr-seo-inner">
        <h2 id="sr-seo-title" className="sr-title">{config.seoCopy.title}</h2>
        {config.seoCopy.paragraphs.map((p, i) => (
          <p key={i}>{withBold(p)}</p>
        ))}
      </div>
    </section>
  );
}
