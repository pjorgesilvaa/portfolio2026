import { getArticleBySlug, getRelatedPosts } from '@/lib/supabase/queries/articles';
import { getLanguage, getLocale } from '@/lib/language.server';
import { getT } from '@/lib/i18n.server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { LOCALES, LOCALE_TO_HREFLANG, LOCALE_TO_LANG_ATTR, Locale } from '@/lib/language';
import ShareButtons from '@/components/ShareButtons';
import RelatedPosts from '@/components/RelatedPosts';
import ReadingProgress from '@/components/ReadingProgress';
import BlogCodeBlocks from '@/components/BlogCodeBlocks';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://psilvaa.com';

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const language = await getLanguage();
  const post = await getArticleBySlug(slug, language);
  if (!post) return {};

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      images: post.ogImageUrl ? [post.ogImageUrl] : [],
    },
    robots: post.isIndexed && post.status === 'published' ? 'index, follow' : 'noindex, nofollow',
    alternates: {
      canonical: `${BASE_URL}/${locale}/blog/${slug}`,
      languages: Object.fromEntries([
        ...LOCALES.map(l => [LOCALE_TO_HREFLANG[l], `${BASE_URL}/${l}/blog/${slug}`]),
        ['x-default', `${BASE_URL}/en/blog/${slug}`],
      ]),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  const [language, t] = await Promise.all([getLanguage(), getT()]);
  const post = await getArticleBySlug(slug, language);
  if (!post) notFound();
  const relatedPosts = await getRelatedPosts(slug, post.category?.id ?? '', language);

  const dateLocale = LOCALE_TO_LANG_ATTR[locale as Locale] ?? 'en-US';
  const formattedDate = Intl.DateTimeFormat(dateLocale, {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  }).format(new Date(post.publishedAt));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.ogImageUrl || post.coverImageUrl || undefined,
    datePublished: new Date(post.publishedAt).toISOString(),
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
    publisher: {
      '@type': 'Person',
      name: 'Paulo Silva',
      url: BASE_URL,
    },
    url: `${BASE_URL}/${locale}/blog/${slug}`,
  };

  return (
    <div className="px-8 py-12 md:py-20">
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="w-full max-w-3xl mx-auto">
        {/* BACK + SHARE */}
        <div className="hero-animate flex items-center justify-between mb-8" style={{ animationDelay: '0ms' }}>
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:opacity-70 transition-opacity duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t.blogPost.backToJournal}
          </Link>
          <ShareButtons
            url={`${BASE_URL}/${locale}/blog/${slug}`}
            title={post.title}
            postSlug={slug}
            label={t.blogPost.share}
          />
        </div>

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
          <div className="hero-animate relative w-full h-64 md:h-120 mt-10 rounded-xl overflow-hidden shadow-md" style={{ animationDelay: '240ms' }}>
            <Image src={post.coverImageUrl} alt={post.title} fill priority sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
          </div>
        )}

        {/* CONTENT */}
        <div
          className="hero-animate blog-content mt-10 text-secondary"
          style={{ animationDelay: '320ms' }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <BlogCodeBlocks />

        {/* AUTHOR + META */}
        <div className="hero-animate flex items-center gap-4 mt-12 pt-8 border-t border-gray-200" style={{ animationDelay: '400ms' }}>
          {post.author.avatarUrl ? (
            <Image src={post.author.avatarUrl} alt={post.author.name} width={48} height={48} className="rounded-xl object-cover shrink-0 shadow-md" />
          ) : (
            <div className="w-12 h-12 rounded-xl bg-gray-200 shrink-0" />
          )}
          <div className="flex flex-col justify-end items-start">
            <p className="text-primary font-bold mb-0!">{post.author.name}</p>
            <p className="text-secondary text-sm mb-0!">
              {formattedDate}
              {post.readingTimeMinutes > 0 && ` · ${t.blogListing.minRead.replace('{count}', String(post.readingTimeMinutes))}`}
            </p>
          </div>
        </div>

        {/* RELATED POSTS */}
        <RelatedPosts
          posts={relatedPosts}
          locale={locale}
          heading={t.blogPost.relatedPosts}
          minReadLabel={t.blogListing.minRead}
        />
      </div>
    </div>
  );
}
