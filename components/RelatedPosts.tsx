import Link from 'next/link';
import Image from 'next/image';
import { LOCALE_TO_LANG_ATTR, Locale } from '@/lib/language';
import BlogPost from '@/models/blogPost';

interface Props {
  posts: BlogPost[];
  locale: string;
  heading: string;
  minReadLabel: string;
}

export default function RelatedPosts({ posts, locale, heading, minReadLabel }: Props) {
  if (posts.length === 0) return null;

  const dateLocale = LOCALE_TO_LANG_ATTR[locale as Locale] ?? 'en-US';

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <h2 className="text-lg font-bold text-[#2B3437] mb-6">{heading}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {posts.map(post => (
          <Link
            key={post.id}
            href={`/${locale}/blog/${post.slug}`}
            className="group flex flex-col rounded-xl border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300"
          >
            {/* Cover */}
            {post.coverImageUrl ? (
              <div className="relative h-36 overflow-hidden">
                <Image
                  src={post.coverImageUrl}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ) : (
              <div className="h-36 bg-gray-100 group-hover:bg-gray-200 transition-colors duration-300" />
            )}

            {/* Body */}
            <div className="p-4 flex flex-col gap-1.5 flex-1">
              <p className="text-sm font-bold text-[#2B3437] line-clamp-2 group-hover:text-primary transition-colors duration-200">
                {post.title}
              </p>
              <p className="text-secondary text-xs mt-auto">
                {Intl.DateTimeFormat(dateLocale, { month: 'short', day: '2-digit', year: 'numeric' }).format(new Date(post.publishedAt))}
                {post.readingTimeMinutes > 0 && ` · ${minReadLabel.replace('{count}', String(post.readingTimeMinutes))}`}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
