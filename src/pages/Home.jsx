import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/products/productsSlice";
import ProductCard from "../components/Products/ProductCard";
import ProductCardSkeleton from "../components/Loader/ProductCardSkeleton";
import { selectFilteredProducts } from "../store/selectors";
import Filters from "../components/Common/Filters";

const Home = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.products);
  const filteredProducts = useSelector(selectFilteredProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const categories = [...new Set(items.map((product) => product.category))];

  return (
    <div className="min-h-screen bg-sky-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-indigo-700 mb-8">
          Explore Products
        </h1>
        <Filters categories={categories} />

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            : filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
