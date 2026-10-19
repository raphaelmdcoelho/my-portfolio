import { ui, type Lang } from './ui';

export const languages: Lang[] = ['en', 'pt'];
export const defaultLang: Lang = 'en';

/** A string that exists in every supported language. */
export type Localized = Record<Lang, string>;

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export function getLang(locale: string | undefined): Lang {
  return locale === 'pt' ? 'pt' : defaultLang;
}

export function loc(value: Localized, lang: Lang): string {
  return value[lang];
}

export function useTranslations(lang: Lang) {
  return ui[lang];
}

/** Build a site URL for `path` (e.g. "blog/foo" or "#about") in the given language. */
export function localePath(lang: Lang, path = ''): string {
  const prefix = lang === defaultLang ? '' : `/${lang}`;
  return `${BASE}${prefix}/${path}`;
}

/** Path of the current page without base or language prefix, e.g. "blog/foo/". */
export function stripLocale(pathname: string): string {
  let rest = pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname;
  rest = rest.replace(/^\/(pt)(?=\/|$)/, '');
  return rest.replace(/^\//, '');
}

export function formatDate(date: string, lang: Lang): string {
  const [year, month, day] = date.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
