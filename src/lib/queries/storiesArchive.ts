import { sanityClient } from '../sanity';
import { PAGES } from '../../data/pages';

/**
 * Fetcher pro `storiesArchive` singleton — preferuje Sanity, fallback na
 * `PAGES.stories.header` z `src/data/pages.ts`. Mirror patternu z
 * videosArchive / aboutPage / contactPage.
 *
 * Drží pouze hero hlavičku archivu — page size, load-more a render seznamu
 * řídí frontend.
 */

export interface StoriesArchivePageHeader {
  eyebrow: string;
  titleLead?: string;
  titleHighlight: string;
  subtitle: string;
}

export interface StoriesArchiveData {
  pageHeader: StoriesArchivePageHeader;
}

interface RawStoriesArchive {
  pageHeader?: {
    eyebrow?: string;
    titleLead?: string;
    titleHighlight?: string;
    subtitle?: string;
  };
}

const QUERY = `*[_id == "storiesArchive"][0] {
  pageHeader {
    eyebrow,
    titleLead,
    titleHighlight,
    subtitle
  }
}`;

/** Local fallback derivovaný z `data/pages.ts`. */
export const LOCAL_STORIES_ARCHIVE: StoriesArchiveData = {
  pageHeader: {
    eyebrow: PAGES.stories.header.eyebrow,
    titleLead: PAGES.stories.header.titleLead,
    titleHighlight: PAGES.stories.header.titleHighlight,
    subtitle: PAGES.stories.header.subtitle,
  },
};

function mapToStoriesArchive(raw: RawStoriesArchive): StoriesArchiveData {
  return {
    pageHeader: {
      eyebrow:
        raw.pageHeader?.eyebrow ?? LOCAL_STORIES_ARCHIVE.pageHeader.eyebrow,
      titleLead:
        raw.pageHeader?.titleLead ?? LOCAL_STORIES_ARCHIVE.pageHeader.titleLead,
      titleHighlight:
        raw.pageHeader?.titleHighlight ??
        LOCAL_STORIES_ARCHIVE.pageHeader.titleHighlight,
      subtitle:
        raw.pageHeader?.subtitle ?? LOCAL_STORIES_ARCHIVE.pageHeader.subtitle,
    },
  };
}

export async function fetchStoriesArchive(): Promise<StoriesArchiveData> {
  if (!sanityClient) return LOCAL_STORIES_ARCHIVE;
  try {
    const raw = await sanityClient.fetch<RawStoriesArchive | null>(QUERY);
    if (!raw) return LOCAL_STORIES_ARCHIVE;
    return mapToStoriesArchive(raw);
  } catch (error) {
    console.error(
      '[storiesArchive] fetch failed, falling back to local data:',
      error,
    );
    return LOCAL_STORIES_ARCHIVE;
  }
}
