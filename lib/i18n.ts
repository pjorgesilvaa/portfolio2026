import enUS from '../locales/en-US.json';
import ptPT from '../locales/pt-PT.json';

export type Translations = typeof enUS;

const resources: Record<string, Translations> = {
  'en-US': enUS,
  'pt-PT': ptPT as unknown as Translations,
};

export function getTranslations(language: string): Translations {
  return resources[language] ?? resources['en-US'];
}

/** Replace {key} placeholders in a string — e.g. t("found {count} items", { count: 3 }) */
export function tr(str: string, vars?: Record<string, string | number>): string {
  if (!vars) return str;
  return str.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? ''));
}
