import Link from 'next/link'
import { OpenNewTabIcon } from './openNewTabIcon'
import { TypographyP } from './typographyP'
import { Badge } from './ui/badge'

type ExperienceCardProps = {
  start: string
  end: string
  company: string
  companyUrl: string
  role: string
  description: string
  techs: string[]
}

export function ExperienceCard({ start, end, company, companyUrl, role, description, techs }: ExperienceCardProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm text-secondary-foreground">
        {start} — {end}
      </span>
      <div className="flex flex-col gap-1">
        <Link href={companyUrl} target="_blank" className="flex items-end gap-1">
          <span className="text-foreground text-lg leading-4 font-bold">{company}</span>
          <OpenNewTabIcon className="w-3 h-3 fill-foreground" />
        </Link>
        <span className="text-secondary-foreground">{role}</span>
      </div>
      <TypographyP className="not-first:mt-0 text-sm leading-4">{description}</TypographyP>
      <div className="flex flex-wrap gap-2">
        {techs.map(tech => (
          <Badge key={tech} variant="default" className='font-bold bg-card text-accent-foreground px-3 py-1'>{tech}</Badge>
        ))}
      </div>
    </div>
  )
}
