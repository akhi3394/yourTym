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

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery,
    endpoints: (builder) => ({
        loginWithPhone: builder.mutation({
            query: (body) => ({
                url: '/api/v1/user/loginWithPhone',
                method: 'POST',
                body: body,
            }),
        }),
        verifyOtp: builder.mutation({
            query: ({ body, userId }) => ({
                url: `/api/v1/user/${userId}`,
                method: 'POST',
                body,
            }),
        }),

        register: builder.mutation({
            query: (userData) => ({
                url: '/api/v1/user/registration',
                method: 'POST',
                body: userData,
            }),
        }),
        resendOtp: builder.mutation({
            query: (userId) => ({
                url: `/api/v1/user/resendOtp/${userId}`,
                method: 'POST',
            }),
        }),
        socialLogin: builder.mutation({
            query: (userData) => ({
                url: '/api/v1/user/socialLogin',
                method: 'POST',
                body: userData,
            }),
        }),
        getAllCities: builder.query({
            query: () => ({
                url: '/api/v1/user/city/cities',
                method: 'GET',
            }),
        }),
        updateLocation: builder.mutation({
            query: (locationData) => ({
                url: '/api/v1/user/updateLocation',
                method: 'PUT',
                body: locationData,
            }),
        }),
        getCityById: builder.query({
            query: (cityId) => ({
                url: `/api/v1/user/city/cities/${cityId}`,
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useLoginWithPhoneMutation,
    useVerifyOtpMutation,
    useRegisterMutation,
    useResendOtpMutation,
    useSocialLoginMutation,
    useGetAllCitiesQuery,
    useUpdateLocationMutation,
    useGetCityByIdQuery,
} = authApi;