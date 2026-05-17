import { defineCliConfig } from 'sanity/cli';

/**
 * CLI konfigurace pro `sanity` příkazy (dev, build, deploy).
 * Project ID a dataset se čtou z `.env.local` (viz `.env.example`).
 */
export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
});
