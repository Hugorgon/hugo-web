/**
 * Type-level i18n příprava pro budoucí Sanity integraci.
 *
 * Žádný provider, žádný hook, žádný runtime localization system.
 * Jen typový kontrakt a single source of truth pro DEFAULT_LOCALE
 * a SUPPORTED_LOCALES. Formátovací helpery v `src/lib/format.ts`
 * tyhle typy přijímají jako volitelný parametr a v současné fázi
 * fungují jako pass-through pro DEFAULT_LOCALE.
 *
 * Sanity / fetcher / locale switcher přicházejí v pozdějších vrstvách.
 */

export type Locale = 'cs' | 'en';

/** Aktuálně jediný používaný locale. EN obsah dorazí společně se Sanity. */
export const DEFAULT_LOCALE: Locale = 'cs';

/** Plný seznam locale, na který se má projekt v budoucnu připravit. */
export const SUPPORTED_LOCALES: readonly Locale[] = ['cs', 'en'] as const;
