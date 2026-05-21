import type { LucideIcon } from 'lucide-react';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import { ROUTES } from './routes';

/**
 * Veškerá navigace projektu — top navbar, footer kolony a copyright legal links.
 * Komponenty pouze konzumují tato pole; nepřidávají vlastní statické položky.
 */

export type NavLink =
  | { kind: 'route'; to: string; label: string }
  | { kind: 'hash'; to: string; label: string };

export interface FooterLink {
  to: string;
  label: string;
}

export interface FooterSocialLink {
  href: string;
  label: string;
  Icon: LucideIcon;
}

/** Hlavní položky v navbar — pořadí drží jeho vizuální layout. */
// Newsletter entry intentionally omitted while the Newsletter section is
// hidden from the public site (see HomePage). Add it back here when the
// section is re-enabled.
export const NAV_LINKS: readonly NavLink[] = [
  { kind: 'route', to: ROUTES.videos, label: 'Videa' },
  { kind: 'route', to: ROUTES.stories, label: 'Příběhy' },
  { kind: 'route', to: ROUTES.gallery, label: 'Fotky' },
  { kind: 'route', to: ROUTES.about, label: 'O mně' },
] as const;

/** CTA tlačítko v pravé části navbaru a v mobilním menu. */
// Repointed from `newsletterAnchor` to `contact` while Newsletter is hidden.
// Semantically „Sleduj Huga" = „Follow Hugo" → Contact lists the channels.
export const NAVBAR_CTA = {
  to: ROUTES.contact,
  label: 'Sleduj Huga',
} as const;

/** Footer kolony — heading + odkazy. Renderuje LinkColumn ve Footer.tsx. */
export const FOOTER_COLUMNS = {
  explore: {
    heading: 'Procházet',
    // Newsletter entry omitted while the Newsletter section is hidden.
    links: [
      { to: ROUTES.videos, label: 'Videa' },
      { to: ROUTES.stories, label: 'Příběhy' },
      { to: ROUTES.gallery, label: 'Fotky' },
      { to: ROUTES.about, label: 'O Hugovi' },
    ] satisfies FooterLink[],
  },
  categories: {
    heading: 'Kategorie',
    links: [
      { to: ROUTES.videos, label: 'Dobrodružství' },
      { to: ROUTES.videos, label: 'Všední den' },
      { to: ROUTES.videos, label: 'Komentáře' },
      { to: ROUTES.videos, label: 'Návody' },
    ] satisfies FooterLink[],
  },
  social: {
    heading: 'Sledujte Huga',
    links: [
      { href: 'https://instagram.com/hugorgon', label: 'Instagram', Icon: Instagram },
      { href: 'https://youtube.com/@Hugorgon', label: 'YouTube', Icon: Youtube },
      { href: '#', label: 'Facebook', Icon: Facebook },
    ] satisfies FooterSocialLink[],
  },
} as const;

/** Legal odkazy ve spodním řádku Footeru. */
export const FOOTER_LEGAL_LINKS: readonly FooterLink[] = [
  { to: ROUTES.privacy, label: 'Zásady ochrany soukromí' },
  { to: ROUTES.terms, label: 'Podmínky používání' },
  { to: ROUTES.contact, label: 'Kontakt' },
] as const;
