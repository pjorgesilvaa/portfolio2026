import AnimateIn from '@/components/animateIn';
import { getPublishedArticles } from '@/lib/supabase/queries/articles';
import Link from 'next/link';

export default async function BlogSection() {
  const posts = await getPublishedArticles(3);

  return (
    <div className="w-full md:w-7xl md:px-8">
      <AnimateIn className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-4" animation="fade-up">
        <div>
          <h2 className="text-primary font-semibold uppercase">Insights & Perspectives</h2>
          <h3 className="text-2xl md:text-4xl font-bold text-[#2B3437]">The Curated Journal</h3>
          <p className="text-lg text-[#5A677A] mt-2">Explore my latest thoughts and insights on design, technology, and business.</p>
        </div>
        <Link
          href="/blog"
          className="shrink-0 text-sm font-semibold text-primary border border-primary rounded-md px-4 py-2 hover:bg-primary hover:text-white hover:scale-105 active:scale-95 transition-all duration-200"
        >
          View all posts →
        </Link>
      </AnimateIn>

      {posts.length === 0 ? (
        <p className="text-center text-secondary mt-16">No articles published yet. Check back soon.</p>
      ) : (
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 md:gap-16 mt-8 md:mt-32">
          {posts.map((post, index) => (
            <AnimateIn key={post.id} animation="fade-up" delay={index * 100} className="w-full">
              <Link href={`/blog/${post.slug}`} className="block h-full">
              <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col justify-between items-start gap-8 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 h-full cursor-pointer">
                <div className="relative w-full">
                  {post.coverImageUrl ? (
                    <img src={post.coverImageUrl} alt={post.title} className="w-full h-48 object-cover" />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">No cover image</span>
                    </div>
                  )}
                  {post.category?.name && (
                    <span className="absolute top-3 left-3 z-10 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {post.category.name}
                    </span>
                  )}
                </div>
                <div className="p-8 pt-0 flex flex-col justify-between items-start gap-2 flex-1 w-full">
                  <div>
                    <h4 className="text-xl font-bold text-[#2B3437] line-clamp-2 w-full">{post.title}</h4>
                    <p className="text-secondary line-clamp-3 w-full">{post.excerpt}</p>
                  </div>
                  <div className='w-full'>
                    <div className="h-px w-full bg-gray-200 mt-2 mb-5" />
                    <div className="w-full flex gap-4 md:gap-8 items-center">
                      {post.author.avatarUrl ? (
                        <img
                          src={post.author.avatarUrl}
                          alt={post.author.name}
                          className="aspect-square h-8 md:h-12 rounded-lg shrink-0 shadow-2xl object-cover"
                        />
                      ) : (
                        <div className="aspect-square h-8 md:h-12 rounded-lg shrink-0 bg-gray-200" />
                      )}
                      <div>
                        <p className="text-primary text-base md:text-lg font-bold">{post.author.name}</p>
                        <p className="text-secondary text-sm font-semibold">
                          {post.publishedAt
                            ? Intl.DateTimeFormat('pt-PT', {
                                month: 'short',
                                day: '2-digit',
                                year: 'numeric',
                              }).format(post.publishedAt)
                            : '—'}
                          {post.readingTimeMinutes > 0 && ` · ${post.readingTimeMinutes} min read`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </Link>
            </AnimateIn>
          ))}
        </div>
      )}
    </div>
  );
}
