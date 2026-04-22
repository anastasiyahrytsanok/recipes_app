import type { RecipeListItem } from "../model/types";

type GetMergedRecipesParams = {
  localRecipes: RecipeListItem[];
  apiRecipes: RecipeListItem[];
};

export const getMergedRecipes = ({
  localRecipes,
  apiRecipes,
}: GetMergedRecipesParams): RecipeListItem[] => {
  return [...localRecipes, ...apiRecipes];
};

type GetRecipesByTagParams = {
  selectedTag: string;
  allRecipes: RecipeListItem[];
  localRecipes: RecipeListItem[];
  taggedApiRecipes: RecipeListItem[];
};

export const getRecipesBySelectedTag = ({
  selectedTag,
  allRecipes,
  localRecipes,
  taggedApiRecipes,
}: GetRecipesByTagParams): RecipeListItem[] => {
  if (!selectedTag) {
    return allRecipes;
  }

  const localRecipesByTag = localRecipes.filter((recipe) =>
    Array.isArray(recipe.tags) ? recipe.tags.includes(selectedTag) : false,
  );

  return [...localRecipesByTag, ...taggedApiRecipes];
};

type GetRelevantRecipesParams = {
  selectedTag: string;
  searchValue: string;
  allRecipes: RecipeListItem[];
  recipesBySelectedTag: RecipeListItem[];
};

export const getRelevantRecipes = ({
  selectedTag,
  searchValue,
  allRecipes,
  recipesBySelectedTag,
}: GetRelevantRecipesParams): RecipeListItem[] => {
  const baseRecipes = selectedTag ? recipesBySelectedTag : allRecipes;
  const trimmedSearchValue = searchValue.trim().toLowerCase();

  if (!trimmedSearchValue) {
    return baseRecipes;
  }

  return baseRecipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(trimmedSearchValue),
  );
};

type GetCanManageRecipeParams = {
  currentUserId?: string | number;
  recipeUserId?: string | number;
};

export const getCanManageRecipe = ({
  currentUserId,
  recipeUserId,
}: GetCanManageRecipeParams): boolean => {
  return Boolean(currentUserId) && currentUserId === recipeUserId;
};
