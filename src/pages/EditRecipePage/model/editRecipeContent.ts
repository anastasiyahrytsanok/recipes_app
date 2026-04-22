import { RecipeFormContent } from "@/features/recipe-manage/model/types";

type EditRecipeContent = {
  header: {
    label: string;
    title: string;
    description: string;
  };
  form: RecipeFormContent;
  states: {
    notFound: {
      title: string;
      description: string;
    };
    forbidden: {
      title: string;
      description: string;
    };
  };
  confirmModal: {
    title: string;
    description: string;
    confirmText: string;
    cancelText: string;
  };
};

export const editRecipeContent: EditRecipeContent = {
  header: {
    label: "Edit recipe",
    title: "Update your recipe",
    description:
      "Change ingredients, instructions, image, or any other recipe details.",
  },

  form: {
    title: "Edit Recipe",
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
      submit: "Save Changes",
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

  states: {
    notFound: {
      title: "Recipe not found",
      description: "We could not find this local recipe.",
    },
    forbidden: {
      title: "Access denied",
      description: "You can edit only your own recipes.",
    },
  },

  confirmModal: {
    title: "Save changes?",
    description: "Your recipe will be updated with the new information.",
    confirmText: "Save",
    cancelText: "Cancel",
  },
};
