'use client';

import Link from 'next/link';
import Image from 'next/image';
import { trackEvent } from '@/lib/analytics';
import { LOCALE_TO_LANG_ATTR, Locale } from '@/lib/language';

export default function BlogListingItem({
  post,
  index,
  locale,
  noImageLabel = 'No cover image',
  minReadLabel = '{count} min read',
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post: any;
  index: number;
  locale: string;
  noImageLabel?: string;
  minReadLabel?: string;
}) {
  return (
    <Link
      href={`/${locale}/blog/${post.slug}`}
      className="group block hero-animate"
      style={{ animationDelay: `${300 + index * 80}ms` }}
      onClick={() => trackEvent({ event: 'blog_post_click', post_title: post.title, post_slug: post.slug })}
    >
      <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
        {/* COVER */}
        <div className="relative h-48 overflow-hidden">
          {post.coverImageUrl ? (
            <Image
              src={post.coverImageUrl}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
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
              <Image src={post.author.avatarUrl} alt={post.author.name} width={36} height={36} className="rounded-lg object-cover shrink-0" />
            ) : (
              <div className="w-9 h-9 rounded-lg bg-gray-200 shrink-0" />
            )}
            <div>
              <p className="text-primary text-sm font-bold">{post.author.name}</p>
              <p className="text-secondary text-xs">
                {Intl.DateTimeFormat(LOCALE_TO_LANG_ATTR[locale as Locale] ?? 'en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(new Date(post.publishedAt))}
                {post.readingTimeMinutes > 0 && ` · ${minReadLabel.replace('{count}', String(post.readingTimeMinutes))}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
