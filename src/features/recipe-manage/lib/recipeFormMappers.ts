import type { AddRecipeRequest } from "../../recipes/model/types";
import type { RecipeDifficulty, RecipeFormValues } from "../model/types";

export const normalizeDifficulty = (
  value: string | undefined,
): RecipeDifficulty => {
  if (value === "Easy" || value === "Medium" || value === "Hard") {
    return value;
  }

  return "Easy";
};

export const mapMultilineTextToArray = (value: string): string[] => {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
};

export const mapTagsToArray = (value: string): string[] => {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

export const buildAddRecipePayload = (
  formValues: RecipeFormValues,
  userId: number | string,
): AddRecipeRequest => {
  const ingredients = mapMultilineTextToArray(formValues.ingredients);
  const instructions = mapMultilineTextToArray(formValues.instructions);
  const tags = mapTagsToArray(formValues.tags);

  return {
    name: formValues.name.trim(),
    cuisine: formValues.cuisine.trim() || undefined,
    difficulty:
      formValues.difficulty === "" ? undefined : formValues.difficulty,
    prepTimeMinutes:
      formValues.prepTimeMinutes === ""
        ? undefined
        : Number(formValues.prepTimeMinutes),
    cookTimeMinutes:
      formValues.cookTimeMinutes === ""
        ? undefined
        : Number(formValues.cookTimeMinutes),
    servings:
      formValues.servings === "" ? undefined : Number(formValues.servings),
    image: formValues.image.trim() || undefined,
    ingredients,
    instructions,
    tags: tags.length ? tags : undefined,
    userId,
  };
};
