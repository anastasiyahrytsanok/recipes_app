import { useNavigate, useParams } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { editRecipeContent } from "../model/editRecipeContent";

import type { RootState } from "@/app/store/store";
import { RecipeForm, RecipeFormValues } from "@/features/recipe-manage";
import {
  buildAddRecipePayload,
  mapMultilineTextToArray,
  mapTagsToArray,
  normalizeDifficulty,
} from "@/features/recipe-manage/lib/recipeFormMappers";
import { mapRecipeToFormValues } from "@/features/recipe-manage/lib/recipeToFormValues";
import { recipesStorage } from "@/features/recipes/lib/recipesStorage";
import { ConfirmModal } from "@/shared/ui/ConfirmModal";
import { PageHeader } from "@/shared/ui/PageHeader";
import { SectionShell } from "@/shared/ui/SectionShell";

import "./EditRecipePage.css";

export const EditRecipePage = () => {
  const { id } = useParams({ from: "/app/protected/recipes/$id/edit" });
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [pendingValues, setPendingValues] = useState<RecipeFormValues | null>(
    null,
  );

  const recipeId = Number(id);
  const recipes = recipesStorage.getRecipes();

  const recipe = recipes.find((item) => item.id === recipeId);

  const isNotFound = !recipe;
  const isForbidden = Boolean(
    recipe && (!user?.id || recipe.userId !== user.id),
  );

  const initialValues = useMemo(() => {
    if (!recipe) {
      return undefined;
    }

    return mapRecipeToFormValues(recipe);
  }, [recipe]);

  const handleCancel = (): void => {
    navigate({ to: "/recipes/$id", params: { id: String(recipeId) } });
  };

  const handleSubmit = (values: RecipeFormValues): void => {
    setPendingValues(values);
    setIsConfirmModalOpen(true);
  };

  const handleCancelSave = (): void => {
    setIsConfirmModalOpen(false);
    setPendingValues(null);
  };

  const handleConfirmSave = (): void => {
    if (!pendingValues || !recipe) {
      handleCancelSave();
      return;
    }

    const updatedPayload = buildAddRecipePayload(pendingValues, recipe.userId);

    recipesStorage.updateRecipe({
      ...recipe,
      name: updatedPayload.name,
      cuisine: updatedPayload.cuisine,
      difficulty: updatedPayload.difficulty
        ? normalizeDifficulty(updatedPayload.difficulty)
        : undefined,
      prepTimeMinutes: updatedPayload.prepTimeMinutes,
      cookTimeMinutes: updatedPayload.cookTimeMinutes,
      servings: updatedPayload.servings,
      image: updatedPayload.image,
      ingredients: mapMultilineTextToArray(pendingValues.ingredients),
      instructions: mapMultilineTextToArray(pendingValues.instructions),
      tags: mapTagsToArray(pendingValues.tags),
      userId: recipe.userId,
    });

    navigate({ to: "/recipes/$id", params: { id: String(recipeId) } });
  };

  if (isNotFound) {
    return (
      <section className="edit-recipe">
        <PageHeader
          label={editRecipeContent.header.label}
          title={editRecipeContent.states.notFound.title}
          description={editRecipeContent.states.notFound.description}
        />
      </section>
    );
  }

  if (isForbidden) {
    return (
      <section className="edit-recipe">
        <PageHeader
          label={editRecipeContent.header.label}
          title={editRecipeContent.states.forbidden.title}
          description={editRecipeContent.states.forbidden.description}
        />
      </section>
    );
  }

  return (
    <>
      <section className="edit-recipe">
        <PageHeader
          label={editRecipeContent.header.label}
          title={editRecipeContent.header.title}
          description={editRecipeContent.header.description}
        />

        <SectionShell>
          <RecipeForm
            title={editRecipeContent.form.title}
            content={editRecipeContent.form}
            initialValues={initialValues}
            isSubmitting={false}
            onCancel={handleCancel}
            onSubmit={handleSubmit}
          />
        </SectionShell>
      </section>

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        title={editRecipeContent.confirmModal.title}
        description={editRecipeContent.confirmModal.description}
        confirmText={editRecipeContent.confirmModal.confirmText}
        cancelText={editRecipeContent.confirmModal.cancelText}
        onConfirm={handleConfirmSave}
        onCancel={handleCancelSave}
      />
    </>
  );
};
