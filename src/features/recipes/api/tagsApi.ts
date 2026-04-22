import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { RecipeTags, RecipesResponse } from "../model/types";

import { API_BASE_URL } from "@/shared/api/constants";

export const tagsApi = createApi({
  reducerPath: "tagsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getTags: builder.query<RecipeTags, void>({
      query: () => ({
        url: "/recipes/tags",
        method: "GET",
      }),
    }),

    getRecipesByTag: builder.query<RecipesResponse, string>({
      query: (tag) => ({
        url: `/recipes/tag/${encodeURIComponent(tag)}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetTagsQuery, useGetRecipesByTagQuery } = tagsApi;
