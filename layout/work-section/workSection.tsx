import WorkItem from './workItem';

export default function WorkSection() {
  const workItems = [
    {
      title: 'Senior Full Stack Developer',
      company: 'Sonae — SC Fitness',
      place: 'Maia, PT',
      period: '2026 — Present',
      description:
        'Owning the development and evolution of SC Fitness’ digital ecosystem, including two mobile applications used daily by over 150k users, as well as two public websites and their shared backend systems. Responsible for architecture decisions, feature delivery, and ensuring performance, scalability, and reliability across web and mobile platforms.',
    },
    {
      title: 'Tech Lead',
      company: 'Axians',
      place: 'Lisboa, PT',
      period: '2025 — 2026',
      description:
        "Lead the development of a large scale platform for the Portuguese Ministry of Justice, designed microservices based API's and managed complex CI/CD pipelines. Acted as the main technical contact with stakeholders while guiding the team on architecture, delivery, and best practices.",
    },
    {
      title: 'Full Stack Developer',
      company: 'Noesis',
      place: 'Matosinhos, PT',
      period: '2023 — 2025',
      description:
        "Developed and maintained multiple full stack applications across different clients, contributing to both frontend and backend architecture. Mentored junior developers, helped standardize development practices, and led the delivery of a full stack portal for the Autoridade da Concorrência.",
    },
    {
      title: 'Junior Full Stack Developer',
      company: 'Noesis',
      place: 'Matosinhos, PT',
      period: '2021 — 2023',
      description:
        "Contributed to several React and .NET solutions, working closely with senior engineers to build and maintain production systems. Took initiative in improving internal tooling by leading the development of an issue-tracking solution that significantly increased team efficiency and revenue.",
    },
    {
      title: 'Frontend Developer Intern',
      company: 'GECAD',
      place: 'Porto, PT',
      period: '2021 — 2021',
      description:
        "Developed a smart building management portal using Vue.js, enabling real-time device monitoring and control. Worked directly with clients in an agile environment and implemented real-time alert systems using MQTT for environmental monitoring.",
    },
  ];

  return (
    <>
      <div className="w-7xl m-auto flex items-baseline justify-between gap-16 px-8">
        <div className="w-6xl">
          <h2 className="text-primary font-semibold uppercase">Professional Journey</h2>
          <h1 className="text-[#2B3437] text-4xl font-bold">Expertise forged in the industry.</h1>
          <p className="text-secondary mt-4">Over 8 years of experience working with global brands to define their digital presence.</p>
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
