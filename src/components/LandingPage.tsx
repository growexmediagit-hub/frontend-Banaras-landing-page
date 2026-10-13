import type { Metadata } from "next";
import AosInit from "./AosInit";
import Header from "./Header";
import MobileActionBar from "./MobileActionBar";
import WhatsAppFloat from "./WhatsAppFloat";
import EnquiryProvider from "./enquiry/EnquiryProvider";
import CategoryRows from "./sections/CategoryRows";
import DealsSection from "./sections/DealsSection";
import Destinations from "./sections/Destinations";
import Experiences from "./sections/Experiences";
import Faq from "./sections/Faq";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import ItinerarySpotlight from "./sections/ItinerarySpotlight";
import OfferBanner from "./sections/OfferBanner";
import PackagesSection from "./sections/PackagesSection";
import PlanTrip from "./sections/PlanTrip";
import QuickFacts from "./sections/QuickFacts";
import SeoContent from "./sections/SeoContent";
import WhyUs from "./sections/WhyUs";
import { days, type LandingConfig } from "@/data/landing";
import { SITE, siteUrl } from "@/data/site";

export function landingMetadata(config: LandingConfig): Metadata {
  const { seo } = config;
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical: config.path },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: config.path,
      siteName: SITE.brand,
      title: seo.title,
      description: seo.description,
      images: [{ url: seo.ogImage, width: 1200, height: 630, alt: seo.ogAlt }],
    },
    twitter: { card: "summary_large_image", title: seo.title, description: seo.description, images: [seo.ogImage] },
  };
}

function structuredData(config: LandingConfig) {
  const url = siteUrl();
  const pageUrl = `${url}${config.path === "/" ? "" : config.path}`;
  const agencyId = `${SITE.mainSite}/#organization`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TravelAgency",
        "@id": agencyId,
        name: SITE.legalName,
        alternateName: SITE.brand,
        url: SITE.mainSite,
        logo: `${url}/srivastava-route-logo.png`,
        telephone: SITE.phoneE164,
        email: SITE.email,
        priceRange: "₹₹",
        address: {
          "@type": "PostalAddress",
          streetAddress: SITE.address.street,
          addressLocality: SITE.address.locality,
          addressRegion: SITE.address.region,
          postalCode: SITE.address.postalCode,
          addressCountry: SITE.address.country,
        },
        areaServed: "IN",
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${config.name} Tour Packages`,
        inLanguage: "en-IN",
        image: `${url}${config.seo.ogImage}`,
        about: { "@id": agencyId },
      },
      {
        "@type": "ItemList",
        name: `${config.name} Tour Packages`,
        itemListElement: config.packages.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "TouristTrip",
            name: p.title,
            description: `${p.nights} nights / ${days(p.nights)} days — ${p.highlights.join(", ")}.`,
            touristType: p.types,
            itinerary: {
              "@type": "ItemList",
              itemListElement: p.route.map((city, j) => ({
                "@type": "ListItem",
                position: j + 1,
                item: { "@type": "City", name: city },
              })),
            },
            offers: {
              "@type": "Offer",
              price: p.price,
              priceCurrency: "INR",
              availability: "https://schema.org/InStock",
              url: p.detailsUrl ?? `${pageUrl}#packages`,
              offeredBy: { "@id": agencyId },
            },
            provider: { "@id": agencyId },
          },
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: config.faq.items.map(f => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

/** One destination landing page, entirely driven by its config. */
export default function LandingPage({ config }: { config: LandingConfig }) {
  return (
    <EnquiryProvider config={config}>
      <script
        type="application/ld+json"
        // JSON.stringify output from our own data; "<" escaped so it can't close the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(config)).replace(/</g, "\\u003c") }}
      />
      <AosInit />
      <Header />
      <main>
        <Hero config={config} />
        <QuickFacts config={config} />
        <CategoryRows config={config} />
        <OfferBanner config={config} source="offer-banner-1" />
        <DealsSection config={config} />
        <PackagesSection config={config} />
        <ItinerarySpotlight config={config} />
        <Experiences config={config} />
        <Destinations config={config} />
        <WhyUs config={config} />
        <PlanTrip config={config} />
        <Faq config={config} />
        <SeoContent config={config} />
      </main>
      <Footer config={config} />
      <WhatsAppFloat />
      <MobileActionBar greeting={config.whatsapp.greeting} />
    </EnquiryProvider>
  );
}
