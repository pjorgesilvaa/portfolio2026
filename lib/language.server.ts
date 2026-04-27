import { cookies } from 'next/headers';
import { DEFAULT_LANGUAGE, LANGUAGE_COOKIE, SiteLanguage } from './language';

export async function getLanguage(): Promise<SiteLanguage> {
  const cookieStore = await cookies();
  const lang = cookieStore.get(LANGUAGE_COOKIE)?.value;
  if (lang === 'pt-PT') return 'pt-PT';
  return DEFAULT_LANGUAGE;
}
