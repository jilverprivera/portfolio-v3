// Languages the site is written in. The locale never shows in the URL: the proxy rewrites each request
// to /[lang]/… using the visitor's cookie, or the default language until they pick one.
export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
export const LOCALE_COOKIE = "lang";

export const isLocale = (value: string | undefined): value is Locale =>
  value !== undefined && (locales as readonly string[]).includes(value);
