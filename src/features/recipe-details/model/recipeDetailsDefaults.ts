export const recipeDetailsDefaults = {
  cuisine: "Custom recipe",
  difficulty: "Unknown",
  emptyValue: "—",
  getDefaultDescription: (difficulty: string): string =>
    `A delicious ${difficulty.toLowerCase()} recipe.`,
  getMealTypeDescription: (difficulty: string, mealTypes: string): string =>
    `A delicious ${difficulty.toLowerCase()} recipe for ${mealTypes.toLowerCase()}.`,
} as const;
