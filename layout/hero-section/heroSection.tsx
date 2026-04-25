import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <>
      <div className="w-7xl m-auto flex justify-between items-center px-8">
        <div className="max-w-xl">
          <h2 className="text-primary font-semibold uppercase">Independent Design Partner</h2>
          <h1 className="text-[#2B3437] text-7xl font-bold">Crafting digital</h1>
          <h1 className="text-primary text-7xl font-bold">masterpieces</h1>
          <h1 className="text-[#2B3437] text-7xl font-bold">through intent.</h1>
          <p className="text-secondary mt-4">
            A specialized focus on building high-fidelity interfaces that bridge the gap between architectural precision and human emotion.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <Link
              href="#projects"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3"
            >
              View Selected Works
            </Link>
            <Link href="#feedback" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-9 px-4 py-2 has-[>svg]:px-3 bg-accent text-[#3F555D] hover:bg-accent/70">
              Read Feedback
            </Link>
          </div>
        </div>
        <div className="relative w-112.5 h-150">
          <Image src="/images/hero-image.png" alt="Hero Image" fill className="object-cover rounded-md" />
        </div>
      </div>
    </>
  );
}
