import AnimateIn from '@/components/animateIn';
import { getPublishedArticles } from '@/lib/supabase/queries/articles';
import { getLanguage } from '@/lib/language.server';
import { getT } from '@/lib/i18n.server';
import Link from 'next/link';
import BlogListingItem from '../blog-listing/BlogListingItem';

export default async function BlogSection() {
  const language = await getLanguage();
  const t = await getT();
  const posts = await getPublishedArticles(3, language);

  return (
    <div className="w-full md:w-7xl md:px-8">
      <AnimateIn className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-4" animation="fade-up">
        <div>
          <h2 className="text-primary font-semibold uppercase">{t.blog.eyebrow}</h2>
          <h3 className="text-2xl md:text-4xl font-bold text-[#2B3437]">{t.blog.title}</h3>
          <p className="text-lg text-[#5A677A] mt-2">{t.blog.subtitle}</p>
        </div>
        <Link
          href="/blog"
          className="shrink-0 text-sm font-semibold text-primary border border-primary rounded-md px-4 py-2 hover:bg-primary hover:text-white hover:scale-105 active:scale-95 transition-all duration-200"
        >
          {t.blog.viewAll}
        </Link>
      </AnimateIn>

      {posts.length === 0 ? (
        <p className="text-center text-secondary mt-16">{t.blog.empty}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-8 md:mt-32">
          {posts.map((post, index) => (
            <BlogListingItem post={post} key={post.id} index={index} noImageLabel={t.blogListing.noImage} />
          ))}
        </div>
      )}
    </div>
  );
}
