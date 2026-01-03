import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./products/productsSlice";
import favoritesReducer from "./favorites/favoritesSlice";
import filtersReducer from "./filters/filtersSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    favorites: favoritesReducer,
    filters: filtersReducer,
  },
});
