import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const staticApi = createApi({
  reducerPath: 'staticApi',
  baseQuery,
  endpoints: (builder) => ({
    getAboutUs: builder.query({
      query: () => '/api/v1/static/getAboutUs',
    }),
    getPrivacy: builder.query({
      query: () => '/api/v1/static/getPrivacy',
    }),
    getTerms: builder.query({
      query: () => '/api/v1/static/getTerms',
    }),
    getFaqs: builder.query({
      query: () => '/api/v1/static/faq/All',
    }),
    addFeedback: builder.mutation({
      query: (body) => ({
        url: '/api/v1/user/Feedback/AddFeedback',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetAboutUsQuery,
  useGetPrivacyQuery,
  useGetTermsQuery,
  useGetFaqsQuery,
  useAddFeedbackMutation
} = staticApi;