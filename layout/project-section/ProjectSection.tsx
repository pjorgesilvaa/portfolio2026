import AnimateIn from '@/components/animateIn';
import Link from 'next/link';

export default function ProjectSection() {
  const projectItems = [
    {
      id: 'blank-project-1',
      title: 'No project yet.',
      description:
        'This section will be updated soon with selected projects that showcase my expertise and impact in the industry. Stay tuned for exciting updates on my work and contributions to various projects.',
      tags: ['Coming Soon', 'Stay Tuned', 'Exciting Updates'],
      bannerUrl: null,
    },
    {
      id: 'blank-project-2',
      title: 'No project yet.',
      description:
        'This section will be updated soon with selected projects that showcase my expertise and impact in the industry. Stay tuned for exciting updates on my work and contributions to various projects.',
      tags: ['Coming Soon', 'Stay Tuned', 'Exciting Updates'],
      bannerUrl: null,
    },
    {
      id: 'portfolio-2026',
      title: 'Portfolio 2026',
      description:
        'A more ambitious evolution of my personal website, featuring a project section where I share my accomplishments on life as a developer in Portugal. Heavily inspired by designers I admire, with a stronger focus on visual identity and content.',
      tags: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Vercel'],
      bannerUrl: 'images/portfolio-2026.png',
    },
    {
      id: 'portfolio-2025',
      title: 'Portfolio 2025',
      description:
        'A simple, straightforward personal portfolio built with the goal of creating something I would be proud to share. Focused on reliability, clarity, and responsive design, ensuring the site worked smoothly across all devices.',
      tags: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Vercel'],
      bannerUrl: 'images/portfolio-2025.png',
    },
  ];

  return (
    <div className="w-full md:w-7xl m-auto flex flex-col items-start gap-8 md:gap-16 md:px-8">

      {/* HEADER */}
      <AnimateIn className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-4" animation="fade-up">
        <div>
          <h2 className="text-primary font-semibold uppercase">Selected Projects</h2>
          <h3 className="text-2xl md:text-4xl font-bold text-[#2B3437]">Work I am proud of.</h3>
          <p className="text-sm md:text-lg text-secondary mt-2">Built with scalability, performance, and production reliability in mind.</p>
        </div>
        <Link
          href="/projects"
          className="shrink-0 text-sm font-semibold text-primary border border-primary rounded-md px-4 py-2 hover:bg-primary hover:text-white hover:scale-105 active:scale-95 transition-all duration-200"
        >
          View all projects →
        </Link>
      </AnimateIn>

      {/* GRID — layout/sizes unchanged */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {projectItems.map((item, index) => {
          const spanClass = index === 0 ? 'md:col-span-2' : index === 1 ? 'md:col-span-1' : index === 2 ? 'md:col-span-1' : 'md:col-span-2';

          return (
            <Link
              key={item.id}
              href={`/projects/${item.id}`}
              className={`col-span-1 ${spanClass} group hero-animate block`}
              style={{ animationDelay: `${300 + index * 80}ms` }}
            >
              <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full hover:-translate-y-2 hover:shadow-xl transition-all duration-300">

                {/* COVER */}
                <div className="relative overflow-hidden">
                  {item.bannerUrl ? (
                    <img
                      src={item.bannerUrl}
                      alt={item.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-300">
                      <span className="text-gray-400 text-sm">No cover image</span>
                    </div>
                  )}
                </div>

                {/* BODY */}
                <div className="p-6 flex flex-col gap-3 flex-1">
                  <h3 className="text-lg font-bold text-[#2B3437] line-clamp-2 group-hover:text-primary transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-secondary text-sm line-clamp-3 flex-1">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-xs font-semibold text-secondary bg-gray-100 rounded-full px-3 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
