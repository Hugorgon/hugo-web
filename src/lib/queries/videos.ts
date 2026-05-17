import { sanityClient } from '../sanity';
import {
  VIDEOS as LOCAL_VIDEOS,
  type Video,
  type VideoCategory,
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
 * GROQ projekce zatím NEČTE pole `youtubeUrl` a `platform` ze Sanity schema —
 * frontend `Video` interface je o tyhle pole nevyžaduje a Phase B je čistá
 * infrastruktura bez consumer touch. Když Phase C+ začne renderovat embed,
 * projekce + adapter se rozšíří v jednom kroku s úpravou interface.
 *
 * Žádný consumer tenhle soubor zatím neimportuje — záměrné. Infrastruktura
 * existuje, frontend ji připojí v navazujícím Phase C.
 */

interface RawVideo {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  duration: string;
  views?: string;
  imageUrl?: string;
  category: VideoCategory;
  publishedAt: string;
}

const VIDEO_FIELDS = `
  "slug": slug.current,
  title,
  description,
  longDescription,
  duration,
  views,
  "imageUrl": coverImage.asset->url,
  category,
  publishedAt
`;

const LIST_QUERY = `*[_type == "video" && defined(slug.current)] | order(publishedAt desc) {${VIDEO_FIELDS}}`;

const BY_SLUG_QUERY = `*[_type == "video" && slug.current == $slug][0] {${VIDEO_FIELDS}}`;

function mapToVideo(raw: RawVideo): Video {
  return {
    slug: raw.slug,
    title: raw.title,
    description: raw.description,
    longDescription: raw.longDescription,
    duration: raw.duration,
    views: raw.views ?? '',
    imageUrl: raw.imageUrl ?? '',
    category: raw.category,
    publishedAt: raw.publishedAt,
  };
}

export async function fetchVideos(): Promise<Video[]> {
  if (!sanityClient) return LOCAL_VIDEOS;
  try {
    const raw = await sanityClient.fetch<RawVideo[]>(LIST_QUERY);
    if (!raw || raw.length === 0) return LOCAL_VIDEOS;
    return raw.map(mapToVideo);
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
