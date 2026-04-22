import { Outlet } from "@tanstack/react-router";

import { Navigation } from "@/widgets/Navigation";

import "./AppLayout.css";

export const AppLayout = () => {
  return (
    <div className="app-layout">
      <Navigation />

      <main className="app-layout__content">
        <Outlet />
      </main>
    </div>
  );
};
