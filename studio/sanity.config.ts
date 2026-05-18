import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { deskStructure, SINGLETON_TYPES } from './structure';

/**
 * Hlavní konfigurace Sanity Studio pro Hugo Stories.
 *
 * - `structureTool` s custom `deskStructure` — singletons (`siteSettings`,
 *   `navigation`) jsou přístupné jako přímé odkazy na jediný dokument,
 *   collection types (`story`, `video`, ...) zůstávají v listing módu.
 * - `visionTool` — GROQ playground pro psaní/testování queries.
 * - `document.actions` / `newDocumentOptions` — zákaz „Create new",
 *   „Duplicate" a „Delete" pro singleton typy, aby editor nemohl
 *   omylem vytvořit duplicitní instance.
 */
export default defineConfig({
  name: 'hugo-stories',
  title: 'Hugo Stories',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [structureTool({ structure: deskStructure }), visionTool()],

  schema: {
    types: schemaTypes,
  },

  document: {
    // Skryj singleton typy z globální „Create new" nabídky.
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter(
          (option) => !SINGLETON_TYPES.has(option.templateId ?? ''),
        );
      }
      return prev;
    },
    // Zablokuj „Duplicate" a „Delete" akce u singleton dokumentů.
    actions: (prev, { schemaType }) => {
      if (SINGLETON_TYPES.has(schemaType)) {
        return prev.filter(
          ({ action }) => action !== 'duplicate' && action !== 'delete',
        );
      }
      return prev;
    },
  },
});
