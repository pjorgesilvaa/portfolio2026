import Image from 'next/image';
import Link from 'next/link';
import { getT } from '@/lib/i18n.server';

export default async function HeroSection() {
  const t = await getT();

  return (
    <>
      <div className="w-full md:w-7xl m-auto flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center md:px-8">
        <div className="w-full max-w-xl flex flex-col items-start">
          <h2 className="text-primary font-semibold uppercase hero-animate" style={{ animationDelay: '0ms' }}>
            {t.hero.role}
          </h2>
          <h1 className="text-4xl md:text-7xl font-bold flex flex-col">
            <span className="text-[#2B3437] hero-animate" style={{ animationDelay: '100ms' }}>{t.hero.line1}</span>
            <span className="text-primary break-all hero-animate" style={{ animationDelay: '200ms' }}>{t.hero.line2}</span>
            <span className="text-[#2B3437] hero-animate" style={{ animationDelay: '300ms' }}>{t.hero.line3}</span>
          </h1>
          <p className="text-secondary text-sm md:text-base mt-4 hero-animate" style={{ animationDelay: '420ms' }}>
            {t.hero.description}
          </p>
          <div className="w-full md:w-max flex items-center justify-between md:gap-2 mt-4 hero-animate" style={{ animationDelay: '540ms' }}>
            <Link
              href="#projects"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3 hover:scale-105 active:scale-95"
            >
              {t.hero.viewProjects}
            </Link>
            <Link
              href="#feedback"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-9 px-4 py-2 has-[>svg]:px-3 bg-accent text-[#3F555D] hover:bg-accent/70 hover:scale-105 active:scale-95"
            >
              {t.hero.readFeedback}
            </Link>
          </div>
        </div>
        <div className="hero-fade-in w-full aspect-3/4 md:w-112.5 md:h-150" style={{ animationDelay: '200ms' }}>
          <div className="relative w-full h-full float-animate" style={{ animationDelay: '1s' }}>
            <Image src="/images/hero-image.png" alt="Paulo Silva — Senior Full Stack Engineer" fill className="object-cover rounded-md" />
          </div>
        </div>
      </div>
    </>
  );
}
