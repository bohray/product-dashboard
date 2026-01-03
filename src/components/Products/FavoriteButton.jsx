import { Heart } from "lucide-react";

const FavoriteButton = ({ isFavorite, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer group active:scale-90 w-44 ${
        isFavorite
          ? "bg-pink-100 text-pink-600"
          : "bg-slate-100 text-slate-600 hover:bg-pink-100 hover:text-pink-600"
      }`}
    >
      <Heart
        size={16}
        fill={isFavorite ? "currentColor" : "none"}
        className="group-hover:fill-pink-600 group-hover:text-pink-600"
      />
      {isFavorite ? "Favorited" : "Add to Favorites"}
    </button>
  );
};

export default FavoriteButton;
