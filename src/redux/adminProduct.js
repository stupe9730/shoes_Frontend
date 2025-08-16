import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminProduct = createApi({
  reducerPath: "Product",
  //   baseQuery: fetchBaseQuery({
  //     baseUrl: "http://localhost:5000/api/admin",
  //     credentials: "include",
  //   }),
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_MONGO_URL}api/admin`,
    credentials: "include",
  }),
  tagTypes: ["products"],
  endpoints: (builder) => {
    return {
      getAdminProduct: builder.query({
        query: (selecter) => {
          console.log(selecter);
          return {
            url: "/getproduct",
            method: "GET",
            params: selecter,
          };
        },
        transformResponse: (data) => data.result,
        providesTags: ["products"],
      }),
      addAdminProduct: builder.mutation({
        query: (proData) => {
          console.log(proData);
          return {
            url: "/addproduct",
            method: "POST",
            body: proData,
          };
        },
        invalidatesTags: ["products"],
      }),
      updateAdminProduct: builder.mutation({
        query: (proData) => {
          console.log(proData);

          return {
            url: `/updateproduct/${proData._id}`,
            method: "PUT",
            body: proData,
          };
        },
        invalidatesTags: ["products"],
      }),
      deleteAdminProduct: builder.mutation({
        query: (proData) => {
          return {
            url: `/deleteproduct/${proData._id}`,
            method: "DELETE",
            // body: proData
          };
        },
        invalidatesTags: ["products"],
      }),
    };
  },
});

export const {
  useAddAdminProductMutation,
  useLazyGetAdminProductQuery,
  useUpdateAdminProductMutation,
  useDeleteAdminProductMutation,
} = adminProduct;
