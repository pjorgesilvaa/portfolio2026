import { getProjectBySlug } from '@/lib/supabase/queries/projects';
import { getLanguage } from '@/lib/language.server';
import { getT } from '@/lib/i18n.server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { LOCALES, LOCALE_TO_HREFLANG, LOCALE_TO_LANG_ATTR, Locale } from '@/lib/language';
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
    openGraph: {
      title: project.title,
      description: project.excerpt,
      images: project.bannerUrl ? [{ url: project.bannerUrl, width: 1200, height: 630, alt: project.title }] : [],
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/projects/${slug}`,
      languages: Object.fromEntries([
        ...LOCALES.map(l => [LOCALE_TO_HREFLANG[l], `${BASE_URL}/${l}/projects/${slug}`]),
        ['x-default', `${BASE_URL}/en/projects/${slug}`],
      ]),
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params;
  const [language, t] = await Promise.all([getLanguage(), getT()]);
  const project = await getProjectBySlug(slug, language);

  if (!project) notFound();

  const dateLocale = LOCALE_TO_LANG_ATTR[locale as Locale] ?? 'en-US';
  const formattedDate = Intl.DateTimeFormat(dateLocale, {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  }).format(new Date(project.createdAt));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: project.title,
    description: project.excerpt,
    image: project.bannerUrl || undefined,
    dateCreated: new Date(project.createdAt).toISOString(),
    author: {
      '@type': 'Person',
      name: 'Paulo Silva',
      url: BASE_URL,
    },
    url: `${BASE_URL}/${locale}/projects/${slug}`,
    codeRepository: project.projectGitUrl || undefined,
    runtimePlatform: project.tags?.join(', ') || undefined,
  };

  return (
    <div className="px-8 py-12 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
          <div className="hero-animate relative w-full h-64 md:h-120 mt-10 rounded-xl overflow-hidden shadow-md" style={{ animationDelay: '240ms' }}>
            <Image src={project.bannerUrl} alt={project.title} fill priority sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
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
