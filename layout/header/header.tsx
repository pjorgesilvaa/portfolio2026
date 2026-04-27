import { getLanguage } from '@/lib/language.server';
import LanguageSwitcher from '@/components/languageSwitcher';
import MobileNav from '@/components/mobileNav';
import Link from 'next/link';

export default async function Header() {
  const language = await getLanguage();

  return (
    <header className="sticky top-0 left-0 w-full bg-[#FFF] backdrop-blur-lg drop-shadow-xs z-1">
      <div className="flex items-center justify-between md:max-w-7xl m-auto py-6 px-8">

        {/* LOGO */}
        <Link href="/#home" className="hover:opacity-75 transition-opacity duration-200">
          <span className="text-primary text-xl font-extrabold">Paulo Silva</span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center justify-center">
          <Link href="/#projects" className="text-secondary text-lg font-bold mx-4 hover:text-primary transition-colors duration-300">
            Projects
          </Link>
          <Link href="/#work" className="text-secondary text-lg font-bold mx-4 hover:text-primary transition-colors duration-300">
            Work
          </Link>
          <Link href="/#feedback" className="text-secondary text-lg font-bold mx-4 hover:text-primary transition-colors duration-300">
            Feedback
          </Link>
          <Link href="/#journal" className="text-secondary text-lg font-bold mx-4 hover:text-primary transition-colors duration-300">
            Journal
          </Link>
        </nav>

        {/* DESKTOP RIGHT */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher current={language} />
          <Link
            href="/#form"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 hover:scale-105 active:scale-95"
          >
            Get In Touch
          </Link>
        </div>

        {/* MOBILE HAMBURGER */}
        <MobileNav language={language} />

      </div>
    </header>
  );
}
