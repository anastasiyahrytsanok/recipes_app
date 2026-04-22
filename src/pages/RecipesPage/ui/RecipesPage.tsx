import "./RecipesPage.css";

import { useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { recipesPageContent } from "../model/recipesPageContent";

import type { RootState } from "@/app/store/store";
import { useGetRecipesQuery } from "@/features/recipes/api/recipesApi";
import {
  useGetRecipesByTagQuery,
  useGetTagsQuery,
} from "@/features/recipes/api/tagsApi";
import {
  getCanManageRecipe,
  getMergedRecipes,
  getRecipesBySelectedTag,
  getRelevantRecipes,
} from "@/features/recipes/lib/recipesPageMappers";
import { recipesStorage } from "@/features/recipes/lib/recipesStorage";
import { RecipeCard } from "@/features/recipes/ui/RecipeCard/RecipeCard";
import { RecipesFilters } from "@/features/recipes/ui/RecipesFilters/RecipesFilters";
import { ConfirmModal } from "@/shared/ui/ConfirmModal";
import { PageHeader } from "@/shared/ui/PageHeader";
import { SectionShell } from "@/shared/ui/SectionShell";

export const RecipesPage = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [recipeIdToDelete, setRecipeIdToDelete] = useState<number | null>(null);

  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  const { header, filters, buttons, messages, fallbacks, modal } =
    recipesPageContent;

  const {
    data: allRecipesData,
    isLoading: isAllRecipesLoading,
    isError: isAllRecipesError,
  } = useGetRecipesQuery();

  const { data: tags } = useGetTagsQuery();

  const {
    data: taggedRecipesData,
    isLoading: isTaggedRecipesLoading,
    isError: isTaggedRecipesError,
  } = useGetRecipesByTagQuery(selectedTag, { skip: !selectedTag });

  const localRecipes = recipesStorage.getRecipes();

  const allRecipes = useMemo(() => {
    return getMergedRecipes({
      localRecipes,
      apiRecipes: allRecipesData?.recipes ?? [],
    });
  }, [allRecipesData, localRecipes]);

  const recipesBySelectedTag = useMemo(() => {
    return getRecipesBySelectedTag({
      selectedTag,
      allRecipes,
      localRecipes,
      taggedApiRecipes: taggedRecipesData?.recipes ?? [],
    });
  }, [allRecipes, localRecipes, taggedRecipesData, selectedTag]);

  const relevantRecipes = useMemo(() => {
    return getRelevantRecipes({
      selectedTag,
      searchValue,
      allRecipes,
      recipesBySelectedTag,
    });
  }, [allRecipes, recipesBySelectedTag, searchValue, selectedTag]);

  const isLoading = selectedTag ? isTaggedRecipesLoading : isAllRecipesLoading;
  const isError = selectedTag ? isTaggedRecipesError : isAllRecipesError;
  const hasRecipes = relevantRecipes.length > 0;
  const isEmpty = !isLoading && !isError && !hasRecipes;

  const handleNavigateToAddRecipePage = (): void => {
    navigate({ to: "/recipes/add" });
  };

  const handleEditRecipe = (recipeId: number): void => {
    navigate({ to: "/recipes/$id/edit", params: { id: String(recipeId) } });
  };

  const handleOpenDeleteModal = (recipeId: number): void => {
    setRecipeIdToDelete(recipeId);
  };

  const handleCloseDeleteModal = (): void => {
    setRecipeIdToDelete(null);
  };

  const handleConfirmDelete = (): void => {
    if (recipeIdToDelete === null) {
      return;
    }

    recipesStorage.removeRecipe(recipeIdToDelete);
    handleCloseDeleteModal();
  };

  return (
    <>
      <section className="recipes">
        <PageHeader
          label={header.label}
          title={header.title}
          description={header.description}
        />

        <SectionShell className="recipes__section">
          <RecipesFilters
            searchValue={searchValue}
            selectedTag={selectedTag}
            tags={tags}
            searchPlaceholder={filters.searchPlaceholder}
            clearLabel={filters.searchClearLabel}
            tagLabel={filters.tagLabel}
            allTagsLabel={filters.allTagsLabel}
            onSearchChange={setSearchValue}
            onClearSearch={() => setSearchValue("")}
            onTagChange={setSelectedTag}
          />

          <button
            type="button"
            className="recipes__add-recipe-button"
            onClick={handleNavigateToAddRecipePage}
          >
            {buttons.addRecipe}
          </button>

          {isLoading && <p className="recipes__message">{messages.loading}</p>}

          {isError && <p className="recipes__message">{messages.error}</p>}

          {isEmpty && <p className="recipes__message">{messages.empty}</p>}

          {!isLoading && !isError && hasRecipes && (
            <div className="recipes__grid">
              {relevantRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  id={recipe.id}
                  name={recipe.name}
                  image={recipe.image}
                  cuisine={recipe.cuisine}
                  difficulty={recipe.difficulty}
                  canManageRecipe={getCanManageRecipe({
                    currentUserId: user?.id,
                    recipeUserId: recipe.userId,
                  })}
                  fallbackCuisine={fallbacks.cuisine}
                  fallbackDifficulty={fallbacks.difficulty}
                  editLabel={buttons.edit}
                  deleteLabel={buttons.delete}
                  onEdit={handleEditRecipe}
                  onDelete={handleOpenDeleteModal}
                  imagePlaceholderText={"No image"}
                />
              ))}
            </div>
          )}
        </SectionShell>
      </section>

      <ConfirmModal
        isOpen={recipeIdToDelete !== null}
        title={modal.title}
        description={modal.description}
        confirmText={modal.confirmText}
        cancelText={modal.cancelText}
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseDeleteModal}
      />
    </>
  );
};
