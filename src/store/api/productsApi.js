import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl:
    import.meta.env.VITE_BASE_URL ||
    "https://your-time-project-lime.vercel.app",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    console.log("Auth Token for API:", token);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    } else {
      console.log("No auth token found");
    }
    return headers;
  },
});

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery,
  tagTypes: ["Cart", "Addresses"],
  endpoints: (builder) => ({
    // Fetch all categories
    getAllCategories: builder.query({
      query: () => ({
        url: "/api/v1/user/Category/allCategory",
        method: "GET",
      }),
      transformResponse: (response) => response,
      transformErrorResponse: (response) => {
        console.log("Categories Error:", response);
        return {
          message: response?.data?.message || "Error fetching categories",
          status: response?.status,
        };
      },
    }),

    

    // Fetch all services
    getAllServices: builder.query({
      query: () => ({
        url: "/api/v1/user/Category/allServices",
        method: "GET",
      }),
      transformResponse: (response) => response,
      transformErrorResponse: (response) => {
        console.log("Services Error:", response);
        return {
          message: response?.data?.message || "Error fetching services",
          status: response?.status,
        };
      },
    }),

    
    // Fetch packages by main category
    getPackagesByMainCategory: builder.query({
      query: (mainCategoryId) => ({
        url: `/api/v1/admin/PackagebyMaincategory/${mainCategoryId}`,
        method: "GET",
      }),
      transformResponse: (response) => response,
      transformErrorResponse: (response) => {
        console.log("Packages Error:", response);
        return {
          message: response?.data?.message || "Error fetching packages",
          status: response?.status,
        };
      },
    }),

    // Fetch cart items
    getCart: builder.query({
      query: () => ({
        url: "/api/v1/user/getCart",
        method: "GET",
      }),
      providesTags: ["Cart"],
      transformResponse: (response) => response,
      transformErrorResponse: (response) => {
        console.log("Get Cart Error:", response);
        return {
          message: response?.data?.message || "Error fetching cart",
          status: response?.status,
        };
      },
    }),

    // Fetch user addresses
    getAddresses: builder.query({
      query: () => ({
        url: "/api/v1/user/address/all",
        method: "GET",
      }),
      providesTags: ["Addresses"],
      transformResponse: (response) => response,
      transformErrorResponse: (response) => {
        console.log("Addresses Error:", response);
        return {
          message: response?.data?.message || "Error fetching addresses",
          status: response?.status,
        };
      },
    }),

    // Fetch available time slots
    getTimeSlots: builder.query({
      query: () => ({
        url: "/api/v1/user/slots/available",
        method: "GET",
      }),
      transformResponse: (response) => response,
      transformErrorResponse: (response) => {
        console.log("Time Slots Error:", response);
        return {
          message: response?.data?.message || "Error fetching time slots",
          status: response?.status,
        };
      },
    }),

    // Fetch payment methods
    getPaymentMethods: builder.query({
      query: () => ({
        url: "/api/v1/user/payment/methods",
        method: "GET",
      }),
      transformResponse: (response) => response,
      transformErrorResponse: (response) => {
        console.log("Payment Methods Error:", response);
        return {
          message: response?.data?.message || "Error fetching payment methods",
          status: response?.status,
        };
      },
    }),

    // Fetch recommended services
    getRecommendedServices: builder.query({
      query: () => ({
        url: "/api/v1/user/services/recommended",
        method: "GET",
      }),
      transformResponse: (response) => response,
      transformErrorResponse: (response) => {
        console.log("Recommended Services Error:", response);
        return {
          message:
            response?.data?.message || "Error fetching recommended services",
          status: response?.status,
        };
      },
    }),

    // Cart APIs
    addToCartSingleService: builder.mutation({
      query: (data) => ({
        url: "/api/v1/user/Cart/addToCartSingleService",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart"],
      transformResponse: (response) => response,
      transformErrorResponse: (response) => {
        console.log("Add to Cart Error:", response);
        return {
          message: response?.data?.message || "Error adding to cart",
          status: response?.status,
        };
      },
    }),

    updateCartService: builder.mutation({
      query: (data) => ({
        url: "/api/v1/user/Cart/updateCartService",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Cart"],
      transformResponse: (response) => response,
      transformErrorResponse: (response) => {
        console.log("Update Cart Error:", response);
        return {
          message: response?.data?.message || "Error updating cart",
          status: response?.status,
        };
      },
    }),

    removeFromCart: builder.mutation({
      query: (serviceId) => ({
        url: `/api/v1/user/Cart/removeFromCart/${serviceId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
      transformResponse: (response) => response,
      transformErrorResponse: (response) => {
        console.log("Remove from Cart Error:", response);
        return {
          message: response?.data?.message || "Error removing from cart",
          status: response?.status,
        };
      },
    }),

    clearCart: builder.mutation({
      query: () => ({
        url: "/api/v1/user/Cart/clearCart",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
      transformResponse: (response) => response,
      transformErrorResponse: (response) => {
        console.log("Clear Cart Error:", response);
        return {
          message: response?.data?.message || "Error clearing cart",
          status: response?.status,
        };
      },
    }),

    // Add new address
    addNewAddress: builder.mutation({
      query: (addressData) => ({
        url: "/api/v1/user/address/new",
        method: "POST",
        body: addressData,
      }),
      invalidatesTags: ["Addresses"],
      transformResponse: (response) => response,
      transformErrorResponse: (response) => {
        console.log("Add Address Error:", response);
        return {
          message: response?.data?.message || "Error adding address",
          status: response?.status,
        };
      },
    }),
    updateAddress: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/v1/user/address/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Addresses"],
      transformResponse: (response) => response,
      transformErrorResponse: (response) => {
        console.log("Update Address Error:", response);
        return {
          message: response?.data?.message || "Error updating address",
          status: response?.status,
        };
      },
    }),

    // Set user location
    setLocation: builder.mutation({
      query: (data) => ({
        url: "/api/v1/user/setLocation",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart", "Addresses"],
      transformResponse: (response) => response,
      transformErrorResponse: (response) => {
        console.log("Set Location Error:", response);
        return {
          message: response?.data?.message || "Error setting location",
          status: response?.status,
        };
      },
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetAllServicesQuery,
  useGetPackagesByMainCategoryQuery,
  useGetCartQuery,
  useAddToCartSingleServiceMutation,
  useUpdateCartServiceMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
  useAddNewAddressMutation,
  useGetAddressesQuery,
  useGetTimeSlotsQuery,
  useGetPaymentMethodsQuery,
  useGetRecommendedServicesQuery,
  useSetLocationMutation,
  useDeleteAddressMutation,
  useUpdateAddressMutation,
} = productsApi;
