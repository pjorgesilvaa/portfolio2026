import { getLanguage, getLocale } from '@/lib/language.server';
import { getT } from '@/lib/i18n.server';
import LanguageSwitcher from '@/components/languageSwitcher';
import MobileNav from '@/components/mobileNav';
import Link from 'next/link';

export default async function Header() {
  const [language, locale, t] = await Promise.all([getLanguage(), getLocale(), getT()]);

  // Section anchor links always point back to the home page in the current locale
  const home = `/${locale}`;

  return (
    <header className="sticky top-0 left-0 w-full bg-[#FFF] backdrop-blur-lg drop-shadow-xs z-1">
      <div className="flex items-center justify-between md:max-w-7xl m-auto py-6 px-8">

        {/* LOGO */}
        <Link href={home} className="hover:opacity-75 transition-opacity duration-200">
          <span className="text-primary text-xl font-extrabold">Paulo Silva</span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center justify-center">
          <Link href={`${home}#projects`} className="text-secondary text-lg font-bold mx-4 hover:text-primary transition-colors duration-300">
            {t.nav.projects}
          </Link>
          <Link href={`${home}#work`} className="text-secondary text-lg font-bold mx-4 hover:text-primary transition-colors duration-300">
            {t.nav.work}
          </Link>
          <Link href={`${home}#feedback`} className="text-secondary text-lg font-bold mx-4 hover:text-primary transition-colors duration-300">
            {t.nav.feedback}
          </Link>
          <Link href={`${home}#journal`} className="text-secondary text-lg font-bold mx-4 hover:text-primary transition-colors duration-300">
            {t.nav.journal}
          </Link>
        </nav>

        {/* DESKTOP RIGHT */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher current={language} />
          <Link
            href={`${home}#form`}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 hover:scale-105 active:scale-95"
          >
            {t.nav.getInTouch}
          </Link>
        </div>

        {/* MOBILE HAMBURGER */}
        <MobileNav language={language} locale={locale} nav={t.nav} />

      </div>
    </header>
  );
}
