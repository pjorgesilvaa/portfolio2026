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
  ];

  return (
    <div className="w-7xl m-auto flex flex-col items-start gap-16 px-8">
      <div className="w-full flex justify-between items-start">
        <h2 className="text-primary font-semibold uppercase">Selected Projects</h2>
        <h3 className="w-1/3 text-lg text-secondary text-right">Always focusing on structured, scalable solutions and user experience.</h3>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {projectItems.map((item, index) => {
          const spanClass = index === 0 ? 'col-span-2' : index === 1 ? 'col-span-1' : index === 2 ? 'col-span-1' : 'col-span-2';

          return (
            <div key={index} className={`${spanClass} bg-white rounded-lg shadow-md overflow-hidden flex flex-col`}>
              {item.bannerUrl ? (
                <img src={item.bannerUrl} alt={item.title} className="w-full h-48 object-cover" />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No Image Available</span>
                </div>
              )}

              <div className="p-4 flex flex-col gap-4 flex-1">
                <h3 className="text-[#2B3437] text-xl font-bold">{item.title}</h3>

                <p className="text-secondary">{item.description}</p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {item.tags.map((tag, index) => (
                    <span key={index} className="text-sm text-secondary bg-gray-200 rounded-full px-2 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
