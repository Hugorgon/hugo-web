import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

/**
 * Hlavní konfigurace Sanity Studio pro Hugo Stories.
 *
 * - `structureTool` — defaultní content view (seznam dokumentů per type).
 * - `visionTool` — GROQ playground pro psaní/testování queries.
 *
 * Studio běží samostatně (`npm run dev` na portu 3333) a nesdílí build
 * s hlavním frontendem v `/src`. Frontend se na Sanity zatím nenapojuje —
 * tahle fáze je čistě editor + schema definice.
 */
export default defineConfig({
  name: 'hugo-stories',
  title: 'Hugo Stories',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
