import WorkItem from './workItem';

export default function WorkSection() {
  const workItems = [
    {
      title: 'Senior Full Stack Developer',
      company: 'Sonae — SC Fitness',
      place: 'Maia, PT',
      period: '2026 — Present',
      description: (
        <>
          Leading the development and evolution of SC Fitness’ digital ecosystem, including two mobile applications serving 150k+ users,
          alongside public websites and shared backend systems. Responsible for architecture, feature delivery, and ensuring performance,
          scalability, and reliability across all platforms.
        </>
      ),
    },
    {
      title: 'Tech Lead',
      company: 'Axians',
      place: 'Lisboa, PT',
      period: '2025 — 2026',
      description: (
        <>
          Led development of a large-scale platform for the Portuguese Ministry of Justice. Designed microservices-based APIs, managed
          complex CI/CD pipelines, and acted as the main technical point of contact for stakeholders. Guided the team on architecture,
          delivery, and engineering best practices.
        </>
      ),
    },
    {
      title: 'Full Stack Developer',
      company: 'Noesis',
      place: 'Matosinhos, PT',
      period: '2023 — 2025',
      description: (
        <>
          Developed and maintained multiple full stack applications across various clients, contributing to both frontend and backend
          architecture. Mentored junior developers, improved development standards, and led delivery of a full stack portal for the{' '}
          <i>Autoridade da Concorrência</i>.
        </>
      ),
    },
    {
      title: 'Junior Full Stack Developer',
      company: 'Noesis',
      place: 'Matosinhos, PT',
      period: '2021 — 2023',
      description: (
        <>
          Contributed to several React and .NET applications, collaborating with senior engineers to build and maintain production systems.
          Led development of an internal issue-tracking tool that significantly improved team efficiency and revenue.
        </>
      ),
    },
    {
      title: 'Frontend Developer Intern',
      company: 'GECAD',
      place: 'Porto, PT',
      period: '2021 — 2021',
      description: (
        <>
          Developed a smart building management portal using Vue.js, enabling real-time device monitoring and control. Implemented alert
          systems using MQTT and worked directly with clients in an agile environment.
        </>
      ),
    },
  ];

  return (
    <>
      <div className="w-full md:w-7xl m-auto flex flex-col md:flex-row items-baseline justify-between gap-8 md:gap-16 md:px-8">
        <div className="w-full md:w-6xl">
          <h2 className="text-primary font-semibold uppercase">Professional Journey</h2>
          <h1 className="text-[#2B3437] text-2xl md:text-4xl font-bold">Expertise forged in the industry.</h1>
          <p className="text-secondary text-sm md:text-base mt-4">
            Over 5 years of experience, from junior to tech lead, delivering production-grade systems across web and cloud.
          </p>
        </div>
        <div>
          {workItems.map((item, index) => (
            <WorkItem key={index} item={item} isCurrent={index === 0} />
          ))}
        </div>
      </div>
    </>
  );
}
