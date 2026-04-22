import type { RecipeFormValues } from "../model/types";

export const mapRecipeToFormValues = (recipe: {
  name?: string;
  cuisine?: string;
  difficulty?: "Easy" | "Medium" | "Hard";
  prepTimeMinutes?: number;
  cookTimeMinutes?: number;
  servings?: number;
  image?: string;
  ingredients?: string[];
  instructions?: string[];
  tags?: string[];
}): RecipeFormValues => {
  return {
    name: recipe.name ?? "",
    cuisine: recipe.cuisine ?? "",
    difficulty: recipe.difficulty ?? "",
    prepTimeMinutes:
      recipe.prepTimeMinutes !== undefined
        ? Number(recipe.prepTimeMinutes)
        : "",
    cookTimeMinutes:
      recipe.cookTimeMinutes !== undefined
        ? Number(recipe.cookTimeMinutes)
        : "",
    servings: recipe.servings !== undefined ? Number(recipe.servings) : "",
    image: recipe.image ?? "",
    ingredients: Array.isArray(recipe.ingredients)
      ? recipe.ingredients.join("\n")
      : "",
    instructions: Array.isArray(recipe.instructions)
      ? recipe.instructions.join("\n")
      : "",
    tags: Array.isArray(recipe.tags) ? recipe.tags.join(", ") : "",
  };
};
