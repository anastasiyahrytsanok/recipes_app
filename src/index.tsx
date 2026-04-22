import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { StoreProvider } from "@/app/providers/StoreProvider/ui/StoreProvider";
import { router } from "@/app/router/router";
import { AppInitializer } from "@/widgets/AppInitializer";

import "@/app/styles/global.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root container was not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <StoreProvider>
      <AppInitializer>
        <RouterProvider router={router} />
      </AppInitializer>
    </StoreProvider>
  </StrictMode>,
);
