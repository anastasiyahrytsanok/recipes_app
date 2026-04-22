import "./AboutPage.css";
import { InfoCard } from "../../../shared/ui/InfoCard";
import { PageHeader } from "../../../shared/ui/PageHeader";
import { SectionShell } from "../../../shared/ui/SectionShell";
import { aboutPageContent } from "../model/aboutContent";

export const AboutPage = () => {
  const { header, sections, values } = aboutPageContent;

  return (
    <section className="about">
      <PageHeader
        label={header.label}
        title={header.title}
        description={header.description}
      />

      <SectionShell>
        <section className="about__info">
          {sections.map(({ title, description }) => (
            <InfoCard
              key={title}
              title={title}
              description={description}
              titleTag="h2"
              className="about__info-card"
            />
          ))}
        </section>

        <section className="about__values" aria-labelledby="about-values-title">
          <h2 id="about-values-title" className="about__values-title">
            {values.title}
          </h2>

          <div className="about__values-grid">
            {values.items.map(({ title, description }) => (
              <InfoCard
                key={title}
                title={title}
                description={description}
                titleTag="h3"
                className="about__value-card"
              />
            ))}
          </div>
        </section>
      </SectionShell>
    </section>
  );
};
