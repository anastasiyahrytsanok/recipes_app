import { useNavigate } from "@tanstack/react-router";

import "./HomePage.css";
import { homePageContent } from "../model/homePageContent";

export const HomePage = () => {
  const navigate = useNavigate();

  const { header } = homePageContent;

  const handleNavigate = () => {
    navigate({ to: "/recipes" });
  };

  return (
    <section className="home">
      <div className="home__content">
        <p className="home__welcome">{header.welcome}</p>

        <h1 className="home__title">
          <span className="home__title-primary">{header.title.primary}</span>
          <span className="home__title-secondary">
            {header.title.secondary}
          </span>
        </h1>

        <p className="home__subtitle">{header.subtitle}</p>

        <button className="home__button" onClick={handleNavigate}>
          {header.ctaText}
        </button>
      </div>
    </section>
  );
};
