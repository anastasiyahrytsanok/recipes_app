import { useNavigate } from "@tanstack/react-router";

import { notFoundPageContent } from "../model/notFoundPageContent";
import "./NotFoundPage.css";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const { code, title, description, buttons } = notFoundPageContent;

  const handleGoHome = (): void => {
    navigate({ to: "/" });
  };

  const handleGoToRecipes = (): void => {
    navigate({ to: "/recipes" });
  };

  return (
    <section className="not-found">
      <div className="not-found__content">
        <p className="not-found__code">{code}</p>

        <h1 className="not-found__title">{title}</h1>

        <p className="not-found__text">{description}</p>

        <div className="not-found__actions">
          <button
            className="not-found__button not-found__button--primary"
            type="button"
            onClick={handleGoHome}
          >
            {buttons.home}
          </button>

          <button
            className="not-found__button not-found__button--secondary"
            type="button"
            onClick={handleGoToRecipes}
          >
            {buttons.recipes}
          </button>
        </div>
      </div>
    </section>
  );
};
