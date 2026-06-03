import type { LucideIcon } from 'lucide-react';
import { Facebook, Instagram, Mail, Twitter, Youtube } from 'lucide-react';
import { sanityClient } from '../sanity';
import { CONTACT as LOCAL_CONTACT } from '../../data/contact';
import { PAGES } from '../../data/pages';

/**
 * Fetcher pro `contactPage` singleton — preferuje Sanity, fallback na
 * `CONTACT` z `src/data/contact.ts`. Mirror existujícího patternu z
 * `aboutPage.ts` / `siteSettings.ts`.
 *
 * Sjednocený model: jedno pole `methods[]`, kam patří sociální profily
 * i e-mail. Frontend rozhoduje o renderování podle přítomnosti `url`:
 *  - `url` vyplněná → external link (target="_blank")
 *  - `url` chybí → plain text (anti-spam, žádný `mailto:`)
 *
 * Fallback semantika:
 *  - Sanity client nenakonfigurován → vrátí local
 *  - Sanity vrátí null (singleton ještě nevytvořený) → vrátí local
 *  - Sanity throw / network error → vrátí local + console.error
 *  - Studio dokument existuje ale `methods[]` prázdné → vrátí local
 *
 * `ICON_MAP` resolvuje editor enum hodnoty (instagram, youtube, facebook,
 * mail, twitter) na lucide-react komponenty. Neznámé klíče se v adapteru
 * defenzivně přeskočí.
 */

const ICON_MAP: Record<string, LucideIcon> = {
  instagram: Instagram,
  youtube: Youtube,
  facebook: Facebook,
  twitter: Twitter,
  mail: Mail,
};

export interface ContactMethod {
  label: string;
  displayText: string;
  Icon: LucideIcon;
  /** Když chybí, frontend vykreslí položku jako plain text (anti-spam). */
  url?: string;
  /** Drobný šedý řádek pod displayText. Hlavně pro e-mail (vysvětlivka). */
  notice?: string;
}

export interface ContactPageHeader {
  eyebrow: string;
  titleLead?: string;
  titleHighlight: string;
  subtitle: string;
}

export interface ContactPageData {
  pageHeader: ContactPageHeader;
  methods: ContactMethod[];
}

interface RawContactMethod {
  label: string;
  displayText: string;
  iconKey: string;
  url?: string;
  notice?: string;
}

interface RawContactPage {
  pageHeader?: {
    eyebrow?: string;
    titleLead?: string;
    titleHighlight?: string;
    subtitle?: string;
  };
  methods?: RawContactMethod[];
}

const QUERY = `*[_id == "contactPage"][0] {
  pageHeader {
    eyebrow,
    titleLead,
    titleHighlight,
    subtitle
  },
  "methods": methods[enabled != false] | order(coalesce(displayOrder, 9999) asc) {
    label,
    displayText,
    iconKey,
    url,
    notice
  }
}`;

/**
 * Local fallback derivovaný z `data/contact.ts`. Skládá `CONTACT.socials[]`
 * (Instagram, YouTube) s `CONTACT.email` do jednoho seznamu — e-mail jde
 * na konec, beze URL, s `notice` textem (anti-spam vysvětlivka).
 */
export const LOCAL_CONTACT_PAGE: ContactPageData = {
  pageHeader: {
    eyebrow: PAGES.contact.header.eyebrow,
    titleLead: PAGES.contact.header.titleLead,
    titleHighlight: PAGES.contact.header.titleHighlight,
    subtitle: PAGES.contact.header.subtitle,
  },
  methods: [
    ...LOCAL_CONTACT.socials.map((s) => ({
      label: s.label,
      displayText: s.handle,
      Icon: s.Icon,
      url: s.url,
    })),
    {
      label: LOCAL_CONTACT.email.label,
      displayText: LOCAL_CONTACT.email.obfuscated,
      Icon: Mail,
      notice: LOCAL_CONTACT.email.notice,
      // url záměrně undefined — anti-spam pattern (žádný `mailto:`)
    },
  ],
};

function mapToContactPage(raw: RawContactPage): ContactPageData {
  const mapped = (raw.methods ?? [])
    .map((m): ContactMethod | null => {
      const Icon = ICON_MAP[m.iconKey];
      if (!Icon) return null; // Defensive: drop unknown iconKey entries.
      return {
        label: m.label,
        displayText: m.displayText,
        Icon,
        url: m.url,
        notice: m.notice,
      };
    })
    .filter((m): m is ContactMethod => m !== null);
  return {
    pageHeader: {
      eyebrow:
        raw.pageHeader?.eyebrow ?? LOCAL_CONTACT_PAGE.pageHeader.eyebrow,
      titleLead:
        raw.pageHeader?.titleLead ?? LOCAL_CONTACT_PAGE.pageHeader.titleLead,
      titleHighlight:
        raw.pageHeader?.titleHighlight ??
        LOCAL_CONTACT_PAGE.pageHeader.titleHighlight,
      subtitle:
        raw.pageHeader?.subtitle ?? LOCAL_CONTACT_PAGE.pageHeader.subtitle,
    },
    // Methods: empty array is editor intent ("no methods to show"). Only fall
    // back to local when the field is missing entirely (undefined / null).
    methods: raw.methods == null ? LOCAL_CONTACT_PAGE.methods : mapped,
  };
}

export async function fetchContactPage(): Promise<ContactPageData> {
  if (!sanityClient) return LOCAL_CONTACT_PAGE;
  try {
    const raw = await sanityClient.fetch<RawContactPage | null>(QUERY);
    if (!raw) return LOCAL_CONTACT_PAGE;
    return mapToContactPage(raw);
  } catch (error) {
    console.error(
      '[contactPage] fetch failed, falling back to local data:',
      error,
    );
    return LOCAL_CONTACT_PAGE;
  }
}
