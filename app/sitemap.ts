import { MetadataRoute } from 'next';
import { getPublishedArticles } from '@/lib/supabase/queries/articles';
import { getProjectsWithFilters, PROJECTS_PER_PAGE } from '@/lib/supabase/queries/projects';
import { LOCALES, LOCALE_TO_LANGUAGE } from '@/lib/language';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://paulosilva.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  // ── Static routes ──────────────────────────────────────────────────────────
  for (const locale of LOCALES) {
    entries.push(
      { url: `${BASE_URL}/${locale}`,          lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
      { url: `${BASE_URL}/${locale}/blog`,      lastModified: now, changeFrequency: 'daily',  priority: 0.9 },
      { url: `${BASE_URL}/${locale}/projects`,  lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    );
  }

  // ── Blog posts (per locale) ────────────────────────────────────────────────
  await Promise.all(
    LOCALES.map(async locale => {
      const language = LOCALE_TO_LANGUAGE[locale];
      try {
        // Fetch up to 1000 articles — adjust limit as the blog grows
        const posts = await getPublishedArticles(1000, language);
        for (const post of posts) {
          entries.push({
            url: `${BASE_URL}/${locale}/blog/${post.slug}`,
            lastModified: post.publishedAt ?? now,
            changeFrequency: 'monthly',
            priority: 0.7,
          });
        }
      } catch {
        // Sitemap generation should never crash the build
      }
    }),
  );

  // ── Projects (per locale) ──────────────────────────────────────────────────
  await Promise.all(
    LOCALES.map(async locale => {
      const language = LOCALE_TO_LANGUAGE[locale];
      try {
        const { projects } = await getProjectsWithFilters({
          page: 1,
          search: '',
          sort: 'newest',
          language,
        });
        for (const project of projects) {
          entries.push({
            url: `${BASE_URL}/${locale}/projects/${project.slug}`,
            lastModified: project.createdAt ?? now,
            changeFrequency: 'monthly',
            priority: 0.7,
          });
        }
      } catch {
        // Sitemap generation should never crash the build
      }
    }),
  );

  return entries;
}
