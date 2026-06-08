import { sanityClient } from '../sanity';
import { formatDate } from '../format';
import { STORIES as LOCAL_STORIES, type Story } from '../../data/stories';

/**
 * Fetchery pro `Story` data — preferují Sanity, fallback na local `STORIES`.
 *
 * Adapter `mapToStory` mapuje Sanity shape (slug objekt, ISO datum, image asset
 * reference) na existující `Story` interface, takže card komponenty a render
 * logika se nemění.
 *
 * Pravidlo fallbacku:
 *  - Sanity client nenakonfigurován → vrátí local
 *  - Sanity throw / network error → vrátí local + console.error
 *  - Sanity vrátí data (i prázdné pole) → adapter → frontend Story.
 *    Prázdné pole je validní editor intent („žádné stories publikované")
 *    a frontend zobrazí existující empty-state copy.
 *
 * Visual continuity: konzumenti drží initial state z local fallbacku
 * a teprve po async fetchi přepíšou stav na Sanity data.
 */

interface RawStory {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  imageUrl?: string;
  body: string;
}

const STORY_FIELDS = `
  "slug": slug.current,
  title,
  excerpt,
  publishedAt,
  readTime,
  "imageUrl": coverImage.asset->url,
  body
`;

const LIST_QUERY = `*[_type == "story" && defined(slug.current)] | order(publishedAt desc) {${STORY_FIELDS}}`;

const BY_SLUG_QUERY = `*[_type == "story" && slug.current == $slug][0] {${STORY_FIELDS}}`;

function mapToStory(raw: RawStory): Story {
  return {
    slug: raw.slug,
    title: raw.title,
    excerpt: raw.excerpt,
    date: formatDate(raw.publishedAt),
    readTime: raw.readTime,
    imageUrl: raw.imageUrl ?? '',
    body: raw.body,
  };
}

export async function fetchStories(): Promise<Story[]> {
  if (!sanityClient) return LOCAL_STORIES;
  try {
    const raw = await sanityClient.fetch<RawStory[]>(LIST_QUERY);
    return (raw ?? []).map(mapToStory);
  } catch (error) {
    console.error('[stories] fetch failed, falling back to local data:', error);
    return LOCAL_STORIES;
  }
}

export async function fetchStoryBySlug(slug: string): Promise<Story | undefined> {
  if (!sanityClient) return undefined;
  try {
    const raw = await sanityClient.fetch<RawStory | null>(BY_SLUG_QUERY, { slug });
    if (raw) return mapToStory(raw);
    return undefined;
  } catch (error) {
    console.error(
      `[stories] fetch by slug "${slug}" failed:`,
      error,
    );
    return undefined;
  }
}

export async function fetchRelatedStories(
  slug: string,
  limit = 3,
): Promise<Story[]> {
  const all = await fetchStories();
  return all.filter((s) => s.slug !== slug).slice(0, limit);
}
