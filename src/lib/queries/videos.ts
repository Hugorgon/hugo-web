import { sanityClient } from '../sanity';
import {
  VIDEOS as LOCAL_VIDEOS,
  type Video,
  type VideoCategory,
  type VideoLanguage,
  type VideoTypeSlug,
} from '../../data/videos';

/**
 * Fetchery pro `Video` data — preferují Sanity, fallback na local `VIDEOS`.
 * Mirror existujícího patternu z `lib/queries/stories.ts`.
 *
 * Pravidlo fallbacku (přesně stejné jako u stories):
 *  - Sanity client nenakonfigurován → vrátí local
 *  - Sanity vrátí prázdné pole / 0 záznamů → vrátí local
 *  - Sanity throw / network error → vrátí local + console.error
 *  - Sanity vrátí data → adapter → frontend `Video`
 *
 * `fetchRelatedVideos` replikuje category-priority logiku z původního
 * `getRelatedVideos` v `src/data/videos.ts` — stejná kategorie napřed,
 * zbytek doplní mezeru do `limit`.
 *
 * GROQ projekce čte `youtubeUrl` ze Sanity schema (Phase C). Frontend `Video`
 * interface ho má jako volitelný; když chybí, detail stránky padá zpět na
 * statický náhled. `platform` zůstává pro Phase D+ (více providerů).
 */

interface RawVideo {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  language?: string;
  videoType?: string;
  imageUrl?: string;
  /**
   * GROQ deref `category->value.current`. Pro legacy videa, která mají
   * `category` stále jako string (před reference migrací), Sanity vrátí
   * null — taková videa pak vypadnou ze všech filter pillů a editor je
   * musí v Studiu manuálně překlinknout.
   */
  category: VideoCategory | null;
  publishedAt: string;
  youtubeUrl?: string;
}

// `category` je nyní reference na `videoCategory` dokument; derefujeme přímo
// na slug string, aby frontend mohl pokračovat ve stringovém srovnání
// `video.category === categoryEntry.value`.
const VIDEO_FIELDS = `
  "slug": slug.current,
  title,
  description,
  longDescription,
  language,
  videoType,
  "imageUrl": coverImage.asset->url,
  "category": category->value.current,
  publishedAt,
  youtubeUrl
`;

const LIST_QUERY = `*[_type == "video" && defined(slug.current)] | order(publishedAt desc) {${VIDEO_FIELDS}}`;

const BY_SLUG_QUERY = `*[_type == "video" && slug.current == $slug][0] {${VIDEO_FIELDS}}`;

// Defensive parsers — Sanity může vrátit neznámou hodnotu nebo null pro
// staré dokumenty před touto migrací. Padáme na default (CZ / short).
function parseLanguage(raw: string | undefined | null): VideoLanguage {
  return raw === 'EN' ? 'EN' : 'CZ';
}

function parseVideoType(raw: string | undefined | null): VideoTypeSlug {
  if (raw === 'video' || raw === 'long-video') return raw;
  return 'short';
}

function mapToVideo(raw: RawVideo): Video {
  return {
    slug: raw.slug,
    title: raw.title,
    description: raw.description,
    longDescription: raw.longDescription,
    language: parseLanguage(raw.language),
    videoType: parseVideoType(raw.videoType),
    imageUrl: raw.imageUrl ?? '',
    category: raw.category ?? '',
    publishedAt: raw.publishedAt,
    youtubeUrl: raw.youtubeUrl,
  };
}

export async function fetchVideos(): Promise<Video[]> {
  if (!sanityClient) return LOCAL_VIDEOS;
  try {
    const raw = await sanityClient.fetch<RawVideo[]>(LIST_QUERY);
    // Successful empty response = editor intent ("no videos published").
    // Only fall back to local seed on missing client / thrown error.
    return (raw ?? []).map(mapToVideo);
  } catch (error) {
    console.error('[videos] fetch failed, falling back to local data:', error);
    return LOCAL_VIDEOS;
  }
}

export async function fetchVideoBySlug(
  slug: string,
): Promise<Video | undefined> {
  const localMatch = LOCAL_VIDEOS.find((v) => v.slug === slug);
  if (!sanityClient) return localMatch;
  try {
    const raw = await sanityClient.fetch<RawVideo | null>(BY_SLUG_QUERY, {
      slug,
    });
    if (raw) return mapToVideo(raw);
    return localMatch;
  } catch (error) {
    console.error(
      `[videos] fetch by slug "${slug}" failed, falling back to local:`,
      error,
    );
    return localMatch;
  }
}

export async function fetchRelatedVideos(
  slug: string,
  limit = 3,
): Promise<Video[]> {
  // Category-priority order: stejná kategorie napřed, zbytek doplní mezeru.
  // Mirror logiky z `getRelatedVideos` v `src/data/videos.ts`.
  const all = await fetchVideos();
  const current = all.find((v) => v.slug === slug);
  const others = all.filter((v) => v.slug !== slug);
  if (!current) return others.slice(0, limit);

  const sameCategory = others.filter((v) => v.category === current.category);
  const otherCategory = others.filter((v) => v.category !== current.category);
  return [...sameCategory, ...otherCategory].slice(0, limit);
}
