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

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery,
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => '/api/v1/user/getProfile',
    }),
    updateProfile: builder.mutation({
      query: (formData) => ({
        url: '/api/v1/user/updateProfile',
        method: 'PUT',
        body: formData,
      }),
    }),
    getWallet: builder.query({
      query: () => '/api/v1/user/wallet/getwallet',
    }),
    getAllAddresses: builder.query({
      query: () => `/api/v1/user/getAddress`,
      providesTags: ['Address'],
    }),
    getAddressById: builder.query({
      query: (id) => `/api/v1/user/address/${id}`,
      providesTags: ['Address'],
    }),
    addAddress: builder.mutation({
      query: (body) => ({
        url: `/api/v1/user/address/new`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Address'],
    }),
    updateAddress: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/v1/user/address/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Address'],
    }),
    deleteAddress: builder.mutation({
      query: (id) => ({
        url: `/api/v1/user/address/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Address'],
    }),
    addAddressToCart: builder.mutation({
      query: (addressId) => ({
        url: `/api/v1/user/Cart/addAdressToCart/${addressId}`,
        method: 'PUT',
      }),
    }),
    addDateAndTimeToCart: builder.mutation({
      query: (body) => ({
        url: `/api/v1/user/Cart/addDateAndTimeToCart`,
        method: 'PUT',
        body,
      }),
    }),
    getAllSlots: builder.query({
      query: () => '/api/v1/user/slot',
    }),
    getOngoingOrders: builder.query({
      query: () => '/api/v1/user/getOngoingOrders',
    }),
    getOrderById: builder.query({
      query: (orderId) => `/api/v1/admin/orders/${orderId}`,
    }),
    addFavouriteBooking: builder.mutation({
      query: (orderId) => ({
        url: `/api/v1/user/FavouriteBooking/addFavouriteBooking/${orderId}`,
        method: 'POST',
      }),
    }),
    getStaticBanners: builder.query({
      query: () => '/api/v1/admin/Banner/all/staticBanner',
    }),
    searchCategories: builder.query({
      query: (searchTerm) => `/api/v1/user/Category/search?search=${encodeURIComponent(searchTerm)}`,
    }),
    getCoupons: builder.query({
      query: () => '/api/v1/admin/Coupan/listCoupan',
      providesTags: ['Coupons'],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetWalletQuery,
  useGetAllAddressesQuery,
  useGetAddressByIdQuery,
  useAddAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
  useAddAddressToCartMutation,
  useLazyGetAllAddressesQuery,
  useAddDateAndTimeToCartMutation,
  useLazyGetAllSlotsQuery,
  useGetOngoingOrdersQuery,
  useGetOrderByIdQuery,
  useAddFavouriteBookingMutation,
  useGetStaticBannersQuery,
  useSearchCategoriesQuery,
  useGetCouponsQuery
} = profileApi;