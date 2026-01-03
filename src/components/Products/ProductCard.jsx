import React from "react";
import { Link } from "react-router-dom";
import { urls } from "../../constants/urls";
import Rating from "./Rating";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../store/favorites/favoritesSlice";
import { Heart } from "lucide-react";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.favorites.items);

  const isFavourite = favorites.some((item) => item.id === product.id);

  const handleFavouriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite(product));
  };
  return (
    <Link
      to={urls.product + product.id}
      className="relative group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
    >
      <button
        className={`absolute top-3 left-3 z-10 p-2 rounded-full transition cursor-pointer ${
          isFavourite
            ? "bg-pink-100 text-pink-600"
            : "bg-white/90 text-slate-500 hover:text-pink-600 hover:bg-pink-100"
        }`}
        onClick={handleFavouriteClick}
        aria-label="Favorite"
      >
        <Heart
          size={18}
          fill={isFavourite ? "currentColor" : "none"}
          className="transition-colors"
        />
      </button>
      {/* Image */}
      <div className="relative h-48 bg-linear-to-br from-sky-50 to-indigo-50 flex items-center justify-center p-4">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="h-full object-contain group-hover:scale-110 transition-transform duration-200"
        />
      </div>

      <div className="p-4 flex flex-col h-40">
        {/* Title */}
        <h2 className="text-sm font-semibold text-slate-800 line-clamp-2 mb-2">
          {product.title}
        </h2>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <Rating value={product.rating?.rate || 0} />
          <span className="text-xs text-slate-500">
            ({product.rating?.count || 0})
          </span>
        </div>

        {/* Push price & CTA to bottom */}
        <div className=" mt-auto text-md font-bold bg-sky-100 text-sky-700 p-2 text-center rounded-lg">
          ₹ {product.price}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
