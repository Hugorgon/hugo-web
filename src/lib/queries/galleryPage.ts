import { sanityClient } from '../sanity';
import { PAGES } from '../../data/pages';

/**
 * Fetcher pro `galleryPage` singleton — preferuje Sanity, fallback na
 * `PAGES.gallery.header` z `src/data/pages.ts`. Mirror patternu z
 * videosArchive / storiesArchive / aboutPage.
 *
 * Drží pouze hero hlavičku — masonry grid a Lightbox řídí frontend.
 */

export interface GalleryPageHeader {
  eyebrow: string;
  titleLead?: string;
  titleHighlight: string;
  subtitle: string;
}

export interface GalleryPageData {
  pageHeader: GalleryPageHeader;
}

interface RawGalleryPage {
  pageHeader?: {
    eyebrow?: string;
    titleLead?: string;
    titleHighlight?: string;
    subtitle?: string;
  };
}

const QUERY = `*[_id == "galleryPage"][0] {
  pageHeader {
    eyebrow,
    titleLead,
    titleHighlight,
    subtitle
  }
}`;

/** Local fallback derivovaný z `data/pages.ts`. */
export const LOCAL_GALLERY_PAGE: GalleryPageData = {
  pageHeader: {
    eyebrow: PAGES.gallery.header.eyebrow,
    titleLead: PAGES.gallery.header.titleLead,
    titleHighlight: PAGES.gallery.header.titleHighlight,
    subtitle: PAGES.gallery.header.subtitle,
  },
};

function mapToGalleryPage(raw: RawGalleryPage): GalleryPageData {
  return {
    pageHeader: {
      eyebrow:
        raw.pageHeader?.eyebrow ?? LOCAL_GALLERY_PAGE.pageHeader.eyebrow,
      titleLead:
        raw.pageHeader?.titleLead ?? LOCAL_GALLERY_PAGE.pageHeader.titleLead,
      titleHighlight:
        raw.pageHeader?.titleHighlight ??
        LOCAL_GALLERY_PAGE.pageHeader.titleHighlight,
      subtitle:
        raw.pageHeader?.subtitle ?? LOCAL_GALLERY_PAGE.pageHeader.subtitle,
    },
  };
}

export async function fetchGalleryPage(): Promise<GalleryPageData> {
  if (!sanityClient) return LOCAL_GALLERY_PAGE;
  try {
    const raw = await sanityClient.fetch<RawGalleryPage | null>(QUERY);
    if (!raw) return LOCAL_GALLERY_PAGE;
    return mapToGalleryPage(raw);
  } catch (error) {
    console.error(
      '[galleryPage] fetch failed, falling back to local data:',
      error,
    );
    return LOCAL_GALLERY_PAGE;
  }
}
