export default function BlogPostLoading() {
  return (
    <div className="px-8 py-12 md:py-20">
      <div className="w-full max-w-3xl mx-auto">
        {/* Back + Share row */}
        <div className="flex items-center justify-between mb-8">
          <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
          <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Category pill */}
        <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse mb-4" />

        {/* Title */}
        <div className="mb-2 h-10 w-full bg-gray-200 rounded animate-pulse" />
        <div className="h-10 w-3/4 bg-gray-200 rounded animate-pulse" />

        {/* Share button */}
        <div className="mt-10 pt-8 border-t border-gray-200">
          <div className="h-10 w-36 bg-gray-200 rounded-lg animate-pulse" />
        </div>

        {/* Cover image */}
        <div className="relative w-full h-64 md:h-120 mt-10 rounded-xl bg-gray-200 animate-pulse" />

        {/* Content lines */}
        <div className="mt-10 flex flex-col gap-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="h-4 bg-gray-100 rounded animate-pulse"
              style={{ width: i % 5 === 4 ? '60%' : '100%' }}
            />
          ))}
        </div>

        {/* Author row */}
        <div className="flex items-center gap-4 mt-12 pt-8 border-t border-gray-200">
          <div className="w-12 h-12 rounded-xl bg-gray-200 animate-pulse shrink-0" />
          <div className="flex flex-col gap-2">
            <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
            <div className="h-3 w-40 bg-gray-100 rounded animate-pulse" />
          </div>
        </div>

      </div>
    </div>
  );
}
