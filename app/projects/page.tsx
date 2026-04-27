import ProjectListingClient from '@/layout/project-listing/ProjectListingClient';
import { PROJECTS_PER_PAGE, getProjectsWithFilters } from '@/lib/supabase/queries/projects';
import { getLanguage } from '@/lib/language.server';

interface Props {
  searchParams: Promise<{
    page?: string;
    search?: string;
    sort?: string;
  }>;
}

export default async function ProjectsPage({ searchParams }: Props) {
  const params = await searchParams;

  const page     = Math.max(1, Number(params.page ?? 1));
  const search   = params.search ?? '';
  const sort     = params.sort ?? 'newest';
  const language = await getLanguage();

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
      />
    </div>
  );
}
