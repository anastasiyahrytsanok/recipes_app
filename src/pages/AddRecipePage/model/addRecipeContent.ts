export const addRecipeContent = {
  header: {
    label: "New recipe",
    title: "Share your favorite dish",
    description:
      "Add a new recipe with ingredients, instructions, and details so it can inspire more delicious moments.",
  },

  form: {
    title: "Add Recipe",

    fields: {
      name: {
        label: "Recipe name",
        placeholder: "Enter recipe name",
      },
      cuisine: {
        label: "Cuisine",
        placeholder: "Italian, Asian, Mexican...",
      },
      difficulty: {
        label: "Difficulty",
        placeholder: "Choose difficulty",
        options: ["Easy", "Medium", "Hard"] as const,
      },
      prepTimeMinutes: {
        label: "Prep time",
        placeholder: "Minutes",
      },
      cookTimeMinutes: {
        label: "Cook time",
        placeholder: "Minutes",
      },
      servings: {
        label: "Servings",
        placeholder: "Servings",
      },
      image: {
        label: "Upload image",
        buttonText: "Upload image",
        hint: "Max file size: 1 MB",
      },
      tags: {
        label: "Tags",
        placeholder: "dinner, pasta, quick",
      },
      ingredients: {
        label: "Ingredients",
        placeholder: "Write ingredients, one per line",
      },
      instructions: {
        label: "Instructions",
        placeholder: "Write cooking steps, one per line",
      },
    },

    buttons: {
      cancel: "Cancel",
      submit: "Save Recipe",
      loading: "Saving...",
    },

    messages: {
      nameRequired: "Recipe name is required.",
      ingredientsRequired: "Add at least one ingredient.",
      instructionsRequired: "Add at least one instruction.",
      saveError: "Failed to save recipe.",
      imageReadError: "Failed to read image.",
      imageSizeError: "Image must be smaller than 1 MB.",
    },

    imagePreviewAlt: "Recipe preview",
  },

  confirmModal: {
    title: "Save recipe?",
    description: "Your new recipe will be added to the recipe list.",
    confirmText: "Save",
    cancelText: "Cancel",
  },
};
