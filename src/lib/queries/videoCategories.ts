import type { LucideIcon } from 'lucide-react';
import {
  Camera,
  Compass,
  Eye,
  GraduationCap,
  Home as HomeIcon,
  MessageCircle,
  Search,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react';
import { sanityClient } from '../sanity';
import { VIDEO_CATEGORY_FALLBACK } from '../../data/videos';

/**
 * Fetcher pro `videoCategory` collection — preferuje Sanity, fallback na
 * `VIDEO_CATEGORY_FALLBACK` z `src/data/videos.ts`. Mirror existujícího
 * patternu z homePage / aboutPage / contactPage fetcherů.
 *
 * Pravidla:
 *  - GROQ: `enabled != false`, řazení `coalesce(displayOrder, 9999) asc`,
 *    pak `title asc` jako tiebreaker.
 *  - Neznámý `iconKey` → karta se defenzivně přeskočí.
 *  - Sanity vrátí prázdný seznam → fallback na local set, aby web nikdy
 *    nerenderoval žádné kategorie.
 *
 * Frontend interface `VideoCategoryEntry` dorovnává `VIDEO_CATEGORY_FALLBACK`
 * z `data/videos.ts`, ale `Icon` (lucide komponent) místo `iconKey` (string).
 * Icon se resolvuje v adapteru přes `ICON_MAP`.
 */

const ICON_MAP: Record<string, LucideIcon> = {
  eye: Eye,
  camera: Camera,
  users: Users,
  sparkles: Sparkles,
  compass: Compass,
  home: HomeIcon,
  messageCircle: MessageCircle,
  graduationCap: GraduationCap,
  search: Search,
  zap: Zap,
};

export interface VideoCategoryEntry {
  value: string;
  title: string;
  description: string;
  Icon: LucideIcon;
}

interface RawVideoCategory {
  value: string;
  title: string;
  description: string;
  iconKey: string;
}

const QUERY = `*[_type == "videoCategory" && enabled != false] | order(coalesce(displayOrder, 9999) asc, title asc) {
  "value": value.current,
  title,
  description,
  iconKey
}`;

/** Local fallback derivovaný z `VIDEO_CATEGORY_FALLBACK`. */
export const LOCAL_VIDEO_CATEGORIES: VideoCategoryEntry[] =
  VIDEO_CATEGORY_FALLBACK.filter((c) => c.enabled !== false).map((c) => ({
    value: c.value,
    title: c.title,
    description: c.description,
    Icon: ICON_MAP[c.iconKey] ?? Eye,
  }));

function mapToCategories(raw: RawVideoCategory[]): VideoCategoryEntry[] {
  // Empty input is editor intent (no categories published). Drop entries with
  // unknown iconKey defensively, but do NOT substitute the local seed —
  // returning the literal mapped result lets the consumer render its
  // empty-state copy.
  return (raw ?? [])
    .map((c): VideoCategoryEntry | null => {
      const Icon = ICON_MAP[c.iconKey];
      if (!Icon || !c.value) return null;
      return {
        value: c.value,
        title: c.title,
        description: c.description,
        Icon,
      };
    })
    .filter((c): c is VideoCategoryEntry => c !== null);
}

export async function fetchVideoCategories(): Promise<VideoCategoryEntry[]> {
  if (!sanityClient) return LOCAL_VIDEO_CATEGORIES;
  try {
    const raw = await sanityClient.fetch<RawVideoCategory[]>(QUERY);
    return mapToCategories(raw ?? []);
  } catch (error) {
    console.error(
      '[videoCategories] fetch failed, falling back to local data:',
      error,
    );
    return LOCAL_VIDEO_CATEGORIES;
  }
}

/**
 * Najde lidsky čitelný název kategorie pro daný slug v dodaném seznamu.
 * Když slug žádné kategorii neodpovídá (např. disabled / smazaná kategorie,
 * nebo legacy video se starým string hodnotou), vrátí slug zpátky — badge
 * tak nikdy není prázdný, ale ukáže přinejhorším původní hodnotu místo titulku.
 */
export function getCategoryTitle(
  value: string | undefined | null,
  categories: readonly VideoCategoryEntry[],
): string {
  if (!value) return '';
  return categories.find((c) => c.value === value)?.title ?? value;
}
