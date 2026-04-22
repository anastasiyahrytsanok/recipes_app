import { recipeDetailsDefaults } from "../model/recipeDetailsDefaults";

type RecipeLike = {
  cuisine?: string;
  difficulty?: string;
  image?: string;
  tags?: string[];
  servings?: number;
  prepTimeMinutes?: number;
  cookTimeMinutes?: number;
  mealType?: string[];
  caloriesPerServing?: number;
  rating?: number;
  reviewCount?: number;
};

export const getRecipeDisplayData = (recipe: RecipeLike) => {
  const prepTimeMinutes = recipe.prepTimeMinutes ?? 0;
  const cookTimeMinutes = recipe.cookTimeMinutes ?? 0;
  const totalTime = prepTimeMinutes + cookTimeMinutes;

  const cuisine = recipe.cuisine ?? recipeDetailsDefaults.cuisine;
  const difficulty = recipe.difficulty ?? recipeDetailsDefaults.difficulty;
  const image = recipe.image ?? "";
  const tags = recipe.tags ?? [];
  const servings = recipe.servings ?? recipeDetailsDefaults.emptyValue;
  const mealType = Array.isArray(recipe.mealType) ? recipe.mealType : [];

  const description =
    mealType.length > 0
      ? recipeDetailsDefaults.getMealTypeDescription(
          String(difficulty),
          mealType.join(", "),
        )
      : recipeDetailsDefaults.getDefaultDescription(String(difficulty));

  return {
    prepTimeMinutes,
    cookTimeMinutes,
    totalTime,
    cuisine,
    difficulty,
    image,
    tags,
    servings,
    mealType,
    description,
    caloriesPerServing: recipe.caloriesPerServing,
    rating: recipe.rating,
    reviewCount: recipe.reviewCount,
  };
};
