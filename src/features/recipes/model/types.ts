export type RecipeDifficulty = "Easy" | "Medium" | "Hard";

export type Recipe = {
  id: number;
  name: string;
  image: string;
  cuisine: string;
  difficulty: string;
  rating: number;
  reviewCount: number;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  caloriesPerServing: number;
  tags: string[];
  mealType: string[];
  ingredients: string[];
  instructions: string[];
  userId: number;
};

export type RecipesResponse = {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
};

export type AddRecipeRequest = {
  name: string;
  cuisine?: string;
  difficulty?: RecipeDifficulty;
  prepTimeMinutes?: number;
  cookTimeMinutes?: number;
  servings?: number;
  image?: string;
  ingredients: string[];
  instructions: string[];
  tags?: string[];
  userId: number | string;
};

export type RecipeTags = string[];

export type LocalRecipe = {
  id: number;
  name: string;
  cuisine?: string;
  difficulty?: RecipeDifficulty;
  prepTimeMinutes?: number;
  cookTimeMinutes?: number;
  servings?: number;
  image?: string;
  ingredients: string[];
  instructions: string[];
  tags?: string[];
  userId: number | string;
};

export type RecipeListItem = Pick<
  Recipe | LocalRecipe,
  "id" | "name" | "userId" | "image" | "cuisine" | "difficulty" | "tags"
>;
