import "./InfoCard.css";

type InfoCardTitleTag = "h2" | "h3";

type InfoCardProps = {
  title: string;
  description: string;
  titleTag?: InfoCardTitleTag;
  className?: string;
};

export const InfoCard = ({
  title,
  description,
  titleTag = "h2",
  className = "",
}: InfoCardProps) => {
  const TitleTag = titleTag;
  const cardClassName = ["info-card", className].filter(Boolean).join(" ");

  return (
    <article className={cardClassName}>
      <TitleTag className="info-card__title">{title}</TitleTag>
      <p className="info-card__text">{description}</p>
    </article>
  );
};
