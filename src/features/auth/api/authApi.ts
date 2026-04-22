import { createApi } from "@reduxjs/toolkit/query/react";

import type {
  AuthUser,
  LoginRequest,
  LoginResponse,
  RefreshResponse,
} from "../model/types";

import { baseQueryWithRefresh } from "@/shared/api/baseQueryWithRefresh";
import { authStorage } from "@/shared/lib/authStorage";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithRefresh,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),

    getMe: builder.query<AuthUser, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),

    refreshSession: builder.mutation<RefreshResponse, void>({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
        body: {
          refreshToken: authStorage.getRefreshToken(),
          expiresInMins: 30,
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetMeQuery,
  useLazyGetMeQuery,
  useRefreshSessionMutation,
} = authApi;
