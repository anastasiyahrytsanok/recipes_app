import { RecipeFormValues } from "@/features/recipe-manage";
import {
  buildAddRecipePayload,
  normalizeDifficulty,
} from "@/features/recipe-manage/lib/recipeFormMappers";
import { useAddRecipeMutation } from "@/features/recipes/api/recipesApi";
import { recipesStorage } from "@/features/recipes/lib/recipesStorage";

type AddRecipeMutation = ReturnType<typeof useAddRecipeMutation>[0];

type Params = {
  values: RecipeFormValues;
  userId: number;
  addRecipe: AddRecipeMutation;
};

export const handleAddRecipe = async ({
  values,
  userId,
  addRecipe,
}: Params) => {
  const payload = buildAddRecipePayload(values, userId);
  const createdRecipe = await addRecipe(payload).unwrap();

  recipesStorage.addRecipe({
    ...createdRecipe,
    id: recipesStorage.getNextId(),
    userId: createdRecipe.userId,
    name: createdRecipe.name,
    cuisine: createdRecipe.cuisine ?? "",
    difficulty: normalizeDifficulty(String(createdRecipe.difficulty)),
    prepTimeMinutes: createdRecipe.prepTimeMinutes ?? 0,
    cookTimeMinutes: createdRecipe.cookTimeMinutes ?? 0,
    servings: createdRecipe.servings ?? 0,
    image: createdRecipe.image ?? "",
    ingredients: createdRecipe.ingredients,
    instructions: createdRecipe.instructions,
    tags: createdRecipe.tags,
  });
};
