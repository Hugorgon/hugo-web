import { sanityClient } from '../sanity';
import {
  PHOTOS as LOCAL_PHOTOS,
  type Photo,
  type PhotoAspect,
  type PhotoCategory,
} from '../../data/photos';

/**
 * Fetcher pro `Photo` collection — preferuje Sanity, fallback na lokální
 * `PHOTOS` z `src/data/photos.ts`. Mirror existujícího patternu z
 * `lib/queries/stories.ts` / `videos.ts`.
 *
 * Pravidlo fallbacku:
 *  - Sanity client nenakonfigurován → vrátí local
 *  - Sanity vrátí prázdné pole / 0 záznamů → vrátí local
 *  - Sanity throw / network error → vrátí local + console.error
 *  - Sanity vrátí data → adapter → frontend `Photo`
 *
 * GROQ ordering: `displayOrder asc` jako primární klíč (s coalesce na 9999
 * pro null hodnoty, takže fotky bez displayOrder padají na konec), pak
 * `date desc` jako tiebreaker. Mirror logiky z editor expectations.
 */

interface RawPhoto {
  id: string;
  imageUrl?: string;
  caption: string;
  date: string;
  category?: PhotoCategory;
  aspect: PhotoAspect;
}

const PHOTO_FIELDS = `
  "id": slug.current,
  caption,
  "imageUrl": image.asset->url,
  date,
  category,
  aspect
`;

// `displayOrder asc` s coalesce(displayOrder, 9999) → null hodnoty na konec,
// pak `date desc` jako tiebreaker.
const LIST_QUERY = `*[_type == "photo" && defined(slug.current)] | order(coalesce(displayOrder, 9999) asc, date desc) {${PHOTO_FIELDS}}`;

function mapToPhoto(raw: RawPhoto): Photo {
  return {
    id: raw.id,
    imageUrl: raw.imageUrl ?? '',
    caption: raw.caption,
    date: raw.date,
    category: raw.category,
    aspect: raw.aspect,
  };
}

export async function fetchPhotos(): Promise<Photo[]> {
  if (!sanityClient) return LOCAL_PHOTOS;
  try {
    const raw = await sanityClient.fetch<RawPhoto[]>(LIST_QUERY);
    if (!raw || raw.length === 0) return LOCAL_PHOTOS;
    return raw.map(mapToPhoto);
  } catch (error) {
    console.error('[photos] fetch failed, falling back to local data:', error);
    return LOCAL_PHOTOS;
  }
}
