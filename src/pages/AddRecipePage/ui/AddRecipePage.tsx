import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useSelector } from "react-redux";

import { handleAddRecipe } from "../lib/handleAddRecipe";
import { addRecipeContent } from "../model/addRecipeContent";

import type { RootState } from "@/app/store/store";
import { RecipeForm, RecipeFormValues } from "@/features/recipe-manage";
import { useAddRecipeMutation } from "@/features/recipes/api/recipesApi";
import { ConfirmModal } from "@/shared/ui/ConfirmModal";
import { PageHeader } from "@/shared/ui/PageHeader";
import { SectionShell } from "@/shared/ui/SectionShell";

import "./AddRecipePage.css";

export const AddRecipePage = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const [pendingValues, setPendingValues] = useState<RecipeFormValues | null>(
    null,
  );
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const [addRecipe, { isLoading }] = useAddRecipeMutation();

  const handleCancel = () => {
    navigate({ to: "/recipes" });
  };

  const handleSubmit = async (values: RecipeFormValues) => {
    setPendingValues(values);
    setIsConfirmModalOpen(true);
  };

  const handleCancelSave = () => {
    setIsConfirmModalOpen(false);
    setPendingValues(null);
  };

  const handleConfirmSave = async () => {
    if (!pendingValues || !user?.id) {
      handleCancelSave();
      throw new Error(addRecipeContent.form.messages.saveError);
    }

    await handleAddRecipe({
      values: pendingValues,
      userId: user.id,
      addRecipe,
    });

    navigate({ to: "/recipes" });
  };

  return (
    <>
      <section className="add-recipe">
        <PageHeader
          label={addRecipeContent.header.label}
          title={addRecipeContent.header.title}
          description={addRecipeContent.header.description}
        />

        <SectionShell>
          <RecipeForm
            title={addRecipeContent.form.title}
            content={addRecipeContent.form}
            isSubmitting={isLoading}
            onCancel={handleCancel}
            onSubmit={handleSubmit}
          />
        </SectionShell>
      </section>

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        title={addRecipeContent.confirmModal.title}
        description={addRecipeContent.confirmModal.description}
        confirmText={addRecipeContent.confirmModal.confirmText}
        cancelText={addRecipeContent.confirmModal.cancelText}
        onConfirm={handleConfirmSave}
        onCancel={handleCancelSave}
      />
    </>
  );
};
