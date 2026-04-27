import { getProjectBySlug } from '@/lib/supabase/queries/projects';
import { getLanguage } from '@/lib/language.server';
import { getT } from '@/lib/i18n.server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { LOCALE_TO_HREFLANG } from '@/lib/language';

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
        {(project.projectGitUrl || project.projectDeployedUrl) && (
          <div className="hero-animate flex flex-wrap gap-3 mt-6" style={{ animationDelay: '160ms' }}>
            {project.projectGitUrl && (
              <a
                href={project.projectGitUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#2B3437] text-white text-sm font-semibold hover:opacity-80 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                {t.projectPost.viewOnGithub}
              </a>
            )}
            {project.projectDeployedUrl && (
              <a
                href={project.projectDeployedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:opacity-80 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                {t.projectPost.viewLive}
              </a>
            )}
          </div>
        )}

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
