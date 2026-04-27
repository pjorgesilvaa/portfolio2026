'use client';

import BlogPost from '@/models/blogPost';
import { CategoryOption } from '@/lib/supabase/queries/categories';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

type SortOrder = 'newest' | 'oldest' | 'shortest' | 'longest';

const SORT_OPTIONS: { value: SortOrder; label: string }[] = [
  { value: 'newest',   label: 'Newest first' },
  { value: 'oldest',   label: 'Oldest first' },
  { value: 'shortest', label: 'Shortest read' },
  { value: 'longest',  label: 'Longest read' },
];

interface Props {
  posts: BlogPost[];
  categories: CategoryOption[];
  total: number;
  totalPages: number;
  currentPage: number;
  currentSearch: string;
  currentCategory: string;
  currentSort: string;
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
}: Props) {
  const router = useRouter();
  const [search, setSearch] = useState(currentSearch);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { setSearch(currentSearch); }, [currentSearch]);

  function navigate(overrides: Partial<{ search: string; category: string; sort: string; page: number }>) {
    const params = new URLSearchParams();
    const s       = overrides.search   !== undefined ? overrides.search   : currentSearch;
    const cat     = overrides.category !== undefined ? overrides.category : currentCategory;
    const sortVal = overrides.sort     !== undefined ? overrides.sort     : currentSort;
    const pageVal = overrides.page     !== undefined ? overrides.page     : 1;

    if (s)                              params.set('search',   s);
    if (cat)                            params.set('category', cat);
    if (sortVal && sortVal !== 'newest') params.set('sort',    sortVal);
    if (pageVal > 1)                    params.set('page',     String(pageVal));

    router.push(`/blog${params.size ? `?${params}` : ''}`);
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
        <h2 className="text-primary font-semibold uppercase tracking-wide">Insights & Perspectives</h2>
        <h1 className="text-3xl md:text-5xl font-bold text-[#2B3437] mt-1">The Curated Journal</h1>
        <p className="text-[#5A677A] mt-3">{total} {total === 1 ? 'article' : 'articles'} published</p>
      </div>

      {/* CONTROLS */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 hero-animate" style={{ animationDelay: '120ms' }}>
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={e => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white border border-gray-200 text-[#2B3437] placeholder-gray-400 outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
          />
        </div>
        <div className="relative w-full md:w-auto">
          <select
            value={currentSort}
            onChange={e => navigate({ sort: e.target.value, page: 1 })}
            style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}
            className="w-full pl-4 pr-10 py-2.5 rounded-lg bg-white border border-gray-200 text-[#2B3437] outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 cursor-pointer"
          >
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <svg className="w-4 h-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* CATEGORY PILLS */}
      {categories.length > 0 && (
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1 hero-animate [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" style={{ animationDelay: '220ms' }}>
          <button
            onClick={() => navigate({ category: '', page: 1 })}
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95 ${
              !currentCategory
                ? 'bg-primary text-white'
                : 'bg-white text-[#3F555D] border border-gray-200 hover:border-primary hover:text-primary'
            }`}
          >
            All
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
          {total} {total === 1 ? 'result' : 'results'} found
        </p>
      )}

      {/* GRID — key changes on every fetch so cards re-animate */}
      {posts.length === 0 ? (
        <div className="text-center py-24 text-secondary hero-animate" style={{ animationDelay: '300ms' }}>
          <p className="text-lg font-semibold">No articles found</p>
          <p className="text-sm mt-1">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div key={gridKey} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Link
              key={post.id}
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
                      <span className="text-gray-400 text-sm">No cover image</span>
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
                      <img src={post.author.avatarUrl} alt={post.author.name}
                        className="w-9 h-9 rounded-lg object-cover shrink-0" />
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
            ← Prev
          </button>

          {getPageNumbers().map((p, i) =>
            p === '…' ? (
              <span key={`ellipsis-${i}`} className="px-2 text-gray-400 select-none">…</span>
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
            )
          )}

          <button
            onClick={() => navigate({ page: currentPage + 1 })}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-semibold text-[#3F555D] hover:border-primary hover:text-primary hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
          >
            Next →
          </button>
        </div>
      )}

    </div>
  );
}
