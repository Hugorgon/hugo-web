import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Container } from '../components/Container';
import { VideoCardVertical } from '../components/VideoCardVertical';
import { PageHeader } from '../components/PageHeader';
import { CategoryFilter } from '../components/CategoryFilter';
import { Button } from '../components/Button';
import { type Video } from '../../data/videos';
import { UI } from '../../data/ui';
import { interpolate } from '../../lib/format';
import { fetchVideos } from '../../lib/queries/videos';
import {
  fetchVideoCategories,
  getCategoryTitle,
  type VideoCategoryEntry,
} from '../../lib/queries/videoCategories';
import {
  fetchVideosArchive,
  type VideosArchiveData,
} from '../../lib/queries/videosArchive';

const ALL_FILTER = UI.archive.videos.filterAll;
const PAGE_SIZE = 12;

export function VideosPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [visible, setVisible] = useState(PAGE_SIZE);

  const [videos, setVideos] = useState<Video[] | null>(null);
  const [categories, setCategories] = useState<VideoCategoryEntry[] | null>(null);
  const [archive, setArchive] = useState<VideosArchiveData | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchVideos().then((data) => {
      if (!cancelled) setVideos(data);
    });
    fetchVideoCategories().then((data) => {
      if (!cancelled) setCategories(data);
    });
    fetchVideosArchive().then((data) => {
      if (!cancelled && data) setArchive(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // useMemo hooks must be declared before any conditional return.
  // They are null-safe so they produce empty/default values while loading.
  const filters = useMemo(
    () => [ALL_FILTER, ...(categories ?? []).map((c) => c.title)],
    [categories],
  );

  const categoryByTitle = useMemo(() => {
    const map = new Map<string, VideoCategoryEntry>();
    for (const c of (categories ?? [])) map.set(c.title, c);
    return map;
  }, [categories]);

  const urlCategory = searchParams.get('category');
  const activeCategory = useMemo(() => {
    if (!urlCategory) return null;
    return (categories ?? []).find((c) => c.value === urlCategory) ?? null;
  }, [urlCategory, categories]);

  const activeFilter = activeCategory ? activeCategory.title : ALL_FILTER;

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
    if (!activeCategory) return videos ?? [];
    return (videos ?? []).filter((v) => v.category === activeCategory.value);
  }, [activeCategory, videos]);

  const visibleVideos = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  if (!videos || !categories || !archive) return null;

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
                {visibleVideos.map(({ category, ...rest }) => (
                  <VideoCardVertical
                    key={rest.slug}
                    {...rest}
                    category={getCategoryTitle(category, categories)}
                  />
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
