const ProductDetailSkeleton = () => {
  return (
    <div className="min-h-screen bg-sky-50">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden animate-pulse">
          {/* Header skeleton */}
          <div className="px-6 py-4 border-b border-slate-200 flex justify-between">
            <div className="h-4 w-48 bg-slate-200 rounded" />
            <div className="h-9 w-36 bg-slate-200 rounded-lg" />
          </div>

          {/* Content skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-6">
            {/* Image skeleton */}
            <div className="h-84 rounded-xl bg-linear-to-br from-sky-100 to-indigo-100" />

            {/* Details skeleton */}
            <div className="flex flex-col h-84">
              <div className="h-6 bg-slate-200 rounded w-3/4 mb-3" />
              <div className="h-4 bg-slate-200 rounded w-1/2 mb-4" />

              <div className="h-6 bg-indigo-200 rounded w-1/3 mb-4" />

              <div className="space-y-2 mb-4">
                <div className="h-4 bg-slate-200 rounded w-full" />
                <div className="h-4 bg-slate-200 rounded w-full" />
                <div className="h-4 bg-slate-200 rounded w-4/5" />
              </div>

              <div className="h-6 bg-sky-200 rounded-full w-24 mb-6" />

              <div className="mt-auto h-12 bg-indigo-300 rounded-xl w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
