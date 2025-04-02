// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice.js"; // Example reducer
import bookReducer from "./slices/bookSlice.js";
import authReducer from "./slices/authSlice.js";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "books",
  storage,
  whitelist: ["books"], // only books will be persisted
};

const persistedBookReducer = persistReducer(persistConfig, bookReducer);

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    books: persistedBookReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
