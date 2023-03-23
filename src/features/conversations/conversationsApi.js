import { apiSlice } from "../api/apiSlice";

export const conversationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint for get Conversations from the server
    getConversation: builder.query({
      query: (email) =>
        `/conversations?participants_like=${email}&_sort=timestamp&_order=desc_page=1&_limit=${
          import.meta.env.VITE_CONVERSATIONS_LIMIT
        }`,
      providesTags: ["Names"],
    }),
  }),
});

export const { useGetConversationQuery } = conversationsApi;
