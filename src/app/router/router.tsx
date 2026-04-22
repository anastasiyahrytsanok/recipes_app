import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

import { AboutPage } from "@/pages/AboutPage";
import { AddRecipePage } from "@/pages/AddRecipePage";
import { ContactPage } from "@/pages/ContactPage";
import { EditRecipePage } from "@/pages/EditRecipePage";
import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/pages/LoginPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { RecipeDetailsPage } from "@/pages/RecipeDetailsPage";
import { RecipesPage } from "@/pages/RecipesPage";
import { AppLayout } from "@/widgets/AppLayout";
import { ProtectedLayout } from "@/widgets/ProtectedLayout";
import { PublicLayout } from "@/widgets/PublicLayout";

const rootRoute = createRootRoute({
  component: () => <Outlet />,
  notFoundComponent: NotFoundPage,
});

const publicRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "public",
  component: PublicLayout,
});

const loginRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: "/login",
  component: LoginPage,
});

const appRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "app",
  component: AppLayout,
});

const homeRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/",
  component: HomePage,
});

const aboutRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/about",
  component: AboutPage,
});

const contactRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/contact",
  component: ContactPage,
});

const protectedRoute = createRoute({
  getParentRoute: () => appRoute,
  id: "protected",
  component: ProtectedLayout,
});

const recipesRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/recipes",
  component: RecipesPage,
});

const recipeDetailsRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/recipes/$id",
  component: RecipeDetailsPage,
});

const addRecipeRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/recipes/add",
  component: AddRecipePage,
});

const editRecipeRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/recipes/$id/edit",
  component: EditRecipePage,
});

const routeTree = rootRoute.addChildren([
  publicRoute.addChildren([loginRoute]),
  appRoute.addChildren([
    homeRoute,
    aboutRoute,
    contactRoute,
    protectedRoute.addChildren([
      recipesRoute,
      recipeDetailsRoute,
      addRecipeRoute,
      editRecipeRoute,
    ]),
  ]),
]);

export const router = createRouter({
  routeTree,
  basepath: "/recipes_app",
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
