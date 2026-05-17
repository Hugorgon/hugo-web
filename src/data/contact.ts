import type { LucideIcon } from 'lucide-react';
import { Instagram, Youtube } from 'lucide-react';

/**
 * Obsah ContactPage (/kontakt).
 * PageHeader copy žije v `pages.ts` pod `PAGES.contact.header`, aby
 * všechny page-headers měly jednotnou strukturu pro budoucí CMS napojení.
 *
 * Sociální položky vedou na reálné profily; e-mail je ZÁMĚRNĚ obfuskovaný
 * a neklikatelný — bránit spamovým robotům, kteří scrapují HTML.
 */

export interface ContactSocialItem {
  Icon: LucideIcon;
  label: string;
  handle: string;
  url: string;
}

export const CONTACT = {
  card: {
    heading: 'Najdete mě tady',
    lead: 'Sociální sítě jsou nejrychlejší. Na e-maily reagujeme jednou týdně.',
  },
  socials: [
    {
      Icon: Instagram,
      label: 'Instagram',
      handle: '@hugo.stories',
      url: 'https://instagram.com/hugo.stories',
    },
    {
      Icon: Youtube,
      label: 'YouTube',
      handle: '@HugoStories',
      url: 'https://youtube.com/@HugoStories',
    },
  ] satisfies ContactSocialItem[],
  email: {
    label: 'E-mail',
    /** ZÁMĚRNĚ obfuskovaný text — anti-spam. Žádný `mailto:`, žádný anchor. */
    obfuscated: 'hugo [zavináč] example [tečka] cz',
    notice: 'Zapsáno schválně — proti spamovým robotům. Sestavte si adresu sami.',
  },
  closing:
    'Odpovídám obvykle do týdne. Pokud máte spěšnější dotaz, zkuste sociální sítě.',
} as const;
