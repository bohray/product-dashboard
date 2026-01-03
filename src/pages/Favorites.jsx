import { useSelector } from "react-redux";
import EmptyFavorites from "../components/Favorites/EmptyFavorites";
import ProductCardSkeleton from "../components/Loader/ProductCardSkeleton";
import ProductCard from "../components/Products/ProductCard";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites.items);

  const loading = false;
  return (
    <div className="min-h-screen bg-sky-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-indigo-700 mb-8">
          Your Favorites
        </h1>

        {loading ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <ProductCardSkeleton key={idx} />
            ))}
          </div>
        ) : favorites.length === 0 ? (
          <EmptyFavorites />
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {favorites.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
