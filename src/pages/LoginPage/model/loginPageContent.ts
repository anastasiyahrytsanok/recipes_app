export const loginPageContent = {
  header: {
    label: "Welcome back",
    title: "Sign in to continue exploring recipes",
    description:
      "Save your favorite ideas, discover new dishes, and enjoy cooking inspiration every day with TastyRecipes.",
  },

  form: {
    title: "Login",
    fields: {
      username: {
        placeholder: "Username",
      },
      password: {
        placeholder: "Password",
      },
    },
    buttons: {
      submit: "Login",
      loading: "Loading...",
    },
    messages: {
      invalidCredentials: "Invalid username or password",
    },
    hint: {
      label: "Demo account:",
      value: "emilys / emilyspass",
    },
  },
} as const;
