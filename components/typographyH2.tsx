import { cn } from "@/lib/utils"

type TypographyH2Props = {
  children?: React.ReactNode
  className?: string
}

export function TypographyH2({ children, className }: TypographyH2Props) {
  return (
    <h2
      className={cn(
        "scroll-m-20 text-xl font-medium tracking-tight text-balance",
        className
      )}
    >
      {children}
    </h2>
  )
}
