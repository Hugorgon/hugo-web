import { createClient, type SanityClient } from '@sanity/client';

/**
 * Sdílený Sanity client pro frontend.
 *
 * Env vars sdílí stejné názvy se Studiem (`/studio/.env.local`):
 *   - SANITY_STUDIO_PROJECT_ID
 *   - SANITY_STUDIO_DATASET   (default „production")
 *
 * Vite je propustí přes `envPrefix: ['VITE_', 'SANITY_STUDIO_']`
 * ve `vite.config.ts`. Žádné přejmenování, žádný `VITE_` clone.
 *
 * Bez `SANITY_STUDIO_PROJECT_ID` se client nezakládá — `isSanityConfigured`
 * vrátí false a fetchery padají přímo na local fallback v `src/data/`.
 * Visual stejný jako před migrací.
 */

const projectId = import.meta.env.SANITY_STUDIO_PROJECT_ID;
const dataset = import.meta.env.SANITY_STUDIO_DATASET || 'production';

export const isSanityConfigured: boolean = Boolean(projectId);

export const sanityClient: SanityClient | null = projectId
  ? createClient({
      projectId,
      dataset,
      useCdn: true,
      apiVersion: '2024-01-01',
    })
  : null;
