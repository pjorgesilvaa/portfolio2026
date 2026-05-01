import ProjectListingClient from '@/layout/project-listing/ProjectListingClient';
import { PROJECTS_PER_PAGE, getProjectsWithFilters } from '@/lib/supabase/queries/projects';
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
    sort?: string;
  }>;
}

export async function generateMetadata({ params }: { params?: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = (await params)?.locale ?? 'en';

  const languages: Record<string, string> = { 'x-default': `${BASE_URL}/en/projects` };
  for (const l of LOCALES) {
    languages[LOCALE_TO_HREFLANG[l]] = `${BASE_URL}/${l}/projects`;
  }

  return {
    title: 'Projects',
    description: 'A collection of software projects spanning web apps, APIs, cloud infrastructure, and mobile.',
    alternates: {
      canonical: `${BASE_URL}/${locale}/projects`,
      languages,
    },
  };
}

export default async function ProjectsPage({ searchParams }: Props) {
  const params = await searchParams;

  const page   = Math.max(1, Number(params.page ?? 1));
  const search = params.search ?? '';
  const sort   = params.sort ?? 'newest';

  const [language, t] = await Promise.all([getLanguage(), getT()]);

  const { projects, total } = await getProjectsWithFilters({ page, search, sort, language });
  const totalPages = Math.ceil(total / PROJECTS_PER_PAGE);

  return (
    <div className="px-8 py-12 md:py-20">
      <ProjectListingClient
        projects={projects}
        total={total}
        totalPages={totalPages}
        currentPage={page}
        currentSearch={search}
        currentSort={sort}
        t={t.projectListing}
      />
    </div>
  );
}
