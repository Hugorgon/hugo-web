import type { Locale } from '../data/i18n';
import { DEFAULT_LOCALE } from '../data/i18n';

/**
 * Formátovací helpery vázané na locale.
 *
 * Cíl: žádný `'cs-CZ'` literál v komponentách. Všechny formátovací cesty
 * tečou přes tyhle funkce, takže napojení Sanity / locale switcheru
 * v budoucnu znamená jen jedno místo na úpravu.
 *
 * V současné fázi (single-locale = cs) funkce vracejí stejný výstup
 * jako předchozí inline `toLocaleDateString('cs-CZ', ...)` voláni.
 */

/** Mapa interní `Locale` na BCP 47 tag pro Intl API. */
const LOCALE_TAGS: Record<Locale, string> = {
  cs: 'cs-CZ',
  en: 'en-US',
};

/**
 * Datum v dlouhém čitelném formátu — např. „12. května 2026" v CZ
 * nebo „May 12, 2026" v EN.
 */
export function formatDate(iso: string, locale: Locale = DEFAULT_LOCALE): string {
  return new Date(iso).toLocaleDateString(LOCALE_TAGS[locale], {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Číslo s lokalizovaným oddělovačem tisíců — např. „2 555" v CZ
 * nebo „2,555" v EN.
 */
export function formatNumber(value: number, locale: Locale = DEFAULT_LOCALE): string {
  return value.toLocaleString(LOCALE_TAGS[locale]);
}

/**
 * Nahradí `{placeholder}` ve stringu hodnotami z `vars` mapy.
 * Použít pro template texty z UI registry (např.
 * „Zobrazeno {visible} z {total} videí").
 *
 * Šabloně chybějící klíče se renderují jako prázdný string —
 * záměrné, abychom v UI neukázali doslovný `{xxx}` při chybě.
 */
export function interpolate(
  template: string,
  vars: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => {
    const value = vars[key];
    return value === undefined ? '' : String(value);
  });
}
