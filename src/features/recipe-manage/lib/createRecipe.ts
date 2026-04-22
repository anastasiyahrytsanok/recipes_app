import {
  buildAddRecipePayload,
  mapMultilineTextToArray,
  mapTagsToArray,
  normalizeDifficulty,
} from "./recipeFormMappers";
import type { AddRecipeRequest, Recipe } from "../../recipes/model/types";
import type { RecipeFormValues } from "../model/types";

import { recipesStorage } from "@/features/recipes/lib/recipesStorage";

type CreateRemoteRecipe = (
  payload: AddRecipeRequest,
) => Promise<Partial<Recipe>>;

type CreateRecipeParams = {
  formValues: RecipeFormValues;
  userId: string | number;
  createRemoteRecipe: CreateRemoteRecipe;
  unauthorizedMessage: string;
};

export const createRecipe = async ({
  formValues,
  userId,
  createRemoteRecipe,
  unauthorizedMessage,
}: CreateRecipeParams): Promise<void> => {
  if (!userId) {
    throw new Error(unauthorizedMessage);
  }

  const payload = buildAddRecipePayload(formValues, userId);
  const ingredients = mapMultilineTextToArray(formValues.ingredients);
  const instructions = mapMultilineTextToArray(formValues.instructions);
  const tags = mapTagsToArray(formValues.tags);

  const createdRecipe = await createRemoteRecipe(payload);

  recipesStorage.addRecipe({
    id: recipesStorage.getNextId(),
    userId: Number(createdRecipe.userId ?? payload.userId),
    name: String(createdRecipe.name ?? payload.name),
    cuisine: String(createdRecipe.cuisine ?? payload.cuisine ?? ""),
    difficulty: normalizeDifficulty(
      String(createdRecipe.difficulty ?? payload.difficulty),
    ),
    prepTimeMinutes: Number(
      createdRecipe.prepTimeMinutes ?? payload.prepTimeMinutes ?? 0,
    ),
    cookTimeMinutes: Number(
      createdRecipe.cookTimeMinutes ?? payload.cookTimeMinutes ?? 0,
    ),
    servings: Number(createdRecipe.servings ?? payload.servings ?? 0),
    image: String(createdRecipe.image ?? payload.image ?? ""),
    ingredients: Array.isArray(createdRecipe.ingredients)
      ? createdRecipe.ingredients
      : ingredients,
    instructions: Array.isArray(createdRecipe.instructions)
      ? createdRecipe.instructions
      : instructions,
    tags: Array.isArray(createdRecipe.tags) ? createdRecipe.tags : tags,
  });
};
