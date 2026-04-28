'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePathname, useRouter } from 'next/navigation';
import { SiteLanguage, LOCALE_TO_LANGUAGE } from '@/lib/language';
import { trackEvent } from '@/lib/analytics';

function FlagUS({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="20" height="14" fill="#B22234" />
      <rect y="1.08"  width="20" height="1.08" fill="white" />
      <rect y="3.23"  width="20" height="1.08" fill="white" />
      <rect y="5.38"  width="20" height="1.08" fill="white" />
      <rect y="7.54"  width="20" height="1.08" fill="white" />
      <rect y="9.69"  width="20" height="1.08" fill="white" />
      <rect y="11.85" width="20" height="1.08" fill="white" />
      <rect width="8" height="7.54" fill="#3C3B6E" />
    </svg>
  );
}

function FlagPT({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="20" height="14" fill="#D52B1E" />
      <rect width="8"  height="14" fill="#006600" />
      <circle cx="8" cy="7" r="2.6" fill="#FFD700" />
      <circle cx="8" cy="7" r="1.8" fill="white" />
      <circle cx="8" cy="7" r="1.2" fill="#003399" />
    </svg>
  );
}

const LANGUAGES: { locale: string; language: SiteLanguage; Flag: typeof FlagUS; label: string; short: string }[] = [
  { locale: 'en', language: 'en-US', Flag: FlagUS, label: 'English',   short: 'EN' },
  { locale: 'pt', language: 'pt-PT', Flag: FlagPT, label: 'Português', short: 'PT' },
];

export default function LanguageSwitcher({ current }: { current: SiteLanguage }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);

  const currentLang = LANGUAGES.find(l => l.language === current) ?? LANGUAGES[0];

  function getLocaleUrl(targetLocale: string): string {
    // Replace the first path segment (/en/... or /pt/...) with the new locale
    const segments = pathname.split('/');
    segments[1] = targetLocale;
    return segments.join('/') || `/${targetLocale}`;
  }

  function handleOpen() {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + window.scrollY + 6,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
    setOpen(o => !o);
  }

  function switchLocale(targetLocale: string) {
    setOpen(false);
    trackEvent({ event: 'language_switch', from_locale: currentLang.locale, to_locale: targetLocale });
    router.push(getLocaleUrl(targetLocale));
  }

  useEffect(() => {
    if (!open) return;
    function closeOnMouse(e: MouseEvent) {
      if (triggerRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    }
    function closeOnScroll() { setOpen(false); }
    document.addEventListener('mousedown', closeOnMouse);
    window.addEventListener('scroll', closeOnScroll, true);
    return () => {
      document.removeEventListener('mousedown', closeOnMouse);
      window.removeEventListener('scroll', closeOnScroll, true);
    };
  }, [open]);

  const dropdown = open ? (
    <div
      style={{ position: 'absolute', top: dropdownPos.top, left: dropdownPos.left, minWidth: dropdownPos.width, zIndex: 9999 }}
      className="bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden"
    >
      {LANGUAGES.map(({ locale, language, Flag, label }) => {
        const isSelected = language === current;
        return (
          <button
            key={locale}
            type="button"
            onMouseDown={e => e.stopPropagation()}
            onClick={() => switchLocale(locale)}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium transition-colors duration-150 ${
              isSelected ? 'bg-primary text-white' : 'text-[#2B3437] hover:bg-accent hover:text-primary'
            }`}
          >
            <Flag className="w-5 h-3.5 rounded-sm shrink-0" />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  ) : null;

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={handleOpen}
        className="flex items-center gap-2 pl-3 pr-2 py-2 rounded-lg bg-white border border-gray-200 text-sm font-medium text-[#2B3437] hover:border-primary transition-all duration-200 cursor-pointer"
      >
        <currentLang.Flag className="w-5 h-3.5 rounded-sm shrink-0" />
        <span className="text-xs font-bold text-secondary">{currentLang.short}</span>
        <svg
          className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {typeof window !== 'undefined' && createPortal(dropdown, document.body)}
    </div>
  );
}
