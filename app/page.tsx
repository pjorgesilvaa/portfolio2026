import './globals.css'
import { TypographyH1 } from '@/components/typographyH1'
import { TypographyH2 } from '@/components/typographyH2'
import { TypographyH3 } from '@/components/typograpgyH3'
import { TypographyP } from '@/components/typographyP'
import { ExperienceCard } from '@/components/experienceCard'
import { ProjectCard } from '@/components/projectCard'
import { LinkedinIcon } from '@/components/linkedinIcon'
import { OpenNewTabIcon } from '@/components/openNewTabIcon'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <div className="pt-12 pb-6 lg:py-24 lg:pb-12 flex flex-col lg:flex-row lg:justify-center relative">
        <header className="px-6 flex flex-col gap-2 max-w-lg lg:sticky lg:top-24 lg:self-start">
          <TypographyH1>Paulo Silva</TypographyH1>
          <TypographyH2>Full Stack Engineer</TypographyH2>
          <TypographyP className="not-first:mt-0">Based in Portugal, available for remote work in the EU.</TypographyP>
          <div className="flex items-center gap-4 mt-4">
            <Link href="/Paulo Silva CV 2025.pdf" target="_blank" className="flex items-end gap-1">
              <span className="text-foreground text-lg leading-4 font-bold">View Full CV</span>
              <OpenNewTabIcon className="w-3 h-3 fill-foreground" />
            </Link>
            <Link href="https://www.linkedin.com/in/paulo-silva171/" target="_blank">
              <LinkedinIcon className="w-6 h-6 rounded fill-secondary-foreground hover:fill-foreground" />
            </Link>
          </div>
        </header>
        <main className="px-6 mt-18 lg:mt-0 max-w-2xl">
          <section id="About" className="mt-6 lg:mt-0">
            <TypographyH3 className="uppercase mb-12">About</TypographyH3>
            <TypographyP>
              I’m a full stack engineer with a strong focus on building web applications using React and .NET. I enjoy working across the
              whole stack, from shaping intuitive user interfaces to designing robust backend architectures that hold up under real-world
              complexity.
            </TypographyP>
            {/* <TypographyP>
            Currently, I’m a Tech Lead at{' '}
            <Link className="text-foreground font-semibold" href="https://www.axians.pt/" target="_blank">
              Axians
            </Link>
            , working on a large scale platform for the Portuguese Ministry of Justice. In this role, I lead the development team,
            communicate directly with stakeholders, and design microservices-based systems with complex CI/CD pipelines using Docker and
            Kubernetes. I’m often the bridge between technical execution and business needs, translating requirements into maintainable,
            future-proof solutions.
          </TypographyP>
          <TypographyP>
            Before that, I spent several years at{' '}
            <Link className="text-foreground font-semibold" href="https://www.noesis.pt/" target="_blank">
              Noesis
            </Link>
            , growing from junior to senior engineer while working across multiple React and .NET projects for different clients. Along the
            way, I mentored junior developers, helped standardize development practices, and led the development of several small projects.
            These experiences shaped how I think about engineering: pragmatic, scalable, and always focused on long-term maintainability.
          </TypographyP> */}
            <TypographyP>
              I’m highly open to international opportunities and relocation, especially in environments where engineering quality and growth
              are taken seriously.
            </TypographyP>
            <TypographyP>
              Outside of work, I’m usually at the gym, experimenting with side projects (like this one), thinking about new ideas, or
              optimizing my setup. Always chasing the next improvement, both in code and in life.
            </TypographyP>
          </section>
          <section id="Experience" className="mt-16">
            <TypographyH3 className="uppercase mb-12">Experience</TypographyH3>
            <div className="flex flex-col gap-12">
              <ExperienceCard
                start="2026"
                end="Present"
                company="Sonae — SC Fitness"
                companyUrl="https://www.scinvestments.pt/"
                role="Senior Full Stack Developer"
                description="Owning the development and evolution of SC Fitness’ digital ecosystem, including two mobile applications used daily by over 150k users, as well as two public websites and their shared backend systems. Responsible for architecture decisions, feature delivery, and ensuring performance, scalability, and reliability across web and mobile platforms."
                techs={['React', '.NET', 'Python', 'AWS', 'PostgreSQL']}
              />
              <ExperienceCard
                start="2025"
                end="2026"
                company="Axians"
                companyUrl="https://www.axians.pt/"
                role="Tech Lead"
                description="Lead the development of a large scale platform for the Portuguese Ministry of Justice, designed microservices based API's and managed complex CI/CD pipelines. Acted as the main technical contact with stakeholders while guiding the team on architecture, delivery, and best practices."
                techs={['React', '.NET', 'Docker', 'Kubernetes', 'PostgreSQL', 'Azure DevOps']}
              />
              <ExperienceCard
                start="2023"
                end="2025"
                company="Noesis"
                companyUrl="https://www.noesis.pt/"
                role="Full Stack Developer"
                description="Developed and maintained multiple full stack applications across different clients, contributing to both frontend and backend architecture. Mentored junior developers, helped standardize development practices, and led the delivery of a full stack portal for the Autoridade da Concorrência."
                techs={['React', '.NET', 'SQL Server', 'Azure DevOps']}
              />
              <ExperienceCard
                start="2021"
                end="2023"
                company="Noesis"
                companyUrl="https://www.noesis.pt/"
                role="Junior Full Stack Developer"
                description="Contributed to several React and .NET solutions, working closely with senior engineers to build and maintain production systems. Took initiative in improving internal tooling by leading the development of an issue-tracking solution that significantly increased team efficiency and revenue."
                techs={['React', '.NET', 'SQL Server', 'Azure DevOps']}
              />
              <ExperienceCard
                start="2021"
                end="2021"
                company="GECAD"
                companyUrl="https://www.gecad.isep.ipp.pt/"
                role="Frontend Developer Intern"
                description="Developed a smart building management portal using Vue.js, enabling real-time device monitoring and control. Worked directly with clients in an agile environment and implemented real-time alert systems using MQTT for environmental monitoring."
                techs={['Vue.js', 'JavaScript', 'MQTT']}
              />
            </div>
          </section>
          <section id="Projects" className="mt-16">
            <TypographyH3 className="uppercase mb-12">Projects</TypographyH3>
            <div className="flex flex-col gap-12">
              <ProjectCard
                title="Portfolio 2026"
                description="A more ambitious evolution of my personal website, featuring a blog where I share thoughts on life as a developer in Portugal. Heavily inspired by designers I admire, with a stronger focus on visual identity and content."
                url=""
                image="/portfolio2026.png"
                imageAlt="Portfolio 2026"
                techs={['Next.js', 'Tailwind CSS', 'shadcn/ui']}
              ></ProjectCard>
              <ProjectCard
                title="Portfolio 2025"
                description="A simple, straightforward personal portfolio built with the goal of creating something I’d be proud to share. Focused on reliability, clarity, and responsive design, ensuring the site worked smoothly across all devices."
                url="https://github.com/pjorgesilvaa/portfolio"
                image="/portfolio2025.png"
                imageAlt="Portfolio 2025"
                techs={['Next.js', 'Tailwind CSS', 'shadcn/ui']}
              ></ProjectCard>
            </div>
          </section>
          <section id="Blog" className="mt-16">
            <TypographyH3 className="uppercase mb-12">Blog</TypographyH3>
            <div className="flex flex-col gap-12">
              <TypographyP>Blog section coming soon...</TypographyP>
            </div>
          </section>
          <footer className="mt-16">
            <TypographyP className="text-xs">
              Heavly inspired in great web designers, coded in Visual Studio Code and loudly implemented by yours truly. Built with Next.js
              and Tailwind CSS, deployed with Vercel. Keep on building stuff!
            </TypographyP>
          </footer>
        </main>
      </div>
    </>
  )
}
