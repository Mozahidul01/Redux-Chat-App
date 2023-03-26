import { apiSlice } from "../api/apiSlice";

export const messagesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint for get messages from the server
    getMessages: builder.query({
      query: (id) =>
        `/messages?conversationId=${id}&_sort=timestamp&_order=desc_page=1&_limit=${
          import.meta.env.VITE_MESSAGES_LIMIT
        }`,
    }),

    // Endpoint for add messages to the server
    addMessages: builder.mutation({
      query: (data) => ({
        url: `/messages`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetMessagesQuery, useAddMessagesMutation } = messagesApi;
