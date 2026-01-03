import { Link } from "react-router-dom";
import { urls } from "../../constants/urls";

const EmptyFavorites = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20">
      <div className="text-5xl mb-4">💙</div>
      <h2 className="text-xl font-semibold text-slate-700 mb-2">
        No favorites yet
      </h2>

      <p className="text-slate-500 mb-6">
        Browse products and add them to your favorites.
      </p>
      <Link
        to={urls.products}
        className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
      >
        Explore Products
      </Link>
    </div>
  );
};

export default EmptyFavorites;

