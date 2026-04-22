import { useNavigate, useParams } from "@tanstack/react-router";
import { useSelector } from "react-redux";

import { recipeDetailsContent } from "../model/recipeDetailsContent";

import type { RootState } from "@/app/store/store";
import { getRecipeDisplayData } from "@/features/recipe-details/lib/getRecipeDisplayData";
import { useGetRecipeByIdQuery } from "@/features/recipes/api/recipesApi";
import { recipesStorage } from "@/features/recipes/lib/recipesStorage";
import { PageHeader } from "@/shared/ui/PageHeader";
import { SectionShell } from "@/shared/ui/SectionShell";
import "./RecipeDetailsPage.css";

export const RecipeDetailsPage = () => {
  const { id } = useParams({ from: "/app/protected/recipes/$id" });
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const recipeId = Number(id);
  const {
    header,
    states,
    actions,
    meta,
    sections,
    image: imageContent,
  } = recipeDetailsContent;

  const {
    data: apiRecipe,
    isLoading,
    isError,
  } = useGetRecipeByIdQuery(recipeId, {
    skip: Number.isNaN(recipeId),
  });

  const localRecipe = recipesStorage
    .getRecipes()
    .find((recipe) => recipe.id === recipeId);

  const recipe = apiRecipe ?? localRecipe;

  const canManageRecipe =
    Boolean(user?.id) && Boolean(recipe) && user?.id === recipe?.userId;

  const handleNavigateToEditPage = (): void => {
    navigate({
      to: "/recipes/$id/edit",
      params: { id: String(recipeId) },
    });
  };

  const handleDeleteRecipe = (): void => {
    recipesStorage.removeRecipe(recipeId);
    navigate({ to: "/recipes" });
  };

  if (isLoading) {
    return (
      <section className="recipe-details">
        <PageHeader
          label={header.defaultLabel}
          title={states.loading.title}
          description={states.loading.description}
        />
      </section>
    );
  }

  if ((!apiRecipe && !localRecipe && isError) || !recipe) {
    return (
      <section className="recipe-details">
        <PageHeader
          label={header.defaultLabel}
          title={states.notFound.title}
          description={states.notFound.description}
        />
      </section>
    );
  }

  const {
    prepTimeMinutes,
    cookTimeMinutes,
    totalTime,
    cuisine,
    difficulty,
    image,
    tags,
    servings,
    description,
    caloriesPerServing,
    rating,
    reviewCount,
  } = getRecipeDisplayData(recipe);

  const metaItems = [
    {
      label: meta.prepTime,
      value: prepTimeMinutes ? `${prepTimeMinutes} min` : meta.emptyValue,
    },
    {
      label: meta.cookTime,
      value: cookTimeMinutes ? `${cookTimeMinutes} min` : meta.emptyValue,
    },
    {
      label: meta.totalTime,
      value: totalTime ? `${totalTime} min` : meta.emptyValue,
    },
    {
      label: meta.servings,
      value: servings ?? meta.emptyValue,
    },
    {
      label: meta.difficulty,
      value: difficulty || meta.emptyValue,
    },
    {
      label: meta.calories,
      value:
        typeof caloriesPerServing === "number"
          ? `${caloriesPerServing} kcal`
          : meta.emptyValue,
    },
    {
      label: meta.rating,
      value: typeof rating === "number" ? `${rating} / 5` : meta.emptyValue,
    },
    {
      label: meta.reviews,
      value: typeof reviewCount === "number" ? reviewCount : meta.emptyValue,
    },
  ];

  return (
    <section className="recipe-details">
      <PageHeader
        label={cuisine}
        title={recipe.name}
        description={description}
      />

      <SectionShell className="recipe-details__section">
        {canManageRecipe && (
          <div className="recipe-details__actions">
            <button
              className="recipe-details__button recipe-details__button--secondary"
              type="button"
              onClick={handleNavigateToEditPage}
            >
              {actions.edit}
            </button>

            <button
              className="recipe-details__button recipe-details__button--danger"
              type="button"
              onClick={handleDeleteRecipe}
            >
              {actions.delete}
            </button>
          </div>
        )}

        <div className="recipe-details__top">
          <div className="recipe-details__image-card">
            {image ? (
              <img
                className="recipe-details__image"
                src={image}
                alt={recipe.name}
              />
            ) : (
              <div className="recipe-details__image recipe-details__image--placeholder">
                {imageContent.placeholder}
              </div>
            )}
          </div>

          <div className="recipe-details__summary-card">
            <div className="recipe-details__meta-grid">
              {metaItems.map(({ label, value }) => (
                <div key={label} className="recipe-details__meta-item">
                  <span className="recipe-details__meta-label">{label}</span>
                  <span className="recipe-details__meta-value">{value}</span>
                </div>
              ))}
            </div>

            {tags.length > 0 && (
              <div className="recipe-details__tags">
                {tags.map((tag) => (
                  <span key={tag} className="recipe-details__tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="recipe-details__content">
          <article className="recipe-details__card">
            <h2 className="recipe-details__section-title">
              {sections.ingredients}
            </h2>

            <ul className="recipe-details__list recipe-details__list--unordered">
              {recipe.ingredients.map((ingredient) => (
                <li key={ingredient} className="recipe-details__list-item">
                  {ingredient}
                </li>
              ))}
            </ul>
          </article>

          <article className="recipe-details__card">
            <h2 className="recipe-details__section-title">
              {sections.instructions}
            </h2>

            <ol className="recipe-details__list recipe-details__list--ordered">
              {recipe.instructions.map((instruction) => (
                <li key={instruction} className="recipe-details__list-item">
                  {instruction}
                </li>
              ))}
            </ol>
          </article>
        </div>
      </SectionShell>
    </section>
  );
};
