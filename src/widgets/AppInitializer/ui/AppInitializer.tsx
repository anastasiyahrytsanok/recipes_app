import { useEffect } from "react";
import type { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";

import { initializeAuth } from "../lib/initializeAuth";
import { appInitializerContent } from "../model/appInitializerContent";

import { AppDispatch, RootState } from "@/app/store/store";
import {
  useLazyGetMeQuery,
  useRefreshSessionMutation,
} from "@/features/auth/api/authApi";

type AppInitializerProps = {
  children: ReactNode;
};

export const AppInitializer = ({ children }: AppInitializerProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const isInitialized = useSelector(
    (state: RootState) => state.auth.isInitialized,
  );

  const [getMe] = useLazyGetMeQuery();
  const [refreshSession] = useRefreshSessionMutation();

  useEffect(() => {
    void initializeAuth({
      dispatch,
      getMe,
      refreshSession,
    });
  }, [dispatch, getMe, refreshSession]);

  if (!isInitialized) {
    return <div>{appInitializerContent.loading}</div>;
  }

  return <>{children}</>;
};
