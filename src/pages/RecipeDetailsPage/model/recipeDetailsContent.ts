export const recipeDetailsContent = {
  header: {
    defaultLabel: "Recipe",
    defaultCuisine: "Custom recipe",
    defaultDifficulty: "Unknown",
    getDefaultDescription: (difficulty: string) =>
      `A delicious ${difficulty.toLowerCase()} recipe.`,
    getMealTypeDescription: (difficulty: string, mealTypes: string) =>
      `A delicious ${difficulty.toLowerCase()} recipe for ${mealTypes.toLowerCase()}.`,
  },

  states: {
    loading: {
      title: "Loading recipe...",
      description: "Please wait while we prepare the details.",
    },
    notFound: {
      title: "Recipe not found",
      description: "We could not load this recipe. Please try again later.",
    },
  },

  actions: {
    edit: "Edit",
    delete: "Delete",
  },

  meta: {
    prepTime: "Prep time",
    cookTime: "Cook time",
    totalTime: "Total time",
    servings: "Servings",
    difficulty: "Difficulty",
    calories: "Calories",
    rating: "Rating",
    reviews: "Reviews",
    emptyValue: "—",
  },

  sections: {
    ingredients: "Ingredients",
    instructions: "Instructions",
  },

  image: {
    placeholder: "No image",
  },
} as const;
