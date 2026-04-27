import { headers } from 'next/headers';
import {
  DEFAULT_LANGUAGE,
  DEFAULT_LOCALE,
  LOCALE_TO_LANGUAGE,
  SiteLanguage,
  Locale,
} from './language';

/** Reads the locale stamped by middleware onto the request headers. */
export async function getLocale(): Promise<Locale> {
  const h = await headers();
  const locale = h.get('x-locale') ?? DEFAULT_LOCALE;
  return (locale as Locale) ?? DEFAULT_LOCALE;
}

/** Returns the Supabase-compatible language code (e.g. 'en-US') for the current request. */
export async function getLanguage(): Promise<SiteLanguage> {
  const locale = await getLocale();
  return LOCALE_TO_LANGUAGE[locale] ?? DEFAULT_LANGUAGE;
}
