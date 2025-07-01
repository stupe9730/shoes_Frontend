import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./authApi";

const adminSlice = createSlice({
  name: "adminSlice",
  initialState: { auth: JSON.parse(localStorage.getItem("auth")) },
  reducers: {
    logOut: (state, { payload }) => {
      localStorage.removeItem("auth");
      state.auth = null;
    },
  },
  extraReducers: (builder) =>
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.auth = payload;
      }
    ),
  // .addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
  //     state.auth = null
  // })
});

export const { logOut } = adminSlice.actions;
export default adminSlice.reducer;
