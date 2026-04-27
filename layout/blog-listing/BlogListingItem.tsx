import Link from 'next/link';

export default function BlogListingItem({
  post,
  index,
  noImageLabel = 'No cover image',
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post: any;
  index: number;
  noImageLabel?: string;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block hero-animate"
      style={{ animationDelay: `${300 + index * 80}ms` }}
    >
      <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
        {/* COVER */}
        <div className="relative overflow-hidden">
          {post.coverImageUrl ? (
            <img
              src={post.coverImageUrl}
              alt={post.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-48 bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-300">
              <span className="text-gray-400 text-sm">{noImageLabel}</span>
            </div>
          )}
          {post.category?.name && (
            <span className="absolute top-3 left-3 z-10 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
              {post.category.name}
            </span>
          )}
        </div>

        {/* BODY */}
        <div className="p-6 flex flex-col gap-3 flex-1">
          <h3 className="text-lg font-bold text-[#2B3437] line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {post.title}
          </h3>
          <p className="text-secondary text-sm line-clamp-3 flex-1">{post.excerpt}</p>
          <div className="h-px w-full bg-gray-100 mt-1" />
          <div className="flex items-center gap-3">
            {post.author.avatarUrl ? (
              <img src={post.author.avatarUrl} alt={post.author.name} className="w-9 h-9 rounded-lg object-cover shrink-0" />
            ) : (
              <div className="w-9 h-9 rounded-lg bg-gray-200 shrink-0" />
            )}
            <div>
              <p className="text-primary text-sm font-bold">{post.author.name}</p>
              <p className="text-secondary text-xs">
                {Intl.DateTimeFormat('pt-PT', { month: 'short', day: '2-digit', year: 'numeric' }).format(post.publishedAt)}
                {post.readingTimeMinutes > 0 && ` · ${post.readingTimeMinutes} min read`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
