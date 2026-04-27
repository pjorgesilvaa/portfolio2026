'use client';

import Project from '@/models/project';
import CustomSelect from '@/components/customSelect';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { Translations } from '@/lib/i18n';
import { tr } from '@/lib/i18n';

type SortOrder = 'newest' | 'oldest' | 'a-z' | 'z-a';

interface Props {
  projects: Project[];
  total: number;
  totalPages: number;
  currentPage: number;
  currentSearch: string;
  currentSort: string;
  t: Translations['projectListing'];
}

export default function ProjectListingClient({
  projects,
  total,
  totalPages,
  currentPage,
  currentSearch,
  currentSort,
  t,
}: Props) {
  const router = useRouter();
  const [search, setSearch] = useState(currentSearch);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const SORT_OPTIONS: { value: SortOrder; label: string }[] = [
    { value: 'newest', label: t.sortNewest },
    { value: 'oldest', label: t.sortOldest },
    { value: 'a-z',    label: t.sortAZ },
    { value: 'z-a',    label: t.sortZA },
  ];

  useEffect(() => { setSearch(currentSearch); }, [currentSearch]);

  function navigate(overrides: Partial<{ search: string; sort: string; page: number }>) {
    const params = new URLSearchParams();
    const s       = overrides.search !== undefined ? overrides.search : currentSearch;
    const sortVal = overrides.sort   !== undefined ? overrides.sort   : currentSort;
    const pageVal = overrides.page   !== undefined ? overrides.page   : 1;

    if (s)                               params.set('search', s);
    if (sortVal && sortVal !== 'newest') params.set('sort',   sortVal);
    if (pageVal > 1)                     params.set('page',   String(pageVal));

    router.push(`/projects${params.size ? `?${params}` : ''}`);
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

  const gridKey = `${currentPage}-${currentSearch}-${currentSort}`;

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
      <div className="flex flex-col md:flex-row gap-4 mb-8 hero-animate" style={{ animationDelay: '120ms' }}>
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

      {/* RESULTS INFO */}
      {currentSearch && (
        <p className="text-sm text-secondary mb-6 hero-animate" style={{ animationDelay: '200ms' }}>
          {total === 1
            ? tr(t.resultsSingular, { count: total })
            : tr(t.resultsPlural, { count: total })}
        </p>
      )}

      {/* GRID */}
      {projects.length === 0 ? (
        <div className="text-center py-24 text-secondary hero-animate" style={{ animationDelay: '300ms' }}>
          <p className="text-lg font-semibold">{t.empty}</p>
          <p className="text-sm mt-1">{t.emptyHint}</p>
        </div>
      ) : (
        <div key={gridKey} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group block hero-animate"
              style={{ animationDelay: `${300 + index * 80}ms` }}
            >
              <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full hover:-translate-y-2 hover:shadow-xl transition-all duration-300">

                {/* COVER */}
                <div className="relative overflow-hidden">
                  {project.bannerUrl ? (
                    <img
                      src={project.bannerUrl}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-300">
                      <span className="text-gray-400 text-sm">{t.noImage}</span>
                    </div>
                  )}
                </div>

                {/* BODY */}
                <div className="p-6 flex flex-col gap-3 flex-1">
                  <h3 className="text-lg font-bold text-[#2B3437] line-clamp-2 group-hover:text-primary transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-secondary text-sm line-clamp-3">{project.excerpt}</p>
                  {project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="text-xs font-semibold text-secondary bg-gray-100 rounded-full px-3 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
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
            {t.prev}
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
            {t.next}
          </button>
        </div>
      )}

    </div>
  );
}
