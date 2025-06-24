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

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery,
    endpoints: (builder) => ({
        getAllCategories: builder.query({
            query: () => ({
                url: '/api/v1/user/Category/allCategory',
                method: 'GET',
            }),
            transformErrorResponse: (response) => ({
                message: response?.data?.message || 'Error fetching categories',
            }),
        }),
        getAllPackages: builder.query({
            query: () => '/api/v1/admin/Package/getAllService',
            transformResponse: (response) => response.data,
        }),
        getAllServices: builder.query({
            query: () => '/api/v1/user/Category/allServices',
            transformResponse: (response) => response.data,
        }),
    }),
});

export const { useGetAllCategoriesQuery,useGetAllPackagesQuery,useGetAllServicesQuery } = productsApi;