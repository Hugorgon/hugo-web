import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Container } from '../components/Container';
import { VideoCardVertical } from '../components/VideoCardVertical';
import { PageHeader } from '../components/PageHeader';
import { CategoryFilter } from '../components/CategoryFilter';
import { Button } from '../components/Button';
import {
  VIDEOS as LOCAL_VIDEOS,
  type Video,
} from '../../data/videos';
import { UI } from '../../data/ui';
import { interpolate } from '../../lib/format';
import { fetchVideos } from '../../lib/queries/videos';
import {
  fetchVideoCategories,
  LOCAL_VIDEO_CATEGORIES,
  type VideoCategoryEntry,
} from '../../lib/queries/videoCategories';
import {
  fetchVideosArchive,
  LOCAL_VIDEOS_ARCHIVE,
  type VideosArchiveData,
} from '../../lib/queries/videosArchive';

const ALL_FILTER = UI.archive.videos.filterAll;
const PAGE_SIZE = 12;

export function VideosPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [visible, setVisible] = useState(PAGE_SIZE);

  // Initial state z local fallbacků — první render je synchronní a vizuálně
  // identický s předchozí verzí. Sanity data přepíšou state až po async fetchi.
  const [videos, setVideos] = useState<Video[]>(LOCAL_VIDEOS);
  const [categories, setCategories] = useState<VideoCategoryEntry[]>(
    LOCAL_VIDEO_CATEGORIES,
  );
  const [archive, setArchive] = useState<VideosArchiveData>(LOCAL_VIDEOS_ARCHIVE);

  useEffect(() => {
    let cancelled = false;
    fetchVideos().then((data) => {
      if (!cancelled && data.length > 0) setVideos(data);
    });
    fetchVideoCategories().then((data) => {
      if (!cancelled && data.length > 0) setCategories(data);
    });
    fetchVideosArchive().then((data) => {
      if (!cancelled && data) setArchive(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Filter pill labels = { ALL_FILTER } + { kategorie z CMS v jejich pořadí }.
  // Pillky používají `title` jako vizuální label, ale filtrujeme podle `value`
  // (stabilní slug, který odpovídá `video.category` po dereferenci).
  // Mapování label ↔ value drží `categoryByTitle` lookup.
  const filters = useMemo(
    () => [ALL_FILTER, ...categories.map((c) => c.title)],
    [categories],
  );

  const categoryByTitle = useMemo(() => {
    const map = new Map<string, VideoCategoryEntry>();
    for (const c of categories) map.set(c.title, c);
    return map;
  }, [categories]);

  // Filtr je řízený URL parametrem ?category=<value> — homepage Categories karty
  // tak mohou linkovat přímo na předfiltrovaný archiv, back/forward navigace
  // funguje přirozeně a URL je sdílitelná.
  const urlCategory = searchParams.get('category');
  const activeCategory = useMemo(() => {
    if (!urlCategory) return null;
    return categories.find((c) => c.value === urlCategory) ?? null;
  }, [urlCategory, categories]);

  const activeFilter = activeCategory ? activeCategory.title : ALL_FILTER;

  // Reset stránkování při změně kategorie (ať už přes filter pill nebo
  // přímý odkaz z Categories sekce).
  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [urlCategory]);

  function handleFilterChange(next: string) {
    const params = new URLSearchParams(searchParams);
    if (next === ALL_FILTER) {
      params.delete('category');
    } else {
      const category = categoryByTitle.get(next);
      if (category) {
        params.set('category', category.value);
      } else {
        params.delete('category');
      }
    }
    setSearchParams(params);
  }

  const filtered = useMemo(() => {
    if (!activeCategory) return videos;
    return videos.filter((v) => v.category === activeCategory.value);
  }, [activeCategory, videos]);

  const visibleVideos = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      <Navbar />
      <main className="pt-32 pb-24">
        <Container>
          <PageHeader
            eyebrow={archive.pageHeader.eyebrow}
            title={
              <>
                {archive.pageHeader.titleLead && (
                  <>{archive.pageHeader.titleLead}{' '}</>
                )}
                <span className="text-[#F59E0B]">
                  {archive.pageHeader.titleHighlight}
                </span>
              </>
            }
            subtitle={archive.pageHeader.subtitle}
          />

          <CategoryFilter
            options={filters}
            active={activeFilter}
            onChange={handleFilterChange}
          />

          {filtered.length === 0 ? (
            <p className="text-center text-[#9CA3AF] py-16">
              {UI.archive.videos.emptyCategory}
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {visibleVideos.map((video) => (
                  <VideoCardVertical key={video.slug} {...video} />
                ))}
              </div>

              {hasMore && (
                <div className="text-center mt-12">
                  <Button
                    variant="secondary"
                    onClick={() => setVisible((v) => v + PAGE_SIZE)}
                  >
                    {UI.archive.videos.loadMore}
                  </Button>
                </div>
              )}

              <p className="text-center text-[#9CA3AF] text-sm mt-8">
                {interpolate(UI.archive.videos.countTemplate, {
                  visible: visibleVideos.length,
                  total: filtered.length,
                })}
              </p>
            </>
          )}
        </Container>
      </main>
      <Footer />
    </div>
  );
}
