import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  // baseQuery: fetchBaseQuery({
  //   baseUrl: "http://localhost:5000/api/auth",
  //   credentials: "include",
  // }),
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_MONGO_URL}/api/auth`,
    credentials: "include",
  }),
  tagTypes: ["auth"],
  endpoints: (builder) => {
    return {
      register: builder.mutation({
        query: (userData) => {
          return {
            url: "/register",
            method: "POST",
            body: userData,
          };
        },
        // transformErrorResponse: error => error.message,

        invalidatesTags: ["auth"],
      }),
      login: builder.mutation({
        query: (userData) => {
          return {
            url: "/login",
            method: "POST",
            body: userData,
          };
        },
        transformResponse: (data) => {
          localStorage.setItem("auth", JSON.stringify(data));
          return {
            name: data.name,
            email: data.email,
            loger: data.loger,
            _id: data._id,
          };
        },
        transformErrorResponse: (error) => error.data,
        invalidatesTags: ["auth"],
      }),
      setotp: builder.mutation({
        query: (userData) => {
          return {
            url: "/otp",
            method: "POST",
            body: userData,
          };
        },
        transformResponse: (data) => data,
        transformErrorResponse: (error) => error.data,
        invalidatesTags: ["auth"],
      }),
      otpVerfy: builder.mutation({
        query: (userData) => {
          return {
            url: "/verify",
            method: "POST",
            body: userData,
          };
        },
        transformResponse: (data) => data.data,
        transformErrorResponse: (error) => error.data,
        invalidatesTags: ["auth"],
      }),
      ResetPass: builder.mutation({
        query: (userData) => {
          return {
            url: "/resetPass",
            method: "POST",
            body: userData,
          };
        },
        transformResponse: (data) => data,
        transformErrorResponse: (error) => error.data,
        invalidatesTags: ["auth"],
      }),
    };
  },
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useSetotpMutation,
  useOtpVerfyMutation,
  useResetPassMutation,
} = authApi;
