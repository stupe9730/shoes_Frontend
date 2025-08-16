import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_MONGO_URL}api/user`,
    credentials: "include",
  }),
  tagTypes: ["product", "cart", "order"],
  endpoints: (builder) => {
    return {
      // getUsers: builder.query({
      //     query: (selecter) => {
      //         console.log(selecter);
      //         return {
      //             url: "/getUserProduct",
      //             method: "GET",
      //             params: selecter
      //         }
      //     },
      //     transformResponse: data => data.result,
      //     providesTags: ["product"]
      // }),
      getUsers: builder.query({
        query: ({ selecter, color, size, price, page, limit }) => {
          console.log(selecter, color, size, price, page, limit);

          return {
            url: "/getUserProduct",
            method: "GET",
            params: { selecter, color, size, price, page, limit }, // Include filters in params
          };
        },
        transformResponse: (data) => ({
          result: data.result,
          totalPages: data.totalPages,
          currentPage: data.currentPage,
        }),
        providesTags: ["product"],
      }),

      getUserCart: builder.query({
        query: (_id) => {
          console.log(_id);
          return {
            url: "/getUserCartProduct",
            method: "GET",
            params: _id,
          };
        },
        transformResponse: (data) => data.result,
        providesTags: ["cart"],
      }),
      addToCart: builder.mutation({
        query: (cartData) => {
          return {
            url: "/addToCart",
            method: "POST",
            body: cartData,
          };
        },
        invalidatesTags: ["cart"],
      }),
      getCart: builder.query({
        query: (cartData) => {
          return {
            url: "/getToCart",
            method: "GET",
            params: cartData,
          };
        },
        transformResponse: (data) => data.combinedData,
        providesTags: ["cart"],
      }),
      removecart: builder.query({
        query: (ProId) => {
          return {
            url: "/removeToCart",
            method: "DELETE",
            body: { ProId },
          };
        },
        invalidatesTags: ["cart"],
      }),

      addOrder: builder.mutation({
        query: (cartData) => {
          console.log(cartData);

          return {
            url: "/addOrder",
            method: "POST",
            body: cartData,
          };
        },
        invalidatesTags: ["order"],
      }),
      getOrder: builder.query({
        query: (cartData) => {
          return {
            url: "/getOrder",
            method: "GET",
            params: cartData,
          };
        },
        transformResponse: (data) => data.combinedData,
        providesTags: ["cart"],
      }),
      RemoveProduct: builder.mutation({
        query: (id) => {
          console.log(id);

          return {
            url: `/removeOrder/${id}`,
            method: "DELETE",
            // params: cartData,
          };
        },
        transformResponse: (data) => data,
        providesTags: ["cart"],
      }),
    };
  },
});

export const {
  useLazyGetUsersQuery,
  useLazyGetUserCartQuery,

  useAddToCartMutation,
  useLazyGetCartQuery,
  useLazyRemovecartQuery,

  useAddOrderMutation,
  useLazyGetOrderQuery,
  useRemoveProductMutation,
} = userApi;
