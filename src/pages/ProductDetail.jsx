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

const eventStyles = {
  PAYMENT_SUCCESS: {
    container: "border-emerald-200 bg-emerald-50",
    text: "text-emerald-700",
  },
  PAYMENT_ERROR: {
    container: "border-red-200 bg-red-50",
    text: "text-red-700",
  },
  CHECKOUT_CLOSE: {
    container: "border-slate-200 bg-slate-50",
    text: "text-slate-700",
  },
};

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkoutEvents, setCheckoutEvents] = useState([]);

  const favorites = useSelector((state) => state.favorites.items);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${urls.api.backend}/${id}`);

        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }

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

  const addCheckoutEvent = (type, data = {}) => {
    setCheckoutEvents((prev) => [
      {
        id: Date.now(),
        type,
        data,
        time: new Date().toLocaleTimeString(),
      },
      ...prev,
    ]);
  };

  const handleBuyNow = () => {
    window.CheckoutSDK.open({
      productId: id,

      onSuccess: (data) => {
        console.log("PAYMENT SUCCESS:", data);
        addCheckoutEvent("PAYMENT_SUCCESS", data);
      },

      onClose: (data) => {
        console.log("CHECKOUT CLOSED:", data);
        addCheckoutEvent("CHECKOUT_CLOSE", data);
      },

      onError: (error) => {
        console.log("PAYMENT ERROR:", error);
        addCheckoutEvent("PAYMENT_ERROR", error);
      },
    });
  };

  return (
    <div className="min-h-screen bg-sky-50">
      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* Product Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {/* Card Header */}
          <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-6 py-4">
            <BreadCrumb category={product.category} title={product.title} />

            <FavoriteButton
              isFavorite={isFavorite}
              onToggle={() => dispatch(toggleFavorite(product))}
            />
          </div>

          {/* Card Content */}
          <div className="grid grid-cols-1 gap-10 p-6 md:grid-cols-2">
            {/* Image */}
            <div className="flex h-84 items-center justify-center rounded-xl bg-linear-to-br from-sky-50 to-indigo-50 p-6">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Details */}
            <div className="flex min-h-84 flex-col p-2">
              <h1 className="mb-3 text-2xl font-bold text-slate-800">
                {product.title}
              </h1>

              <div className="mb-4 flex items-center gap-2">
                <Rating value={product.rating?.rate || 0} />

                <span className="text-sm text-slate-500">
                  ({product.rating?.count || 0} reviews)
                </span>
              </div>

              <p className="mb-4 text-2xl font-bold text-indigo-600">
                $ {product.price}
              </p>

              {/* Description */}
              <div className="mb-4 text-slate-600 leading-relaxed">
                {product.description}
              </div>

              {/* Category */}
              <p className="mb-3 inline-block w-fit rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
                {product.category}
              </p>

              {/* Buy Now */}
              <button
                type="button"
                onClick={handleBuyNow}
                className="mt-auto w-full cursor-pointer rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white transition-all duration-200 ease-in-out hover:bg-indigo-700 active:scale-[0.98]"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Checkout Event Log */}
        {checkoutEvents.length > 0 && (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-slate-800">
                  Checkout Events
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Callback events received from the checkout SDK.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setCheckoutEvents([])}
                className="cursor-pointer text-sm text-slate-500 transition-colors hover:text-slate-900"
              >
                Clear
              </button>
            </div>

            {/* Events */}
            <div className="space-y-2">
              {checkoutEvents.map((event) => {
                const style =
                  eventStyles[event.type] ?? eventStyles.CHECKOUT_CLOSE;

                return (
                  <div
                    key={event.id}
                    className={`rounded-lg border px-4 py-3 ${style.container}`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span
                        className={`font-mono text-sm font-medium ${style.text}`}
                      >
                        {event.type}
                      </span>

                      <span className="text-xs text-slate-400">
                        {event.time}
                      </span>
                    </div>

                    <pre className="mt-2 overflow-x-auto text-xs text-slate-500">
                      {JSON.stringify(event.data, null, 2)}
                    </pre>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
