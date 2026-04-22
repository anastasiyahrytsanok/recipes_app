import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { AuthUser } from "./types";

type AuthTokens = {
  accessToken: string | null;
  refreshToken: string | null;
};

type SetAuthDataPayload = {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
};

export type AuthState = {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isInitialized: boolean;
};

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isInitialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData(state, action: PayloadAction<SetAuthDataPayload>) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },

    setUser(state, action: PayloadAction<AuthUser | null>) {
      state.user = action.payload;
    },

    setTokens(state, action: PayloadAction<AuthTokens>) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },

    setInitialized(state, action: PayloadAction<boolean>) {
      state.isInitialized = action.payload;
    },

    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isInitialized = true;
    },
  },
});

export const { setAuthData, setUser, setTokens, setInitialized, logout } =
  authSlice.actions;

export const authReducer = authSlice.reducer;
