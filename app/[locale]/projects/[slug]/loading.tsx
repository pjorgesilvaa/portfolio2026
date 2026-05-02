export default function ProjectPostLoading() {
  return (
    <div className="px-8 py-12 md:py-20">
      <div className="w-full max-w-3xl mx-auto">
        {/* Back + Share row */}
        <div className="flex items-center justify-between mb-8">
          <div className="h-5 w-36 bg-gray-200 rounded animate-pulse" />
          <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Title */}
        <div className="h-10 w-full bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-10 w-2/3 bg-gray-200 rounded animate-pulse" />

        {/* Action buttons (GitHub / Live) */}
        <div className="flex gap-3 mt-6">
          <div className="h-9 w-36 bg-gray-200 rounded-md animate-pulse" />
          <div className="h-9 w-28 bg-gray-200 rounded-md animate-pulse" />
        </div>

        {/* Banner image */}
        <div className="relative w-full h-64 md:h-120 mt-10 rounded-xl bg-gray-200 animate-pulse" />

        {/* Content lines */}
        <div className="mt-10 flex flex-col gap-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="h-4 bg-gray-100 rounded animate-pulse"
              style={{ width: i % 5 === 4 ? '55%' : '100%' }}
            />
          ))}
        </div>

        {/* Tags + date */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col gap-4">
          <div className="flex gap-2 flex-wrap">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-6 w-16 bg-gray-100 rounded-full animate-pulse" />
            ))}
          </div>
          <div className="h-4 w-32 bg-gray-100 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
