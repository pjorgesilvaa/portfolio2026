import AnimateIn from '@/components/animateIn';

export default function ProjectSection() {
  const projectItems = [
    {
      id: 'blank-project',
      title: 'No project yet.',
      description:
        'This section will be updated soon with selected projects that showcase my expertise and impact in the industry. Stay tuned for exciting updates on my work and contributions to various projects.',
      tags: ['Coming Soon', 'Stay Tuned', 'Exciting Updates'],
      bannerUrl: null,
    },
    {
      id: 'blank-project',
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
        "A simple, straightforward personal portfolio built with the goal of creating something I'd be proud to share. Focused on reliability, clarity, and responsive design, ensuring the site worked smoothly across all devices.",
      tags: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Vercel'],
      bannerUrl: 'images/portfolio-2025.png',
    },
  ];

  return (
    <div className="w-full md:w-7xl m-auto flex flex-col items-start gap-8 md:gap-16 md:px-8">
      <AnimateIn className="w-full flex flex-col md:flex-row justify-between items-start" animation="fade-up">
        <h2 className="text-primary font-semibold uppercase">Selected Projects</h2>
        <h3 className="md:w-1/3 text-sm md:text-lg text-secondary md:text-right">
          Built with scalability, performance, and production reliability in mind.
        </h3>
      </AnimateIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {projectItems.map((item, index) => {
          const spanClass = index === 0 ? 'md:col-span-2' : index === 1 ? 'md:col-span-1' : index === 2 ? 'md:col-span-1' : 'md:col-span-2';

          return (
            <AnimateIn key={index} className={`col-span-1 ${spanClass}`} animation="fade-up" delay={index * 80}>
              <div className="group bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-default">
                {item.bannerUrl ? (
                  <div className="overflow-hidden">
                    <img
                      src={item.bannerUrl}
                      alt={item.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center group-hover:bg-gray-300 transition-colors duration-300">
                    <span className="text-gray-500">No Image Available</span>
                  </div>
                )}

                <div className="p-4 flex flex-col gap-4 flex-1">
                  <h3 className="text-[#2B3437] text-xl font-bold">{item.title}</h3>

                  <p className="text-secondary text-sm md:text-base">{item.description}</p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {item.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-sm text-secondary bg-gray-200 rounded-full px-2 py-1 hover:bg-accent hover:text-primary transition-colors duration-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </AnimateIn>
          );
        })}
      </div>
    </div>
  );
}
