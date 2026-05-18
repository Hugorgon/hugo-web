import { sanityClient } from '../sanity';
import { SITE as LOCAL_SITE } from '../../data/site';

/**
 * Fetcher pro `siteSettings` singleton — preferuje Sanity, fallback na
 * `SITE` z `src/data/site.ts`. Mirror existujícího patternu z
 * `lib/queries/stories.ts` / `videos.ts`.
 *
 * Fallback semantika:
 *  - Sanity client nenakonfigurován → vrátí local
 *  - Sanity vrátí null (singleton ještě nevytvořený) → vrátí local
 *  - Sanity throw / network error → vrátí local + console.error
 */

export interface SiteSettings {
  brand: { name: string; suffix: string };
  description: string;
  copyright: string;
}

interface RawSiteSettings {
  brandName: string;
  brandSuffix: string;
  description: string;
  copyright: string;
}

const QUERY = `*[_id == "siteSettings"][0] {
  brandName,
  brandSuffix,
  description,
  copyright
}`;

function mapToSiteSettings(raw: RawSiteSettings): SiteSettings {
  return {
    brand: { name: raw.brandName, suffix: raw.brandSuffix },
    description: raw.description,
    copyright: raw.copyright,
  };
}

export const LOCAL_SITE_SETTINGS: SiteSettings = {
  brand: { name: LOCAL_SITE.brand.name, suffix: LOCAL_SITE.brand.suffix },
  description: LOCAL_SITE.description,
  copyright: LOCAL_SITE.copyright,
};

export async function fetchSiteSettings(): Promise<SiteSettings> {
  if (!sanityClient) return LOCAL_SITE_SETTINGS;
  try {
    const raw = await sanityClient.fetch<RawSiteSettings | null>(QUERY);
    if (!raw) return LOCAL_SITE_SETTINGS;
    return mapToSiteSettings(raw);
  } catch (error) {
    console.error(
      '[siteSettings] fetch failed, falling back to local data:',
      error,
    );
    return LOCAL_SITE_SETTINGS;
  }
}
