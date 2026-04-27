'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import LanguageSwitcher from './languageSwitcher';
import { SiteLanguage } from '@/lib/language';
import type { Translations } from '@/lib/i18n';

const NAV_KEYS: { key: keyof Translations['nav']; anchor: string }[] = [
  { key: 'projects', anchor: '#projects' },
  { key: 'work',     anchor: '#work' },
  { key: 'feedback', anchor: '#feedback' },
  { key: 'journal',  anchor: '#journal' },
];

export default function MobileNav({
  language,
  locale,
  nav,
}: {
  language: SiteLanguage;
  locale: string;
  nav: Translations['nav'];
}) {
  const [open, setOpen] = useState(false);
  const home = `/${locale}`;

  return (
    <>
      {/* Hamburger — mobile only */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="md:hidden flex flex-col justify-center items-center gap-[5px] w-9 h-9"
      >
        <span className="block w-6 h-[2px] bg-[#2B3437] rounded-full" />
        <span className="block w-6 h-[2px] bg-[#2B3437] rounded-full" />
        <span className="block w-4 h-[2px] bg-[#2B3437] rounded-full self-end" />
      </button>

      {/* Full-screen overlay — portalled to body to escape header's stacking context */}
      {open && typeof window !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[9999] flex flex-col bg-white w-screen h-screen overflow-hidden">

          {/* Top bar */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
            <span className="text-primary text-xl font-extrabold">Paulo Silva</span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="w-9 h-9 flex items-center justify-center text-secondary hover:text-primary transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Language + CTA */}
          <div className="px-8 pt-6 pb-4 flex items-center justify-between border-b border-gray-100">
            <LanguageSwitcher current={language} />
            <Link
              href={`${home}#form`}
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center rounded-md bg-primary text-white text-sm font-semibold px-6 h-10 hover:bg-primary/90 transition-all duration-200"
            >
              {nav.getInTouch}
            </Link>
          </div>

          {/* Nav links — only this section scrolls */}
          <nav className="flex flex-col flex-1 overflow-y-auto justify-center px-8 gap-2">
            {NAV_KEYS.map((link, i) => (
              <Link
                key={link.key}
                href={`${home}${link.anchor}`}
                onClick={() => setOpen(false)}
                className="text-4xl font-bold text-[#2B3437] py-3 border-b border-gray-100 hover:text-primary transition-colors duration-200"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {nav[link.key]}
              </Link>
            ))}
          </nav>

        </div>,
        document.body
      )}
    </>
  );
}
