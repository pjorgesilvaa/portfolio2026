export type SiteLanguage = 'en-US' | 'pt-PT';

export const LOCALES = ['en', 'pt'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';
export const DEFAULT_LANGUAGE: SiteLanguage = 'en-US';

/** URL locale → Supabase language code */
export const LOCALE_TO_LANGUAGE: Record<Locale, SiteLanguage> = {
  en: 'en-US',
  pt: 'pt-PT',
};

/** Supabase language code → URL locale */
export const LANGUAGE_TO_LOCALE: Record<SiteLanguage, Locale> = {
  'en-US': 'en',
  'pt-PT': 'pt',
};

/** ISO 639 language tag used in <html lang=""> */
export const LOCALE_TO_LANG_ATTR: Record<Locale, string> = {
  en: 'en-US',
  pt: 'pt-PT',
};

/** BCP-47 tag used in hreflang attributes */
export const LOCALE_TO_HREFLANG: Record<Locale, string> = {
  en: 'en-US',
  pt: 'pt-PT',
};

