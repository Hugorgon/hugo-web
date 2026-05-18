import { sanityClient } from '../sanity';
import { HOME as LEGACY_HOME } from '../../data/home';

/**
 * Fetcher pro `homePage` singleton — preferuje Sanity, fallback na
 * `LOCAL_HOME` derivovaný z `src/data/home.ts`.
 *
 * Migrované sekce:
 *  - hero            → eyebrow, title (lead + highlight), bio, primary/secondary CTA,
 *                       backgroundImage (url + alt), stats[]
 *  - featuredVideos  → title, titleHighlight, subtitle, viewAllLabel
 *  - storiesGrid     → title, titleHighlight, subtitle, loadMoreLabel
 *  - socialContent   → title, titleHighlight, subtitle (platforms[] zůstávají local)
 *  - newsletter      → heading, lead, inputPlaceholder, inputAriaLabel,
 *                       submitLabel, checks[]
 *
 * Categories a SocialContent.platforms array nejsou součástí tohoto
 * singletonu — komponenty Categories.tsx a část SocialContent.tsx
 * pořád čtou z `HOME.*` v `src/data/home.ts`.
 *
 * Fallback semantika je shodná s ostatními fetchery: prázdná Sanity →
 * local, error → local + console.error, no client → local.
 */

export interface HomePageHeroStat {
  end: number;
  suffix: string;
  label: string;
  subtext: string;
  delay: number;
}

export interface HomePageHero {
  eyebrow: string;
  title: string;
  titleHighlight: string;
  bio: string;
  primaryCta: string;
  secondaryCta: string;
  backgroundImage: { url: string; alt: string };
  stats: HomePageHeroStat[];
}

export interface HomePageSectionCopy {
  title: string;
  titleHighlight: string;
  subtitle: string;
}

export interface HomePageData {
  hero: HomePageHero;
  featuredVideos: HomePageSectionCopy & { viewAllLabel: string };
  storiesGrid: HomePageSectionCopy & { loadMoreLabel: string };
  socialContent: HomePageSectionCopy;
  newsletter: {
    heading: string;
    lead: string;
    inputPlaceholder: string;
    inputAriaLabel: string;
    submitLabel: string;
    checks: string[];
  };
}

interface RawHomePage {
  hero: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    bio: string;
    primaryCta: string;
    secondaryCta: string;
    backgroundImage?: { url?: string; alt?: string };
    stats: HomePageHeroStat[];
  };
  featuredVideos: HomePageData['featuredVideos'];
  storiesGrid: HomePageData['storiesGrid'];
  socialContent: HomePageSectionCopy;
  newsletter: HomePageData['newsletter'];
}

const QUERY = `*[_id == "homePage"][0] {
  hero {
    eyebrow,
    title,
    titleHighlight,
    bio,
    primaryCta,
    secondaryCta,
    "backgroundImage": {
      "url": backgroundImage.asset->url,
      "alt": backgroundImage.alt
    },
    stats[] {
      end,
      suffix,
      label,
      subtext,
      delay
    }
  },
  featuredVideos {
    title,
    titleHighlight,
    subtitle,
    viewAllLabel
  },
  storiesGrid {
    title,
    titleHighlight,
    subtitle,
    loadMoreLabel
  },
  socialContent {
    title,
    titleHighlight,
    subtitle
  },
  newsletter {
    heading,
    lead,
    inputPlaceholder,
    inputAriaLabel,
    submitLabel,
    checks
  }
}`;

/** Local fallback derivovaný z `src/data/home.ts` + hardcoded bg image. */
export const LOCAL_HOME: HomePageData = {
  hero: {
    eyebrow: LEGACY_HOME.hero.eyebrow,
    title: LEGACY_HOME.hero.title,
    titleHighlight: LEGACY_HOME.hero.titleHighlight,
    bio: LEGACY_HOME.hero.bio,
    primaryCta: LEGACY_HOME.hero.primaryCta,
    secondaryCta: LEGACY_HOME.hero.secondaryCta,
    backgroundImage: {
      url: '/images/hugo.jpg',
      alt: 'Hugo, bostonský teriér',
    },
    stats: LEGACY_HOME.hero.stats.map((s) => ({
      end: s.end,
      suffix: s.suffix,
      label: s.label,
      subtext: s.subtext,
      delay: s.delay,
    })),
  },
  featuredVideos: { ...LEGACY_HOME.featuredVideos },
  storiesGrid: { ...LEGACY_HOME.storiesGrid },
  socialContent: {
    title: LEGACY_HOME.socialContent.title,
    titleHighlight: LEGACY_HOME.socialContent.titleHighlight,
    subtitle: LEGACY_HOME.socialContent.subtitle,
  },
  newsletter: {
    heading: LEGACY_HOME.newsletter.heading,
    lead: LEGACY_HOME.newsletter.lead,
    inputPlaceholder: LEGACY_HOME.newsletter.inputPlaceholder,
    inputAriaLabel: LEGACY_HOME.newsletter.inputAriaLabel,
    submitLabel: LEGACY_HOME.newsletter.submitLabel,
    checks: [...LEGACY_HOME.newsletter.checks],
  },
};

function mapHomePage(raw: RawHomePage): HomePageData {
  return {
    hero: {
      eyebrow: raw.hero.eyebrow,
      title: raw.hero.title,
      titleHighlight: raw.hero.titleHighlight,
      bio: raw.hero.bio,
      primaryCta: raw.hero.primaryCta,
      secondaryCta: raw.hero.secondaryCta,
      backgroundImage: {
        url: raw.hero.backgroundImage?.url ?? LOCAL_HOME.hero.backgroundImage.url,
        alt: raw.hero.backgroundImage?.alt ?? LOCAL_HOME.hero.backgroundImage.alt,
      },
      stats: (raw.hero.stats ?? []).map((s) => ({
        end: s.end,
        suffix: s.suffix ?? '',
        label: s.label,
        subtext: s.subtext,
        delay: s.delay,
      })),
    },
    featuredVideos: { ...raw.featuredVideos },
    storiesGrid: { ...raw.storiesGrid },
    socialContent: { ...raw.socialContent },
    newsletter: {
      ...raw.newsletter,
      checks: raw.newsletter.checks ?? [],
    },
  };
}

export async function fetchHomePage(): Promise<HomePageData> {
  if (!sanityClient) return LOCAL_HOME;
  try {
    const raw = await sanityClient.fetch<RawHomePage | null>(QUERY);
    if (!raw) return LOCAL_HOME;
    return mapHomePage(raw);
  } catch (error) {
    console.error('[homePage] fetch failed, falling back to local data:', error);
    return LOCAL_HOME;
  }
}
