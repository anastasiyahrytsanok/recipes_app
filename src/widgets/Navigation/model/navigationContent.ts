export const navigationContent = {
  links: [
    {
      label: "Recipes",
      to: "/recipes",
    },
    {
      label: "About Us",
      to: "/about",
    },
    {
      label: "Contact",
      to: "/contact",
    },
  ],

  buttons: {
    login: "Log In",
    logout: "Log Out",
  },

  burger: {
    openLabel: "Open navigation menu",
    closeLabel: "Close navigation menu",
  },

  logoutModal: {
    title: "Log out?",
    description: "You will need to log in again to access your account.",
    confirmText: "Log out",
    cancelText: "Cancel",
  },

  logo: {
    primary: "Tasty",
    secondary: "Recipes",
  },
} as const;
