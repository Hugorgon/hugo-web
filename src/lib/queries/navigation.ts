import type { LucideIcon } from 'lucide-react';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import { sanityClient } from '../sanity';
import {
  NAV_LINKS as LOCAL_NAV_LINKS,
  NAVBAR_CTA as LOCAL_NAVBAR_CTA,
  FOOTER_COLUMNS as LOCAL_FOOTER_COLUMNS,
  FOOTER_LEGAL_LINKS as LOCAL_FOOTER_LEGAL_LINKS,
  type NavLink,
  type FooterLink,
  type FooterSocialLink,
} from '../../data/navigation';

/**
 * Fetcher pro `navigation` singleton — preferuje Sanity, fallback na
 * lokální `NAV_LINKS` / `NAVBAR_CTA` / `FOOTER_COLUMNS` / `FOOTER_LEGAL_LINKS`.
 *
 * Adapter `mapToNavigation` převádí Sanity tvar (`target`, `iconKey`) na
 * frontendový tvar (`to`, `Icon` jako React komponent) — komponenty
 * Navbaru / Footeru si tak svůj prop kontrakt nemění.
 *
 * Fallback semantika je shodná s ostatními fetchery: prázdná Sanity →
 * local, error → local + console.error, no client → local.
 */

export interface NavigationData {
  navLinks: NavLink[];
  navbarCta: { label: string; to: string };
  footerColumns: {
    explore: { heading: string; links: FooterLink[] };
    categories: { heading: string; links: FooterLink[] };
    social: { heading: string; links: FooterSocialLink[] };
  };
  footerLegalLinks: FooterLink[];
}

/** Mapování `iconKey` enum (Sanity) na lucide-react komponent (frontend). */
const ICON_MAP: Record<string, LucideIcon> = {
  instagram: Instagram,
  youtube: Youtube,
  facebook: Facebook,
};

interface RawNavLink {
  label: string;
  kind: 'route' | 'hash';
  target: string;
}

interface RawFooterLink {
  label: string;
  target: string;
}

interface RawFooterSocialLink {
  label: string;
  href: string;
  iconKey: string;
}

interface RawNavigation {
  navLinks: RawNavLink[];
  navbarCta: { label: string; target: string };
  footerExplore: { heading: string; links: RawFooterLink[] };
  footerCategories: { heading: string; links: RawFooterLink[] };
  footerSocialColumn: { heading: string; links: RawFooterSocialLink[] };
  footerLegalLinks: RawFooterLink[];
}

const QUERY = `*[_id == "navigation"][0] {
  navLinks,
  navbarCta,
  footerExplore,
  footerCategories,
  footerSocialColumn,
  footerLegalLinks
}`;

function mapNavLink(raw: RawNavLink): NavLink {
  return raw.kind === 'hash'
    ? { kind: 'hash', to: raw.target, label: raw.label }
    : { kind: 'route', to: raw.target, label: raw.label };
}

function mapFooterLink(raw: RawFooterLink): FooterLink {
  return { to: raw.target, label: raw.label };
}

function mapNavigation(raw: RawNavigation): NavigationData {
  return {
    navLinks: (raw.navLinks ?? []).map(mapNavLink),
    navbarCta: {
      label: raw.navbarCta?.label ?? '',
      to: raw.navbarCta?.target ?? '',
    },
    footerColumns: {
      explore: {
        heading: raw.footerExplore?.heading ?? '',
        links: (raw.footerExplore?.links ?? []).map(mapFooterLink),
      },
      categories: {
        heading: raw.footerCategories?.heading ?? '',
        links: (raw.footerCategories?.links ?? []).map(mapFooterLink),
      },
      social: {
        heading: raw.footerSocialColumn?.heading ?? '',
        links: (raw.footerSocialColumn?.links ?? [])
          .map((l) => {
            const Icon = ICON_MAP[l.iconKey];
            if (!Icon) return null;
            return { href: l.href, label: l.label, Icon };
          })
          .filter((x): x is FooterSocialLink => x !== null),
      },
    },
    footerLegalLinks: (raw.footerLegalLinks ?? []).map(mapFooterLink),
  };
}

export const LOCAL_NAVIGATION: NavigationData = {
  navLinks: [...LOCAL_NAV_LINKS],
  navbarCta: { label: LOCAL_NAVBAR_CTA.label, to: LOCAL_NAVBAR_CTA.to },
  footerColumns: {
    explore: {
      heading: LOCAL_FOOTER_COLUMNS.explore.heading,
      links: [...LOCAL_FOOTER_COLUMNS.explore.links],
    },
    categories: {
      heading: LOCAL_FOOTER_COLUMNS.categories.heading,
      links: [...LOCAL_FOOTER_COLUMNS.categories.links],
    },
    social: {
      heading: LOCAL_FOOTER_COLUMNS.social.heading,
      links: [...LOCAL_FOOTER_COLUMNS.social.links],
    },
  },
  footerLegalLinks: [...LOCAL_FOOTER_LEGAL_LINKS],
};

export async function fetchNavigation(): Promise<NavigationData> {
  if (!sanityClient) return LOCAL_NAVIGATION;
  try {
    const raw = await sanityClient.fetch<RawNavigation | null>(QUERY);
    if (!raw) return LOCAL_NAVIGATION;
    return mapNavigation(raw);
  } catch (error) {
    console.error(
      '[navigation] fetch failed, falling back to local data:',
      error,
    );
    return LOCAL_NAVIGATION;
  }
}
