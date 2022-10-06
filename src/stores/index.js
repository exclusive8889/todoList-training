import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import cateSlice from "./slice/categoriesSlice";
import taskSlice from "./slice/taskSlice";
import filterSlice from "./slice/searchSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "accessToken",
  storage,
  whitelist: ["auth"],
};

const reducer = combineReducers({
  auth: authSlice.reducer,
  categories: cateSlice.reducer,
  taskSlice: taskSlice.reducer,
  filterSlice: filterSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persist = persistStore(store);
