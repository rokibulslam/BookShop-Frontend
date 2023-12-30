import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./APIs/authApi";
import { bookApi } from "./APIs/bookApi";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [bookApi.reducerPath]:bookApi.reducer
  },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
      authApi.middleware, bookApi.middleware
  ])
});

export default store;
