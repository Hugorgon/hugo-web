/**
 * Generate dist/sitemap.xml after `vite build`.
 * Invoked via: tsx scripts/generate-sitemap.ts
 *
 * - Reads SANITY_STUDIO_PROJECT_ID / SANITY_STUDIO_DATASET from process.env
 *   (same vars used by the Vite frontend and Sanity Studio)
 * - Fetches all published story + video slugs from Sanity
 * - Falls back gracefully to static-routes-only if Sanity is unavailable
 * - Never imports from src/ (those modules use import.meta.env, not process.env)
 */

import { createClient } from '@sanity/client';
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const SITE_URL = 'https://hugorgon.com';

const STATIC_ROUTES = [
  { path: '/',                   priority: '1.0', changefreq: 'weekly'  },
  { path: '/videos',             priority: '0.9', changefreq: 'daily'   },
  { path: '/stories',            priority: '0.9', changefreq: 'daily'   },
  { path: '/fotogalerie',        priority: '0.7', changefreq: 'weekly'  },
  { path: '/o-mne',              priority: '0.6', changefreq: 'monthly' },
  { path: '/kontakt',            priority: '0.5', changefreq: 'monthly' },
  { path: '/zasady-soukromi',    priority: '0.2', changefreq: 'yearly'  },
  { path: '/podminky-pouzivani', priority: '0.2', changefreq: 'yearly'  },
] as const;

interface SlugResult {
  slug: string;
}

async function fetchSlugs(
  projectId: string,
  dataset: string,
  type: 'story' | 'video',
): Promise<string[]> {
  const client = createClient({
    projectId,
    dataset,
    useCdn: true,
    apiVersion: '2024-01-01',
  });
  const query = `*[_type == "${type}" && defined(slug.current)] | order(publishedAt desc) { "slug": slug.current }`;
  const results = await client.fetch<SlugResult[]>(query);
  return (results ?? []).map((r) => r.slug).filter(Boolean);
}

function buildXml(
  entries: Array<{ loc: string; priority: string; changefreq: string }>,
): string {
  const today = new Date().toISOString().slice(0, 10);
  const urlBlocks = entries
    .map(
      ({ loc, priority, changefreq }) =>
        `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`,
    )
    .join('\n');
  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `${urlBlocks}\n` +
    `</urlset>\n`
  );
}

async function main(): Promise<void> {
  console.log('[sitemap] Generating sitemap.xml…');

  const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
  const dataset = process.env.SANITY_STUDIO_DATASET ?? 'production';

  // Build entry list — static routes first
  const entries: Array<{ loc: string; priority: string; changefreq: string }> =
    STATIC_ROUTES.map(({ path, priority, changefreq }) => ({
      loc: `${SITE_URL}${path}`,
      priority,
      changefreq,
    }));

  // Dynamic routes from Sanity
  if (projectId) {
    try {
      const [storySlugs, videoSlugs] = await Promise.all([
        fetchSlugs(projectId, dataset, 'story'),
        fetchSlugs(projectId, dataset, 'video'),
      ]);

      for (const slug of storySlugs) {
        entries.push({
          loc: `${SITE_URL}/stories/${slug}`,
          priority: '0.8',
          changefreq: 'weekly',
        });
      }
      for (const slug of videoSlugs) {
        entries.push({
          loc: `${SITE_URL}/videos/${slug}`,
          priority: '0.8',
          changefreq: 'weekly',
        });
      }

      console.log(
        `[sitemap]   + ${storySlugs.length} stories, ${videoSlugs.length} videos`,
      );
    } catch (err) {
      console.warn(
        '[sitemap] ⚠  Sanity fetch failed — sitemap contains static routes only.',
      );
      console.warn(err instanceof Error ? err.message : String(err));
      // Non-fatal: static sitemap is still written below
    }
  } else {
    console.warn(
      '[sitemap] ⚠  SANITY_STUDIO_PROJECT_ID not set — sitemap contains static routes only.',
    );
  }

  // Write output to dist/sitemap.xml
  const distDir = resolve(process.cwd(), 'dist');
  mkdirSync(distDir, { recursive: true });
  writeFileSync(resolve(distDir, 'sitemap.xml'), buildXml(entries), 'utf8');
  console.log(`[sitemap] ✓ Written ${entries.length} URLs → dist/sitemap.xml`);
}

main().catch((err) => {
  console.error('[sitemap] Fatal error:', err);
  process.exit(1);
});
