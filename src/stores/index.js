import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import cateSlice from "./slice/categoriesSlice";
import taskSlice from "./slice/taskSlice";
import filterSlice from "./slice/searchSlice";
export const store = configureStore({
    reducer: {
      auth:authSlice.reducer,
      categories:cateSlice.reducer,
      taskSlice:taskSlice.reducer,
      filterSlice:filterSlice.reducer
    },
  })