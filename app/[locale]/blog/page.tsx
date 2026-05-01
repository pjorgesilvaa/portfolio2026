import BlogListingClient from '@/layout/blog-listing/BlogListingClient';
import { ARTICLES_PER_PAGE, getArticlesWithFilters } from '@/lib/supabase/queries/articles';
import { getCategories } from '@/lib/supabase/queries/categories';
import { getLanguage } from '@/lib/language.server';
import { getT } from '@/lib/i18n.server';
import { Metadata } from 'next';
import { LOCALES, LOCALE_TO_HREFLANG } from '@/lib/language';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://paulosilva.com';

interface Props {
  params?: Promise<{ locale: string }>;
  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string;
    sort?: string;
  }>;
}

export async function generateMetadata({ params }: { params?: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = (await params)?.locale ?? 'en';

  const languages: Record<string, string> = { 'x-default': `${BASE_URL}/en/blog` };
  for (const l of LOCALES) {
    languages[LOCALE_TO_HREFLANG[l]] = `${BASE_URL}/${l}/blog`;
  }

  return {
    title: 'Journal',
    description: 'Thoughts and articles on software engineering, architecture, and technology.',
    alternates: {
      canonical: `${BASE_URL}/${locale}/blog`,
      languages,
    },
  };
}

export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams;

  const page       = Math.max(1, Number(params.page ?? 1));
  const search     = params.search ?? '';
  const categoryId = params.category ?? '';
  const sort       = params.sort ?? 'newest';

  const [language, t] = await Promise.all([getLanguage(), getT()]);
  const categories = await getCategories(language);

  const { posts, total } = await getArticlesWithFilters({ page, search, categoryId, sort, language });
  const totalPages = Math.ceil(total / ARTICLES_PER_PAGE);

  return (
    <div className="px-8 py-12 md:py-20">
      <BlogListingClient
        posts={posts}
        categories={categories}
        total={total}
        totalPages={totalPages}
        currentPage={page}
        currentSearch={search}
        currentCategory={categoryId}
        currentSort={sort}
        t={t.blogListing}
      />
    </div>
  );
}
