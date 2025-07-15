import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
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
    getCart: builder.query({
      query: () => ({
        url: "/api/v1/user/getCart",
        method: "GET",
      }),
      providesTags: ["Cart"],
      transformResponse: (response) => {
        const { services = [], packages = [], paidAmount, platformFee, taxAmount } = response.data || {};

        const cartItems = [
          ...services.map((item) => ({
            _id: item._id,
            serviceId: item.serviceId._id,
            title: item.serviceId.title,
            price: item.price,
            quantity: item.quantity,
            total: item.total,
            isPackageService: false,
            description: item.serviceId.description,
            images: item.serviceId.images,
          })),
          ...packages.map((item) => ({
            _id: item._id,
            packageId: item.packageId._id,
            title: item.packageId.title,
            price: item.price,
            quantity: item.quantity,
            total: item.total,
            isPackageService: true,
            description: item.packageId.description,
            images: item.packageId.images,
          })),
        ];

        // Attach extra data to the array object itself
        cartItems.paidAmount = paidAmount;
        cartItems.platformFee = platformFee;
        cartItems.taxAmount = taxAmount;

        return cartItems;
      },

      transformErrorResponse: (response) => {
        console.log("Get Cart Error:", response);
        return {
          message: response?.data?.message || "Error fetching cart",
          status: response?.status,
        };
      },
    }),
    addToCartSingleService: builder.mutation({
      query: (data) => ({
        url: "/api/v1/user/Cart/addToCartSingleService",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart"],
      transformResponse: (response) => response,
      transformErrorResponse: (response) => {
        console.log("Add to Cart Single Service Error:", response);
        return {
          message: response?.data?.message || "Error adding service to cart",
          status: response?.status,
        };
      },
    }),
    removeFromCart: builder.mutation({
      query: (data) => ({
        url: "/api/v1/user/Cart/remove-from-cart",
        method: "POST",
        body: {
          serviceId: data.serviceId,
          isPackageService: data.isPackageService,
        },
      }),
      invalidatesTags: ["Cart"],
      transformResponse: (response) => response,
      transformErrorResponse: (response) => {
        console.log("Remove from Cart Error:", response);
        return {
          message: response?.data?.message || "Error removing item from cart",
          status: response?.status,
        };
      },
    }),
    removePackageFromCart: builder.mutation({
      query: (data) => ({
        url: "/api/v1/user/Cart/remove-package-from-cart",
        method: "POST",
        body: {
          packageId: data.packageId,
        },
      }),
      invalidatesTags: ["Cart"],
      transformResponse: (response) => response,
      transformErrorResponse: (response) => {
        console.log("Remove Package from Cart Error:", response);
        return {
          message: response?.data?.message || "Error removing package from cart",
          status: response?.status,
        };
      },
    }),
    updateCartServiceQuantity: builder.mutation({
      query: (data) => ({
        url: "/api/v1/user/Cart/updateQuantity",
        method: "PUT",
        body: data, // ✅ directly passing the whole object

      }),
      invalidatesTags: ["Cart"],
      transformResponse: (response) => response,
      transformErrorResponse: (response) => {
        console.log("Update Cart Service Quantity Error:", response);
        return {
          message: response?.data?.message || "Error updating service quantity",
          status: response?.status,
        };
      },
    }),

    updateCartPackageQuantity: builder.mutation({
      query: (data) => ({
        url: "/api/v1/user/Cart/packages/updateQuantity",
        method: "PUT",
        body: data, // ✅ directly passing the whole object

      }),
      invalidatesTags: ["Cart"],
      transformResponse: (response) => response,
      transformErrorResponse: (response) => {
        console.log("Update Cart Package Quantity Error:", response);
        return {
          message: response?.data?.message || "Error updating service quantity",
          status: response?.status,
        };
      },
    }),
    addToCartPackageNormal: builder.mutation({
      query: (data) => ({
        url: "/api/v1/user/Cart/addToCartPackageNormal",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart"],
      transformResponse: (response) => response,
      transformErrorResponse: (response) => {
        console.log("Add to Cart Package Normal Error:", response);
        return {
          message: response?.data?.message || "Error adding package to cart",
          status: response?.status,
        };
      },
    }),
    addToCartPackageCustomise: builder.mutation({
      query: (data) => ({
        url: "/api/v1/user/Cart/addToCartPackageCustomise",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart"],
      transformResponse: (response) => response,
      transformErrorResponse: (response) => {
        console.log("Add to Cart Package Customise Error:", response);
        return {
          message: response?.data?.message || "Error adding custom package to cart",
          status: response?.status,
        };
      },
    }),
    updateCustomizePackageInCart: builder.mutation({
      query: (data) => ({
        url: "/api/v1/user/updateCustomizePackageInCart",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Cart"],
      transformResponse: (response) => response,
      transformErrorResponse: (response) => {
        console.log("Update Customize Package In Cart Error:", response);
        return {
          message: response?.data?.message || "Error updating custom package",
          status: response?.status,
        };
      },
    }),
    addToCartPackageEdit: builder.mutation({
      query: (data) => ({
        url: "/api/v1/user/Cart/addToCartPackageEdit",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart"],
      transformResponse: (response) => response,
      transformErrorResponse: (response) => {
        console.log("Add to Cart Package Edit Error:", response);
        return {
          message: response?.data?.message || "Error editing package in cart",
          status: response?.status,
        };
      },
    }),
    updateCartPackageEdit: builder.mutation({
      query: (data) => ({
        url: "/api/v1/user/updateCartPackageEdit",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Cart"],
      transformResponse: (response) => response,
      transformErrorResponse: (response) => {
        console.log("Update Cart Package Edit Error:", response);
        return {
          message: response?.data?.message || "Error updating edited package",
          status: response?.status,
        };
      },
    }),
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
    cart: builder.query({
      query: () => ({
        url: "/api/v1/user/getCart",
        method: "GET",
      }),
    }),
    getFrequentlyAddedServices: builder.query({
      query: () => ({
        url: "/api/v1/user/frequently-added-services",
        method: "GET",
      }),
      transformResponse: (response) => response.data || [],
      transformErrorResponse: (response) => {
        console.log("Frequently Added Services Error:", response);
        return {
          message: response?.data?.message || "Error fetching frequently added services",
          status: response?.status,
        };
      },
    }),
    checkout: builder.mutation({
      query: () => ({
        url: "/api/v1/user/Cart/checkout",
        method: "POST",
      }),
      transformResponse: (response) => response,
      transformErrorResponse: (response) => {
        console.log("Checkout Error:", response);
        return {
          message: response?.data?.message || "Error during checkout",
          status: response?.status,
        };
      },
    }),
    // New Place Order API
    placeOrder: builder.mutation({
      query: ({ orderId, body }) => ({
        url: `/api/v1/user/Cart/placeOrder/${orderId}`,
        method: "POST",
        body,
      }),
      transformResponse: (response) => response,
      transformErrorResponse: (response) => {
        console.log("Place Order Error:", response);
        return {
          message: response?.data?.message || "Error placing order",
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
  useAddToCartPackageNormalMutation,
  useAddToCartPackageCustomiseMutation,
  useUpdateCustomizePackageInCartMutation,
  useAddToCartPackageEditMutation,
  useUpdateCartPackageEditMutation,
  useAddToCartSingleServiceMutation,
  useRemoveFromCartMutation,
  useUpdateCartServiceQuantityMutation,
  useLazyCartQuery,
  useRemovePackageFromCartMutation,
  useGetFrequentlyAddedServicesQuery,
  useCheckoutMutation,
  usePlaceOrderMutation,
  useUpdateCartPackageQuantityMutation
} = productsApi;