import type { LocalRecipe } from "../model/types";

const LOCAL_RECIPES_KEY = "localRecipes";

const getStoredRecipes = (): LocalRecipe[] => {
  const recipes = localStorage.getItem(LOCAL_RECIPES_KEY);

  if (!recipes) {
    return [];
  }

  try {
    return JSON.parse(recipes) as LocalRecipe[];
  } catch (error) {
    console.error("Failed to parse local recipes:", error);
    return [];
  }
};

const saveStoredRecipes = (recipes: LocalRecipe[]): void => {
  localStorage.setItem(LOCAL_RECIPES_KEY, JSON.stringify(recipes));
};

export const recipesStorage = {
  getRecipes(): LocalRecipe[] {
    return getStoredRecipes();
  },

  saveRecipes(recipes: LocalRecipe[]): void {
    saveStoredRecipes(recipes);
  },

  addRecipe(recipe: LocalRecipe): void {
    const recipes = getStoredRecipes();
    saveStoredRecipes([recipe, ...recipes]);
  },

  getNextId(): number {
    const recipes = getStoredRecipes();

    if (!recipes.length) {
      return 100000;
    }

    return Math.max(...recipes.map((recipe) => recipe.id)) + 1;
  },

  removeRecipe(id: number): void {
    const recipes = getStoredRecipes().filter((recipe) => recipe.id !== id);
    saveStoredRecipes(recipes);
  },

  updateRecipe(updatedRecipe: LocalRecipe): void {
    const recipes = getStoredRecipes().map((recipe) =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe,
    );

    saveStoredRecipes(recipes);
  },
};
