import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the apiSlice using createApi from reduxjs/toolkit
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),

  // An array of tag names to be used for data invalidation and re-fetching
  tagTypes: ["Names", "Name"],

  // Define the endpoints
  endpoints: (builder) => ({}),
});

export const {
  useGetNamesQuery,
  useGetNameQuery,
  usePostNameMutation,
  usePatchNameMutation,
  useDeleteNameMutation,
} = apiSlice;
