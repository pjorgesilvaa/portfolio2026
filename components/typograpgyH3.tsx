import { cn } from '@/lib/utils'

type TypographyH2Props = {
  children?: React.ReactNode
  className?: string
}

export function TypographyH3({ children, className }: TypographyH2Props) {
  return <h3 className={cn('scroll-m-20 text-lg font-semibold tracking-tight first:mt-0', className)}>{children}</h3>
}
