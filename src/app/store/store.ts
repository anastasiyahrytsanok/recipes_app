import { configureStore } from "@reduxjs/toolkit";

import { authApi } from "@/features/auth/api/authApi";
import { authReducer } from "@/features/auth/model/authSlice";
import { recipesApi } from "@/features/recipes/api/recipesApi";
import { tagsApi } from "@/features/recipes/api/tagsApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [recipesApi.reducerPath]: recipesApi.reducer,
    [tagsApi.reducerPath]: tagsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(recipesApi.middleware)
      .concat(tagsApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
