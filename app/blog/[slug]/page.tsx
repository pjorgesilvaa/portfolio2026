import { getArticleBySlug } from '@/lib/supabase/queries/articles';
import { getLanguage } from '@/lib/language.server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const language = await getLanguage();
  const post = await getArticleBySlug(slug, language);
  if (!post) return {};
  return {
    title: `${post.metaTitle} | Paulo Silva` || `${post.title} | Paulo Silva`,
    description: post.metaDescription || post.excerpt,
    openGraph: {
      title: `${post.metaTitle} | Paulo Silva` || `${post.title} | Paulo Silva`,
      description: post.metaDescription || post.excerpt,
      images: post.ogImageUrl ? [post.ogImageUrl] : [],
    },
    robots: post.isIndexed || post.status !== 'published' ? 'index, follow' : 'noindex, nofollow',
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const language = await getLanguage();
  const post = await getArticleBySlug(slug, language);

  if (!post) notFound();

  const formattedDate = Intl.DateTimeFormat('pt-PT', {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  }).format(post.publishedAt);

  return (
    <div className="px-8 py-12 md:py-20">
      <div className="w-full max-w-3xl mx-auto">
        {/* BACK */}
        <Link
          href="/blog"
          className="hero-animate inline-flex items-center gap-2 text-sm font-semibold text-primary hover:opacity-70 transition-opacity duration-200 mb-8"
          style={{ animationDelay: '0ms' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Journal
        </Link>

        {/* CATEGORY */}
        {post.category?.name && (
          <div className="hero-animate mb-4" style={{ animationDelay: '80ms' }}>
            <span className="inline-block bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">{post.category.name}</span>
          </div>
        )}

        {/* TITLE */}
        <div className="hero-animate" style={{ animationDelay: '160ms' }}>
          <h1 className="text-3xl md:text-5xl font-bold text-[#2B3437] leading-tight">{post.title}</h1>
        </div>

        {/* COVER IMAGE */}
        {post.coverImageUrl && (
          <div className="hero-animate mt-10 rounded-xl overflow-hidden shadow-md" style={{ animationDelay: '240ms' }}>
            <img src={post.coverImageUrl} alt={post.title} className="w-full object-cover max-h-120" />
          </div>
        )}

        {/* CONTENT */}
        <div
          className="hero-animate blog-content mt-10 text-secondary"
          style={{ animationDelay: '320ms' }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* AUTHOR + META */}
        <div className="hero-animate flex items-center gap-4 mt-12 pt-8 border-t border-gray-200" style={{ animationDelay: '400ms' }}>
          {post.author.avatarUrl ? (
            <img src={post.author.avatarUrl} alt={post.author.name} className="w-12 h-12 rounded-xl object-cover shrink-0 shadow-md" />
          ) : (
            <div className="w-12 h-12 rounded-xl bg-gray-200 shrink-0" />
          )}
          <div className="flex flex-col justify-end items-start">
            <p className="text-primary font-bold mb-0!">{post.author.name}</p>
            <p className="text-secondary text-sm mb-0!">
              {formattedDate}
              {post.readingTimeMinutes > 0 && ` · ${post.readingTimeMinutes} min read`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
