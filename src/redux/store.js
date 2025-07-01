import { configureStore } from "@reduxjs/toolkit";
import { adminProduct } from "./adminProduct";
import { authApi } from "./authApi";
import adminSlice from "./adminSlice";
import { userApi } from "./userApi";


const reduxStore = configureStore({
    reducer: {
        [adminProduct.reducerPath]: adminProduct.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        user: adminSlice
    },
    middleware: mid => [...mid(), adminProduct.middleware, authApi.middleware, userApi.middleware]
})

export default reduxStore