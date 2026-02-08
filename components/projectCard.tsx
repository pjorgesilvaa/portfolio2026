import Link from 'next/link'
import { OpenNewTabIcon } from './openNewTabIcon'
import { TypographyP } from './typographyP'
import { Badge } from './ui/badge'
import Image from 'next/image'

type ProjectCardProps = {
  title: string
  url: string
  description: string
  image: string
  imageAlt: string
  techs: string[]
}

export function ProjectCard({ title, url, description, image, imageAlt, techs }: ProjectCardProps) {
  return (
    <div className="flex flex-col gap-2">
      <Link href={url} target="_blank" className="flex items-end gap-1">
        <span className="text-foreground text-lg leading-4 font-bold">{title}</span>
        <OpenNewTabIcon className="w-3 h-3 fill-foreground" />
      </Link>
      <Image src={image} alt={imageAlt} width={800} height={400} className="rounded mt-2 mb-2" />
      <TypographyP className="not-first:mt-0 text-sm leading-4">{description}</TypographyP>
      <div className="flex flex-wrap gap-2">
        {techs.map(tech => (
          <Badge key={tech} variant="default" className="font-bold bg-card text-accent-foreground px-3 py-1">
            {tech}
          </Badge>
        ))}
      </div>
    </div>
  )
}
