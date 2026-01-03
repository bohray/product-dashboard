import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Rating from "../components/Products/Rating";
import ProductDetailSkeleton from "../components/Loader/ProdcutDetailSkeleton";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "../components/Common/BreadCrumb";
import FavoriteButton from "../components/Products/FavoriteButton";
import { toggleFavorite } from "../store/favorites/favoritesSlice";
import { toast } from "sonner";
import { urls } from "../constants/urls";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const favorites = useSelector((state) => state.favorites.items);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${urls.api.backend}/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err.message);
        toast.error(err.message || "Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  const isFavorite = favorites.some((item) => item.id === product.id);

  return (
    <div className="min-h-screen bg-sky-50">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          {/* Card Header */}
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4">
            <BreadCrumb category={product.category} title={product.title} />
            <FavoriteButton
              isFavorite={isFavorite}
              onToggle={() => dispatch(toggleFavorite(product))}
            />
          </div>

          {/* Card Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-6">
            {/* Image */}
            <div className="h-84 rounded-xl bg-linear-to-br from-sky-50 to-indigo-50 flex items-center justify-center p-6">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-full object-contain"
              />
            </div>

            {/* Details */}
            <div className="flex flex-col h-84 p-2">
              <h1 className="text-2xl font-bold text-slate-800 mb-3">
                {product.title}
              </h1>

              <div className="flex items-center gap-2 mb-4">
                <Rating value={product.rating?.rate || 0} />
                <span className="text-sm text-slate-500">
                  ({product.rating?.count || 0} reviews)
                </span>
              </div>

              <p className="text-2xl font-bold text-indigo-600 mb-4">
                ₹ {product.price}
              </p>

              <div className="text-slate-600 leading-relaxed mb-4 max-h-1/2 overflow-y-auto">
                {product.description}
              </div>

              <p className="inline-block w-fit text-xs font-medium px-3 py-1 mb-3 rounded-full bg-sky-100 text-sky-700">
                {product.category}
              </p>

              <button
                disabled
                className="mt-auto px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium opacity-60 cursor-not-allowed"
              >
                Add to Favorites
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
