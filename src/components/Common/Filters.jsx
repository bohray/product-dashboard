import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetFilters,
  setCategory,
  setSearch,
  setSort,
} from "../../store/filters/filtersSlice";

const Filters = ({ categories }) => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  const [searchValue, setSearchValue] = useState(filters.search);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearch(searchValue));
    }, 700);
    return () => clearTimeout(timer);
  }, [searchValue, dispatch]);

  const sortCategories = [
    {
      value: "none",
      title: "Sort by",
    },
    {
      value: "lowToHigh",
      title: "Price: Low to High",
    },
    {
      value: "highToLow",
      title: "Price: High to Low",
    },
  ];

  const isDefaultState =
    filters.search === "" &&
    filters.category === "all" &&
    filters.sort === "none";

  const handleReset = () => {
    dispatch(resetFilters());
    setSearchValue("");
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 mb-8 flex flex-col md:flex-row gap-4 md:items-center">
      <input
        type="text"
        placeholder="Search products"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="flex-1 py-2 px-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <select
        value={filters.category}
        onChange={(e) => dispatch(setCategory(e.target.value))}
        className="px-4 py-2 border border-slate-300 rounded-lg"
      >
        <option value="all">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <select
        value={filters.sort}
        onChange={(e) => dispatch(setSort(e.target.value))}
        className="px-4 py-2 border border-slate-300 rounded-lg"
      >
        {sortCategories.map((cat) => (
          <option key={cat.title} value={cat.value}>
            {cat.title}
          </option>
        ))}
      </select>

      {/* Reset Button */}
      <button
        onClick={handleReset}
        disabled={isDefaultState}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition
          ${
            isDefaultState
              ? "bg-slate-100 text-slate-400 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer active:scale-90"
          }`}
      >
        Clear
      </button>
    </div>
  );
};

export default Filters;
