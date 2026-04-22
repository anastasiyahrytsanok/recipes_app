import { Navigate, Outlet } from "@tanstack/react-router";
import { useSelector } from "react-redux";

import type { RootState } from "@/app/store/store";

const LOGIN_ROUTE = "/login";

export const ProtectedLayout = () => {
  const { user, isInitialized } = useSelector((state: RootState) => state.auth);

  if (!isInitialized) {
    return null;
  }

  if (!user) {
    return <Navigate to={LOGIN_ROUTE} />;
  }

  return <Outlet />;
};
