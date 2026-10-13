import Image from "next/image";
import { FiMail, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import type { LandingConfig } from "@/data/landing";
import { SITE, whatsappLink } from "@/data/site";
import LeadForm from "../enquiry/LeadForm";

export default function PlanTrip({ config }: { config: LandingConfig }) {
  const { plan } = config;
  return (
    <section id="plan" className="sr-plan" aria-labelledby="sr-plan-title">
      <Image src={plan.image} alt="" fill placeholder="blur" sizes="100vw" className="sr-plan-bg" />
      <div className="sr-plan-shade" aria-hidden="true" />
      <div className="sr-container sr-plan-grid">
        <div className="sr-plan-copy" data-aos="fade-right">
          <p className="sr-eyebrow sr-eyebrow--light">{plan.eyebrow}</p>
          <h2 id="sr-plan-title" className="sr-title sr-title--light">{plan.title}</h2>
          <p className="sr-lead sr-lead--light">{plan.lead}</p>
          <ul className="sr-plan-contacts">
            <li>
              <a href={`tel:${SITE.phoneE164}`}><FiPhone aria-hidden="true" /> {SITE.phoneDisplay}</a>
            </li>
            <li>
              <a href={whatsappLink(config.whatsapp.greeting)} target="_blank" rel="noopener noreferrer">
                <FaWhatsapp aria-hidden="true" /> Chat on WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`}><FiMail aria-hidden="true" /> {SITE.email}</a>
            </li>
          </ul>
        </div>

        <div className="sr-plan-card" data-aos="fade-left">
          <p className="sr-plan-card-title">{plan.formTitle}</p>
          <LeadForm variant="full" source="plan-trip" submitLabel="Plan My Trip" />
        </div>
      </div>
    </section>
  );
}
