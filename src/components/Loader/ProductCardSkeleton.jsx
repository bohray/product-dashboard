const ProductCardSkeleton = () => {
  return (
    <div className="relative bg-white rounded-2xl border border-slate-200 overflow-hidden animate-pulse">
      {/* ❤️ Favorite button skeleton */}
      <div className="absolute top-3 left-3 z-10 h-9 w-9 rounded-full bg-pink-100" />

      {/* Image skeleton */}
      <div className="h-48 bg-linear-to-br from-sky-100 to-indigo-100" />

      {/* Content skeleton */}
      <div className="p-4 flex flex-col h-40">
        {/* Title */}
        <div className="h-4 bg-slate-200 rounded w-3/4 mb-2" />
        <div className="h-4 bg-slate-200 rounded w-1/2 mb-3" />

        {/* Rating */}
        <div className="flex gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 w-4 bg-slate-200 rounded" />
          ))}
        </div>

        {/* Price button */}
        <div className=" mt-auto text-md font-bold bg-sky-100 text-sky-700 p-2 text-center rounded-lg h-10" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
