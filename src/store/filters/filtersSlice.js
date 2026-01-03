import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    search: "",
    category: "all",
    sort: "none", //none | lowToHigh | highToLow
  },
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    resetFilters(state) {
      state.search = "";
      state.category = "all";
      state.sort = "none";
    },
  },
});

export const { setSearch, setCategory, setSort, resetFilters } =
  filtersSlice.actions;

export default filtersSlice.reducer;
