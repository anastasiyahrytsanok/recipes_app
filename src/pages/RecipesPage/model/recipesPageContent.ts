export const recipesPageContent = {
  header: {
    label: "Recipes",
    title: "Discover your next favorite dish",
    description:
      "Explore a collection of cozy, fresh, and delicious recipes for every mood and occasion.",
  },

  filters: {
    searchPlaceholder: "Search recipes...",
    searchClearLabel: "Clear search",
    tagLabel: "Choose a tag:",
    allTagsLabel: "All tags",
  },

  buttons: {
    addRecipe: "+ Add recipe",
    edit: "Edit",
    delete: "Delete",
  },

  messages: {
    loading: "Loading recipes...",
    error: "Failed to load recipes. Please try again later.",
    empty: "No recipes found.",
  },

  fallbacks: {
    cuisine: "Unknown cuisine",
    difficulty: "Unknown difficulty",
  },

  modal: {
    title: "Delete recipe?",
    description:
      "This action cannot be undone. The recipe will be permanently removed from your local storage.",
    confirmText: "Delete",
    cancelText: "Cancel",
  },
} as const;
