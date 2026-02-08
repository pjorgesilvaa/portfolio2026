import { cn } from '@/lib/utils'

type TypographyPProps = {
  children?: React.ReactNode
  className?: string
}

export function TypographyP({ children, className }: TypographyPProps) {
  return <p className={cn('text-secondary-foreground leading-5 not-first:mt-6', className)}>{children}</p>
}
