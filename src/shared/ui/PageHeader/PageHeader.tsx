import "./PageHeader.css";

type PageHeaderProps = {
  label?: string;
  title: string;
  description?: string;
  className?: string;
};

export const PageHeader = ({
  label,
  title,
  description,
  className = "",
}: PageHeaderProps) => {
  const headerClassName = ["page-header", className].filter(Boolean).join(" ");

  return (
    <section className={headerClassName}>
      <div className="page-header__content">
        {label && <p className="page-header__label">{label}</p>}

        <h1 className="page-header__title">{title}</h1>

        {description && (
          <p className="page-header__description">{description}</p>
        )}
      </div>
    </section>
  );
};
