import BlogListingClient from '@/layout/blog-listing/BlogListingClient';
import { ARTICLES_PER_PAGE, getArticlesWithFilters } from '@/lib/supabase/queries/articles';
import { getCategories } from '@/lib/supabase/queries/categories';
import { getLanguage } from '@/lib/language.server';
import { getT } from '@/lib/i18n.server';

interface Props {
  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string;
    sort?: string;
  }>;
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
