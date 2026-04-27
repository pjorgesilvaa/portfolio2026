import { getLanguage } from './language.server';
import { getTranslations, Translations } from './i18n';

export async function getT(): Promise<Translations> {
  const language = await getLanguage();
  return getTranslations(language);
}
