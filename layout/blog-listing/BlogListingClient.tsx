'use client';

import BlogPost from '@/models/blogPost';
import { CategoryOption } from '@/lib/supabase/queries/categories';
import CustomSelect from '@/components/customSelect';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import BlogListingItem from './BlogListingItem';
import type { Translations } from '@/lib/i18n';
import { tr } from '@/lib/i18n';

type SortOrder = 'newest' | 'oldest' | 'shortest' | 'longest';

interface Props {
  posts: BlogPost[];
  categories: CategoryOption[];
  total: number;
  totalPages: number;
  currentPage: number;
  currentSearch: string;
  currentCategory: string;
  currentSort: string;
  t: Translations['blogListing'];
}

export default function BlogListingClient({
  posts,
  categories,
  total,
  totalPages,
  currentPage,
  currentSearch,
  currentCategory,
  currentSort,
  t,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] ?? 'en';
  const [search, setSearch] = useState(currentSearch);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const SORT_OPTIONS: { value: SortOrder; label: string }[] = [
    { value: 'newest',   label: t.sortNewest },
    { value: 'oldest',   label: t.sortOldest },
    { value: 'shortest', label: t.sortShortest },
    { value: 'longest',  label: t.sortLongest },
  ];

  useEffect(() => {
    setSearch(currentSearch);
  }, [currentSearch]);

  function navigate(overrides: Partial<{ search: string; category: string; sort: string; page: number }>) {
    const params = new URLSearchParams();
    const s = overrides.search !== undefined ? overrides.search : currentSearch;
    const cat = overrides.category !== undefined ? overrides.category : currentCategory;
    const sortVal = overrides.sort !== undefined ? overrides.sort : currentSort;
    const pageVal = overrides.page !== undefined ? overrides.page : 1;

    if (s) params.set('search', s);
    if (cat) params.set('category', cat);
    if (sortVal && sortVal !== 'newest') params.set('sort', sortVal);
    if (pageVal > 1) params.set('page', String(pageVal));

    router.push(`/${locale}/blog${params.size ? `?${params}` : ''}`);
  }

  function handleSearchChange(value: string) {
    setSearch(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => navigate({ search: value, page: 1 }), 400);
  }

  function getPageNumbers(): (number | '…')[] {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | '…')[] = [1];
    if (currentPage > 3) pages.push('…');
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push('…');
    pages.push(totalPages);
    return pages;
  }

  // Changes whenever posts change — forces card re-animation
  const gridKey = `${currentPage}-${currentSearch}-${currentCategory}-${currentSort}`;

  return (
    <div className="w-full md:max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="mb-10 hero-animate" style={{ animationDelay: '0ms' }}>
        <h2 className="text-primary font-semibold uppercase tracking-wide">{t.eyebrow}</h2>
        <h1 className="text-3xl md:text-5xl font-bold text-[#2B3437] mt-1">{t.title}</h1>
        <p className="text-[#5A677A] mt-3">
          {total === 1
            ? tr(t.countSingular, { count: total })
            : tr(t.countPlural, { count: total })}
        </p>
      </div>

      {/* CONTROLS */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 hero-animate" style={{ animationDelay: '120ms' }}>
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={search}
            onChange={e => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white border border-gray-200 text-[#2B3437] placeholder-gray-400 outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
          />
        </div>
        <CustomSelect
          value={currentSort as SortOrder}
          options={SORT_OPTIONS}
          onChange={val => navigate({ sort: val, page: 1 })}
        />
      </div>

      {/* CATEGORY PILLS */}
      {categories.length > 0 && (
        <div
          className="flex gap-2 mb-8 px-px py-4 overflow-x-auto pb-1 hero-animate [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ animationDelay: '220ms' }}
        >
          <button
            onClick={() => navigate({ category: '', page: 1 })}
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95 ${
              !currentCategory
                ? 'bg-primary text-white'
                : 'bg-white text-[#3F555D] border border-gray-200 hover:border-primary hover:text-primary'
            }`}
          >
            {t.categoryAll}
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => navigate({ category: cat.id === currentCategory ? '' : cat.id, page: 1 })}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95 ${
                currentCategory === cat.id
                  ? 'bg-primary text-white'
                  : 'bg-white text-[#3F555D] border border-gray-200 hover:border-primary hover:text-primary'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      {/* RESULTS INFO */}
      {(currentSearch || currentCategory) && (
        <p className="text-sm text-secondary mb-6 hero-animate" style={{ animationDelay: '280ms' }}>
          {total === 1
            ? tr(t.resultsSingular, { count: total })
            : tr(t.resultsPlural, { count: total })}
        </p>
      )}

      {/* GRID — key changes on every fetch so cards re-animate */}
      {posts.length === 0 ? (
        <div className="text-center py-24 text-secondary hero-animate" style={{ animationDelay: '300ms' }}>
          <p className="text-lg font-semibold">{t.empty}</p>
          <p className="text-sm mt-1">{t.emptyHint}</p>
        </div>
      ) : (
        <div key={gridKey} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <BlogListingItem post={post} key={post.id} index={index} locale={locale} noImageLabel={t.noImage} minReadLabel={t.minRead} />
          ))}
        </div>
      )}

      {/* PAGINATION */}
      {totalPages >= 1 && (
        <div className="flex items-center justify-center gap-2 mt-16 hero-animate" style={{ animationDelay: '400ms' }}>
          <button
            onClick={() => navigate({ page: currentPage - 1 })}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-semibold text-[#3F555D] hover:border-primary hover:text-primary hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
          >
            {t.prev}
          </button>

          {getPageNumbers().map((p, i) =>
            p === '…' ? (
              <span key={`ellipsis-${i}`} className="px-2 text-gray-400 select-none">
                …
              </span>
            ) : (
              <button
                key={p}
                onClick={() => navigate({ page: p as number })}
                className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95 ${
                  currentPage === p
                    ? 'bg-primary text-white'
                    : 'border border-gray-200 text-[#3F555D] hover:border-primary hover:text-primary'
                }`}
              >
                {p}
              </button>
            ),
          )}

          <button
            onClick={() => navigate({ page: currentPage + 1 })}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-semibold text-[#3F555D] hover:border-primary hover:text-primary hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
          >
            {t.next}
          </button>
        </div>
      )}
    </div>
  );
}
