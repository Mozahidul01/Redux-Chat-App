import { apiSlice } from "../api/apiSlice";

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint for get messages from the server
    getUser: builder.query({
      query: (email) => `/users?email=${email}`,
    }),
  }),
});

export const { useGetUserQuery } = usersApi;
