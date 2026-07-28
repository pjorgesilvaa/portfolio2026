import { MetadataRoute } from 'next';
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
      { url: `${BASE_URL}/${locale}/projects`,  lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    );
  }

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
