import { getProjectBySlug } from '@/lib/supabase/queries/projects';
import { getLanguage } from '@/lib/language.server';
import { getT } from '@/lib/i18n.server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { LOCALE_TO_HREFLANG } from '@/lib/language';
import ProjectExternalLinks from '@/components/projectExternalLinks';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://paulosilva.com';

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const language = await getLanguage();
  const project = await getProjectBySlug(slug, language);
  if (!project) return {};

  return {
    title: project.title,
    description: project.excerpt,
    alternates: {
      canonical: `${BASE_URL}/${locale}/projects/${slug}`,
      languages: {
        [LOCALE_TO_HREFLANG[locale as keyof typeof LOCALE_TO_HREFLANG] ?? 'en-US']:
          `${BASE_URL}/${locale}/projects/${slug}`,
        'x-default': `${BASE_URL}/en/projects`,
      },
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params;
  const [language, t] = await Promise.all([getLanguage(), getT()]);
  const project = await getProjectBySlug(slug, language);

  if (!project) notFound();

  const dateLocale = locale === 'pt' ? 'pt-PT' : 'en-US';
  const formattedDate = Intl.DateTimeFormat(dateLocale, {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  }).format(project.createdAt);

  return (
    <div className="px-8 py-12 md:py-20">
      <div className="w-full max-w-3xl mx-auto">
        {/* BACK */}
        <Link
          href={`/${locale}/projects`}
          className="hero-animate inline-flex items-center gap-2 text-sm font-semibold text-primary hover:opacity-70 transition-opacity duration-200 mb-8"
          style={{ animationDelay: '0ms' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t.projectPost.backToProjects}
        </Link>

        {/* TITLE */}
        <div className="hero-animate" style={{ animationDelay: '80ms' }}>
          <h1 className="text-3xl md:text-5xl font-bold text-[#2B3437] leading-tight">{project.title}</h1>
        </div>

        {/* ACTION BUTTONS */}
        <ProjectExternalLinks
          projectTitle={project.title}
          projectSlug={slug}
          gitUrl={project.projectGitUrl}
          deployedUrl={project.projectDeployedUrl}
          githubLabel={t.projectPost.viewOnGithub}
          liveLabel={t.projectPost.viewLive}
        />

        {/* COVER IMAGE */}
        {project.bannerUrl && (
          <div className="hero-animate mt-10 rounded-xl overflow-hidden shadow-md" style={{ animationDelay: '240ms' }}>
            <img src={project.bannerUrl} alt={project.title} className="w-full object-cover max-h-120" />
          </div>
        )}

        {/* CONTENT */}
        <div
          className="hero-animate blog-content mt-10 text-secondary [&_p]:mb-4 [&_h2]:text-[#2B3437] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4 [&_a]:text-primary [&_a]:underline [&_a:hover]:text-primary/80 transition-colors duration-200"
          style={{ animationDelay: '320ms' }}
          dangerouslySetInnerHTML={{ __html: project.description }}
        />

        {/* TAGS + META */}
        <div className="hero-animate mt-12 pt-8 border-t border-gray-200 flex flex-col gap-4" style={{ animationDelay: '400ms' }}>
          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <span key={i} className="text-xs font-semibold text-secondary bg-gray-100 rounded-full px-3 py-1">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <p className="text-secondary text-sm">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
}
