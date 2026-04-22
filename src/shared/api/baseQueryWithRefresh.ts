import {
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

import { API_BASE_URL } from "./constants";

import { logout, setTokens } from "@/features/auth/model/authSlice";
import { RefreshResponse } from "@/features/auth/model/types";
import { authStorage } from "@/shared/lib/authStorage";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    const accessToken = authStorage.getAccessToken();

    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }

    return headers;
  },
});

export const baseQueryWithRefresh: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status !== 401) {
    return result;
  }

  const refreshToken = authStorage.getRefreshToken();

  if (!refreshToken) {
    authStorage.clearTokens();
    api.dispatch(logout());

    return result;
  }

  const refreshResult = await rawBaseQuery(
    {
      url: "/auth/refresh",
      method: "POST",
      body: {
        refreshToken,
        expiresInMins: 30,
      },
    },
    api,
    extraOptions,
  );

  if (!refreshResult.data) {
    authStorage.clearTokens();
    api.dispatch(logout());

    return result;
  }

  const refreshData = refreshResult.data as RefreshResponse;

  authStorage.setTokens({
    accessToken: refreshData.accessToken,
    refreshToken: refreshData.refreshToken,
  });

  api.dispatch(
    setTokens({
      accessToken: refreshData.accessToken,
      refreshToken: refreshData.refreshToken,
    }),
  );

  result = await rawBaseQuery(args, api, extraOptions);

  return result;
};
