import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { AddRecipeRequest, Recipe, RecipesResponse } from "../model/types";

import { API_BASE_URL } from "@/shared/api/constants";

export const recipesApi = createApi({
  reducerPath: "recipesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getRecipes: builder.query<RecipesResponse, void>({
      query: () => ({
        url: "/recipes?limit=0",
        method: "GET",
      }),
    }),

    searchRecipes: builder.query<RecipesResponse, string>({
      query: (searchValue) => ({
        url: `/recipes/search?q=${encodeURIComponent(searchValue)}`,
        method: "GET",
      }),
    }),

    getRecipeById: builder.query<Recipe, number>({
      query: (id) => ({
        url: `/recipes/${id}`,
        method: "GET",
      }),
    }),

    addRecipe: builder.mutation<Recipe, AddRecipeRequest>({
      query: (body) => ({
        url: "/recipes/add",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetRecipesQuery,
  useGetRecipeByIdQuery,
  useSearchRecipesQuery,
  useLazySearchRecipesQuery,
  useAddRecipeMutation,
} = recipesApi;
