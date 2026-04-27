import AnimateIn from '@/components/animateIn';
import { getProjectsBySlots } from '@/lib/supabase/queries/projects';
import { getLanguage, getLocale } from '@/lib/language.server';
import { getT } from '@/lib/i18n.server';
import Link from 'next/link';

// ── Define exactly which projects appear and in which slot ──────────────────
const FEATURED_SLOTS: (string | null)[] = [
  null,             // slot 1 — empty
  null,             // slot 2 — empty
  'portfolio-2026', // slot 3
  'portfolio-2025', // slot 4
];
// ────────────────────────────────────────────────────────────────────────────

export default async function ProjectSection() {
  const [language, locale] = await Promise.all([getLanguage(), getLocale()]);
  const [projects, t] = await Promise.all([
    getProjectsBySlots(FEATURED_SLOTS, language),
    getT(),
  ]);

  // Col-span pattern: 2-1-1-2-2-1-1-2...
  const spanClass = (index: number) =>
    index % 4 === 0 || index % 4 === 3 ? 'md:col-span-2' : 'md:col-span-1';

  return (
    <div className="w-full md:w-7xl m-auto flex flex-col items-start gap-8 md:gap-16 md:px-8">

      {/* HEADER */}
      <AnimateIn className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-4" animation="fade-up">
        <div>
          <h2 className="text-primary font-semibold uppercase">{t.projects.eyebrow}</h2>
          <h3 className="text-2xl md:text-4xl font-bold text-[#2B3437]">{t.projects.title}</h3>
          <p className="text-sm md:text-lg text-secondary mt-2">{t.projects.subtitle}</p>
        </div>
        <Link
          href={`/${locale}/projects`}
          className="shrink-0 text-sm font-semibold text-primary border border-primary rounded-md px-4 py-2 hover:bg-primary hover:text-white hover:scale-105 active:scale-95 transition-all duration-200"
        >
          {t.projects.viewAll}
        </Link>
      </AnimateIn>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {projects.map((project, index) => {
          const span = `col-span-1 ${spanClass(index)}`;
          const delay = { animationDelay: `${300 + index * 80}ms` };

          // Empty slot
          if (!project) {
            return (
              <div key={`empty-${index}`} className={`${span} hero-animate`} style={delay}>
                <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full">
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">{t.projects.comingSoon}</span>
                  </div>
                  <div className="p-6 flex flex-col gap-3 flex-1">
                    <div className="h-5 w-2/3 bg-gray-100 rounded" />
                    <div className="h-4 w-full bg-gray-100 rounded" />
                    <div className="h-4 w-4/5 bg-gray-100 rounded" />
                  </div>
                </div>
              </div>
            );
          }

          return (
            <Link
              key={project.id}
              href={`/${locale}/projects/${project.slug}`}
              className={`${span} group hero-animate block`}
              style={delay}
            >
              <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full hover:-translate-y-2 hover:shadow-xl transition-all duration-300">

                {/* COVER */}
                <div className="relative overflow-hidden">
                  {project.bannerUrl ? (
                    <img
                      src={project.bannerUrl}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-300">
                      <span className="text-gray-400 text-sm">{t.projectListing.noImage}</span>
                    </div>
                  )}
                </div>

                {/* BODY */}
                <div className="p-6 flex flex-col gap-3 flex-1">
                  <h3 className="text-lg font-bold text-[#2B3437] line-clamp-2 group-hover:text-primary transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-secondary text-sm line-clamp-3 flex-1">{project.excerpt}</p>
                  {project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="text-xs font-semibold text-secondary bg-gray-100 rounded-full px-3 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </Link>
          );
        })}
      </div>

    </div>
  );
}
