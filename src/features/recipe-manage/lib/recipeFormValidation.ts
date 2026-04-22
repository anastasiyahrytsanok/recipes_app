import { mapMultilineTextToArray } from "./recipeFormMappers";
import type { RecipeFormContent, RecipeFormValues } from "../model/types";

export const validateRecipeForm = (
  formValues: RecipeFormValues,
  messages: RecipeFormContent["messages"],
): string | null => {
  if (!formValues.name.trim()) {
    return messages.nameRequired;
  }

  if (!mapMultilineTextToArray(formValues.ingredients).length) {
    return messages.ingredientsRequired;
  }

  if (!mapMultilineTextToArray(formValues.instructions).length) {
    return messages.instructionsRequired;
  }

  return null;
};
