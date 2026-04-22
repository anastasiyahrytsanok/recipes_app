import { Link } from "@tanstack/react-router";

import "./RecipeCard.css";

type RecipeCardProps = {
  id: number;
  name: string;
  image?: string;
  cuisine?: string;
  difficulty?: string;
  canManageRecipe: boolean;
  fallbackCuisine: string;
  fallbackDifficulty: string;
  imagePlaceholderText: string;
  editLabel: string;
  deleteLabel: string;
  onEdit: (recipeId: number) => void;
  onDelete: (recipeId: number) => void;
};

export const RecipeCard = ({
  id,
  name,
  image,
  cuisine,
  difficulty,
  canManageRecipe,
  fallbackCuisine,
  fallbackDifficulty,
  imagePlaceholderText,
  editLabel,
  deleteLabel,
  onEdit,
  onDelete,
}: RecipeCardProps) => {
  return (
    <article className="recipes__card">
      {canManageRecipe && (
        <div className="recipes__card-actions">
          <button
            type="button"
            className="recipes__icon-button"
            aria-label={editLabel}
            title={editLabel}
            onClick={() => onEdit(id)}
          >
            ✎
          </button>

          <button
            type="button"
            className="recipes__icon-button recipes__icon-button--danger"
            aria-label={deleteLabel}
            title={deleteLabel}
            onClick={() => onDelete(id)}
          >
            🗑
          </button>
        </div>
      )}

      <Link
        to="/recipes/$id"
        params={{ id: String(id) }}
        className="recipes__card-link"
      >
        <div className="recipes__image-wrapper">
          {image ? (
            <img className="recipes__image" src={image} alt={name} />
          ) : (
            <div className="recipes__image recipes__image--placeholder">
              {imagePlaceholderText}
            </div>
          )}
        </div>

        <div className="recipes__card-content">
          <h2 className="recipes__card-title">{name}</h2>
          <p className="recipes__card-description">
            {cuisine ?? fallbackCuisine} • {difficulty ?? fallbackDifficulty}
          </p>
        </div>
      </Link>
    </article>
  );
};
