import { sanityClient } from '../sanity';
import { PAGES } from '../../data/pages';

/**
 * Fetcher pro `videosArchive` singleton — preferuje Sanity, fallback na
 * `PAGES.videos.header` z `src/data/pages.ts`. Mirror patternu z
 * aboutPage / contactPage / homePage.
 *
 * Drží pouze hero hlavičku archivu — page size, filter logiku a paginaci
 * řídí frontend.
 */

export interface VideosArchivePageHeader {
  eyebrow: string;
  titleLead?: string;
  titleHighlight: string;
  subtitle: string;
}

export interface VideosArchiveData {
  pageHeader: VideosArchivePageHeader;
}

interface RawVideosArchive {
  pageHeader?: {
    eyebrow?: string;
    titleLead?: string;
    titleHighlight?: string;
    subtitle?: string;
  };
}

const QUERY = `*[_id == "videosArchive"][0] {
  pageHeader {
    eyebrow,
    titleLead,
    titleHighlight,
    subtitle
  }
}`;

/** Local fallback derivovaný z `data/pages.ts`. */
export const LOCAL_VIDEOS_ARCHIVE: VideosArchiveData = {
  pageHeader: {
    eyebrow: PAGES.videos.header.eyebrow,
    titleLead: PAGES.videos.header.titleLead,
    titleHighlight: PAGES.videos.header.titleHighlight,
    subtitle: PAGES.videos.header.subtitle,
  },
};

function mapToVideosArchive(raw: RawVideosArchive): VideosArchiveData {
  return {
    pageHeader: {
      eyebrow: raw.pageHeader?.eyebrow ?? LOCAL_VIDEOS_ARCHIVE.pageHeader.eyebrow,
      titleLead:
        raw.pageHeader?.titleLead ?? LOCAL_VIDEOS_ARCHIVE.pageHeader.titleLead,
      titleHighlight:
        raw.pageHeader?.titleHighlight ??
        LOCAL_VIDEOS_ARCHIVE.pageHeader.titleHighlight,
      subtitle:
        raw.pageHeader?.subtitle ?? LOCAL_VIDEOS_ARCHIVE.pageHeader.subtitle,
    },
  };
}

export async function fetchVideosArchive(): Promise<VideosArchiveData> {
  if (!sanityClient) return LOCAL_VIDEOS_ARCHIVE;
  try {
    const raw = await sanityClient.fetch<RawVideosArchive | null>(QUERY);
    if (!raw) return LOCAL_VIDEOS_ARCHIVE;
    return mapToVideosArchive(raw);
  } catch (error) {
    console.error(
      '[videosArchive] fetch failed, falling back to local data:',
      error,
    );
    return LOCAL_VIDEOS_ARCHIVE;
  }
}
