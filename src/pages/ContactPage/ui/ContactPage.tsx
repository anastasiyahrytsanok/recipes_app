import "./ContactPage.css";
import { contactPageContent } from "../model/contactPageContent";

import { PageHeader } from "@/shared/ui/PageHeader";
import { SectionShell } from "@/shared/ui/SectionShell";

export const ContactPage = () => {
  const { header, cards } = contactPageContent;

  return (
    <section className="contact">
      <PageHeader
        label={header.label}
        title={header.title}
        description={header.description}
      />

      <SectionShell>
        <div className="contact__grid">
          {cards.map(({ title, description, value }) => (
            <div key={title} className="contact__card">
              <h2 className="contact__card-title">{title}</h2>
              <p className="contact__card-description">{description}</p>
              <span className="contact__value">{value}</span>
            </div>
          ))}
        </div>
      </SectionShell>
    </section>
  );
};
