import type { LucideIcon } from 'lucide-react';
import { Award, Heart, Star, Zap } from 'lucide-react';
import { sanityClient } from '../sanity';
import { ABOUT as LOCAL_ABOUT_LEGACY } from '../../data/about';
import { PAGES } from '../../data/pages';

/**
 * Fetcher pro `aboutPage` singleton — preferuje Sanity, fallback na lokální
 * `ABOUT` z `src/data/about.ts` + page header z `src/data/pages.ts`.
 * Mirror existujícího patternu z `homePage.ts` / `siteSettings.ts`.
 *
 * Fallback semantika:
 *  - Sanity client nenakonfigurován → vrátí local
 *  - Sanity vrátí null (singleton ještě nevytvořený) → vrátí local
 *  - Sanity throw / network error → vrátí local + console.error
 *
 * Adapter `mapToAboutPage` resolvuje `iconKey` enum (award/star/heart/zap)
 * na konkrétní lucide-react komponent přes `ICON_MAP`. Neznámé klíče se
 * defenzivně přeskočí, aby drift v Studio dropdown neshodil whole page.
 */

const ICON_MAP: Record<string, LucideIcon> = {
  award: Award,
  star: Star,
  heart: Heart,
  zap: Zap,
};

export interface AboutFeature {
  Icon: LucideIcon;
  title: string;
  description: string;
}

export interface AboutPageData {
  portrait: { imageUrl: string; alt: string };
  badge: { number: string; label: string };
  bioParagraphs: string[];
  features: AboutFeature[];
  homeSection: { title: string; titleHighlight: string; ctaLabel: string };
  pageHeader: {
    eyebrow: string;
    titleLead: string;
    titleHighlight: string;
    subtitle: string;
  };
  pageSection: { title: string; titleHighlight: string; extraParagraph: string };
  latestVideos: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    viewAllLabel: string;
  };
  latestStories: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    viewAllLabel: string;
  };
}

interface RawAboutFeature {
  iconKey: string;
  title: string;
  description: string;
}

interface RawAboutPage {
  portrait?: { imageUrl?: string; alt?: string };
  badge?: { number?: string; label?: string };
  bioParagraphs?: string[];
  features?: RawAboutFeature[];
  homeSection?: { title?: string; titleHighlight?: string; ctaLabel?: string };
  pageHeader?: {
    eyebrow?: string;
    titleLead?: string;
    titleHighlight?: string;
    subtitle?: string;
  };
  pageSection?: {
    title?: string;
    titleHighlight?: string;
    extraParagraph?: string;
  };
  latestVideos?: {
    title?: string;
    titleHighlight?: string;
    subtitle?: string;
    viewAllLabel?: string;
  };
  latestStories?: {
    title?: string;
    titleHighlight?: string;
    subtitle?: string;
    viewAllLabel?: string;
  };
}

const QUERY = `*[_id == "aboutPage"][0] {
  portrait {
    "imageUrl": image.asset->url,
    "alt": image.alt
  },
  badge,
  bioParagraphs,
  features[] {
    iconKey,
    title,
    description
  },
  homeSection,
  pageHeader,
  pageSection,
  latestVideos,
  latestStories
}`;

/** Local fallback derivovaný z `data/about.ts` + `data/pages.ts`. */
export const LOCAL_ABOUT: AboutPageData = {
  portrait: {
    imageUrl: LOCAL_ABOUT_LEGACY.portrait.imageUrl,
    alt: LOCAL_ABOUT_LEGACY.portrait.alt,
  },
  badge: {
    number: LOCAL_ABOUT_LEGACY.badge.number,
    label: LOCAL_ABOUT_LEGACY.badge.label,
  },
  bioParagraphs: [...LOCAL_ABOUT_LEGACY.bioParagraphs],
  features: LOCAL_ABOUT_LEGACY.features.map((f) => ({
    Icon: f.Icon,
    title: f.title,
    description: f.description,
  })),
  homeSection: {
    title: LOCAL_ABOUT_LEGACY.homeSection.title,
    titleHighlight: LOCAL_ABOUT_LEGACY.homeSection.titleHighlight,
    ctaLabel: LOCAL_ABOUT_LEGACY.homeSection.ctaLabel,
  },
  pageHeader: {
    eyebrow: PAGES.about.header.eyebrow,
    titleLead: PAGES.about.header.titleLead,
    titleHighlight: PAGES.about.header.titleHighlight,
    subtitle: PAGES.about.header.subtitle,
  },
  pageSection: {
    title: LOCAL_ABOUT_LEGACY.pageSection.title,
    titleHighlight: LOCAL_ABOUT_LEGACY.pageSection.titleHighlight,
    extraParagraph: LOCAL_ABOUT_LEGACY.pageSection.extraParagraph,
  },
  latestVideos: {
    title: LOCAL_ABOUT_LEGACY.latestVideos.title,
    titleHighlight: LOCAL_ABOUT_LEGACY.latestVideos.titleHighlight,
    subtitle: LOCAL_ABOUT_LEGACY.latestVideos.subtitle,
    viewAllLabel: LOCAL_ABOUT_LEGACY.latestVideos.viewAllLabel,
  },
  latestStories: {
    title: LOCAL_ABOUT_LEGACY.latestStories.title,
    titleHighlight: LOCAL_ABOUT_LEGACY.latestStories.titleHighlight,
    subtitle: LOCAL_ABOUT_LEGACY.latestStories.subtitle,
    viewAllLabel: LOCAL_ABOUT_LEGACY.latestStories.viewAllLabel,
  },
};

function mapFeatures(raw: RawAboutFeature[] | undefined): AboutFeature[] {
  const mapped = (raw ?? [])
    .map((f): AboutFeature | null => {
      const Icon = ICON_MAP[f.iconKey];
      if (!Icon) return null;
      return { Icon, title: f.title, description: f.description };
    })
    .filter((f): f is AboutFeature => f !== null);
  // If Studio document exists but features array is empty/unset, keep the
  // local fallback so the page never renders zero cards.
  return mapped.length > 0 ? mapped : LOCAL_ABOUT.features;
}

function mapToAboutPage(raw: RawAboutPage): AboutPageData {
  return {
    portrait: {
      imageUrl: raw.portrait?.imageUrl ?? LOCAL_ABOUT.portrait.imageUrl,
      alt: raw.portrait?.alt ?? LOCAL_ABOUT.portrait.alt,
    },
    badge: {
      number: raw.badge?.number ?? LOCAL_ABOUT.badge.number,
      label: raw.badge?.label ?? LOCAL_ABOUT.badge.label,
    },
    bioParagraphs:
      raw.bioParagraphs && raw.bioParagraphs.length > 0
        ? raw.bioParagraphs
        : LOCAL_ABOUT.bioParagraphs,
    features: mapFeatures(raw.features),
    homeSection: {
      title: raw.homeSection?.title ?? LOCAL_ABOUT.homeSection.title,
      titleHighlight:
        raw.homeSection?.titleHighlight ?? LOCAL_ABOUT.homeSection.titleHighlight,
      ctaLabel: raw.homeSection?.ctaLabel ?? LOCAL_ABOUT.homeSection.ctaLabel,
    },
    pageHeader: {
      eyebrow: raw.pageHeader?.eyebrow ?? LOCAL_ABOUT.pageHeader.eyebrow,
      titleLead: raw.pageHeader?.titleLead ?? LOCAL_ABOUT.pageHeader.titleLead,
      titleHighlight:
        raw.pageHeader?.titleHighlight ?? LOCAL_ABOUT.pageHeader.titleHighlight,
      subtitle: raw.pageHeader?.subtitle ?? LOCAL_ABOUT.pageHeader.subtitle,
    },
    pageSection: {
      title: raw.pageSection?.title ?? LOCAL_ABOUT.pageSection.title,
      titleHighlight:
        raw.pageSection?.titleHighlight ?? LOCAL_ABOUT.pageSection.titleHighlight,
      extraParagraph:
        raw.pageSection?.extraParagraph ?? LOCAL_ABOUT.pageSection.extraParagraph,
    },
    latestVideos: {
      title: raw.latestVideos?.title ?? LOCAL_ABOUT.latestVideos.title,
      titleHighlight:
        raw.latestVideos?.titleHighlight ?? LOCAL_ABOUT.latestVideos.titleHighlight,
      subtitle: raw.latestVideos?.subtitle ?? LOCAL_ABOUT.latestVideos.subtitle,
      viewAllLabel:
        raw.latestVideos?.viewAllLabel ?? LOCAL_ABOUT.latestVideos.viewAllLabel,
    },
    latestStories: {
      title: raw.latestStories?.title ?? LOCAL_ABOUT.latestStories.title,
      titleHighlight:
        raw.latestStories?.titleHighlight ?? LOCAL_ABOUT.latestStories.titleHighlight,
      subtitle: raw.latestStories?.subtitle ?? LOCAL_ABOUT.latestStories.subtitle,
      viewAllLabel:
        raw.latestStories?.viewAllLabel ?? LOCAL_ABOUT.latestStories.viewAllLabel,
    },
  };
}

export async function fetchAboutPage(): Promise<AboutPageData> {
  if (!sanityClient) return LOCAL_ABOUT;
  try {
    const raw = await sanityClient.fetch<RawAboutPage | null>(QUERY);
    if (!raw) return LOCAL_ABOUT;
    return mapToAboutPage(raw);
  } catch (error) {
    console.error('[aboutPage] fetch failed, falling back to local data:', error);
    return LOCAL_ABOUT;
  }
}
