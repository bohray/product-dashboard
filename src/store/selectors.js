import { createSelector } from "@reduxjs/toolkit";

export const selectProducts = (state) => state.products.items;
export const selectFilters = (state) => state.filters;

export const selectFilteredProducts = createSelector(
  [selectProducts, selectFilters],
  (products, filters) => {
    let result = [...products];

    if (filters.search) {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.category !== "all") {
      result = result.filter(
        (product) => product.category === filters.category
      );
    }

    if (filters.sort === "lowToHigh") result.sort((a, b) => a.price - b.price);
    else if (filters.sort === "highToLow")
      result.sort((a, b) => b.price - a.price);

    return result;
  }
);
