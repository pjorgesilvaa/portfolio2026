export default function ProjectsLoading() {
  return (
    <div className="px-8 py-12 md:py-20">
      <div className="w-full md:max-w-7xl mx-auto">
        {/* Header skeleton */}
        <div className="mb-10">
          <div className="h-4 w-36 bg-gray-200 rounded animate-pulse mb-3" />
          <div className="h-10 w-48 bg-gray-200 rounded animate-pulse mb-3" />
          <div className="h-4 w-44 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Controls skeleton */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="h-11 flex-1 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-11 w-40 bg-gray-200 rounded-lg animate-pulse" />
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
                <div className="h-5 w-4/5 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-100 rounded animate-pulse mt-1" />
                <div className="h-4 w-3/4 bg-gray-100 rounded animate-pulse" />
                <div className="flex gap-2 mt-auto pt-3">
                  <div className="h-6 w-16 bg-gray-100 rounded-full animate-pulse" />
                  <div className="h-6 w-16 bg-gray-100 rounded-full animate-pulse" />
                  <div className="h-6 w-12 bg-gray-100 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
