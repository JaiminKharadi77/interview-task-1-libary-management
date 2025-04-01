// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice.js"; // Example reducer
import bookReducer from "./slices/bookSlice.js";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    books: bookReducer,
  },
});
