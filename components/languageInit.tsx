'use client';

import { useEffect } from 'react';
import { LANGUAGE_COOKIE, SiteLanguage } from '@/lib/language';

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

function detectLanguage(): SiteLanguage {
  const lang = navigator.language ?? '';
  if (lang.startsWith('pt')) return 'pt-PT';
  return 'en-US';
}

export default function LanguageInit() {
  useEffect(() => {
    // Only set cookie if not already chosen by the user
    if (getCookie(LANGUAGE_COOKIE)) return;
    const lang = detectLanguage();
    document.cookie = `${LANGUAGE_COOKIE}=${lang}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
  }, []);

  return null;
}
