import { apiSlice } from "../api/apiSlice";

export const conversationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint for get data from the server
    getNames: builder.query({
      query: () => "/query-to-fetch-data",
      providesTags: ["Names"],
    }),

    // Endpoint for get Individual data from the server
    getName: builder.query({
      query: ({ id }) => `/query-to-fetch-data/${id}`,
      providesTags: (result, error, arg) => [
        {
          type: "Name",
          id: arg.id,
        },
      ],
    }),

    // Endpoint for posting data to the server
    postName: builder.mutation({
      query: (data) => ({
        url: "/query-to-post-data",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Names"],
    }),

    // Endpoint for updating data on the server
    patchName: builder.mutation({
      query: ({ id, data }) => ({
        url: `/query-to-update-data/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        "Names",
        {
          type: "Name",
          id: arg.id,
        },
      ],
    }),

    // Endpoint for deleting data from the server
    deleteName: builder.mutation({
      query: ({ id }) => ({
        url: `/query-to-delete-data/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Names"],
    }),
  }),
});
