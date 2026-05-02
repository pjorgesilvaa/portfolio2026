export default function BlogLoading() {
  return (
    <div className="px-8 py-12 md:py-20">
      <div className="w-full md:max-w-7xl mx-auto">
        {/* Header skeleton */}
        <div className="mb-10">
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-3" />
          <div className="h-10 w-64 bg-gray-200 rounded animate-pulse mb-3" />
          <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Controls skeleton */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="h-11 flex-1 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-11 w-40 bg-gray-200 rounded-lg animate-pulse" />
        </div>

        {/* Category pills skeleton */}
        <div className="flex gap-2 mb-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-8 w-20 bg-gray-200 rounded-full animate-pulse" />
          ))}
        </div>

        {/* Card grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
              {/* Cover */}
              <div className="h-48 bg-gray-200 animate-pulse" />
              {/* Body */}
              <div className="p-6 flex flex-col gap-3 flex-1">
                <div className="h-5 bg-gray-200 rounded animate-pulse" />
                <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-100 rounded animate-pulse mt-1" />
                <div className="h-4 bg-gray-100 rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-gray-100 rounded animate-pulse" />
                <div className="h-px w-full bg-gray-100 mt-auto" />
                <div className="flex items-center gap-3 mt-1">
                  <div className="w-9 h-9 rounded-lg bg-gray-200 animate-pulse shrink-0" />
                  <div className="flex flex-col gap-1.5 flex-1">
                    <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-32 bg-gray-100 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
