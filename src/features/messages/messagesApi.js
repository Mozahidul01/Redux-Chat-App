import { apiSlice } from "../api/apiSlice";

export const messagesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint for get messages from the server
    getMessages: builder.query({
      query: (id) =>
        `/messages?conversationId=${id}&_sort=timestamp&_order=desc_page=1&_limit=${
          import.meta.env.VITE_MESSAGES_LIMIT
        }`,
      providesTags: ["Names"],
    }),
  }),
});

export const { useGetMessagesQuery } = messagesApi;
