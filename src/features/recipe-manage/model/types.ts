export type RecipeDifficulty = "Easy" | "Medium" | "Hard";

export type RecipeFormValues = {
  name: string;
  cuisine: string;
  difficulty: RecipeDifficulty | "";
  prepTimeMinutes: number | "";
  cookTimeMinutes: number | "";
  servings: number | "";
  image: string;
  ingredients: string;
  instructions: string;
  tags: string;
};

export type RecipeFormContent = {
  title: string;
  fields: {
    name: {
      label: string;
      placeholder: string;
    };
    cuisine: {
      label: string;
      placeholder: string;
    };
    difficulty: {
      label: string;
      placeholder: string;
      options: readonly string[];
    };
    prepTimeMinutes: {
      label: string;
      placeholder: string;
    };
    cookTimeMinutes: {
      label: string;
      placeholder: string;
    };
    servings: {
      label: string;
      placeholder: string;
    };
    image: {
      label: string;
      buttonText: string;
      hint: string;
    };
    tags: {
      label: string;
      placeholder: string;
    };
    ingredients: {
      label: string;
      placeholder: string;
    };
    instructions: {
      label: string;
      placeholder: string;
    };
  };
  buttons: {
    cancel: string;
    submit: string;
    loading: string;
  };
  messages: {
    nameRequired: string;
    ingredientsRequired: string;
    instructionsRequired: string;
    saveError: string;
    imageReadError: string;
    imageSizeError: string;
  };
  imagePreviewAlt: string;
};
