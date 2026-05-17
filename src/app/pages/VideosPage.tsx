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
  VIDEOS,
  VIDEO_CATEGORIES,
  type VideoCategory,
} from '../../data/videos';
import { PAGES } from '../../data/pages';
import { UI } from '../../data/ui';
import { interpolate } from '../../lib/format';

type Filter = typeof UI.archive.videos.filterAll | VideoCategory;
const FILTERS: readonly Filter[] = [UI.archive.videos.filterAll, ...VIDEO_CATEGORIES];
const PAGE_SIZE = 6;

// Guard: only accept query values that match a real VideoCategory.
const VALID_CATEGORIES: ReadonlySet<string> = new Set(VIDEO_CATEGORIES);

export function VideosPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [visible, setVisible] = useState(PAGE_SIZE);

  // Filtr je řízený URL parametrem ?category=… — homepage Categories karty
  // tak mohou linkovat přímo na předfiltrovaný archiv, back/forward navigace
  // funguje přirozeně a URL je sdílitelná.
  const urlCategory = searchParams.get('category');
  const filter: Filter =
    urlCategory && VALID_CATEGORIES.has(urlCategory)
      ? (urlCategory as VideoCategory)
      : UI.archive.videos.filterAll;

  // Reset stránkování při změně kategorie (ať už přes filter pill nebo
  // přímý odkaz z Categories sekce).
  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [urlCategory]);

  function handleFilterChange(next: Filter) {
    const params = new URLSearchParams(searchParams);
    if (next === UI.archive.videos.filterAll) {
      params.delete('category');
    } else {
      params.set('category', next);
    }
    setSearchParams(params);
  }

  const filtered = useMemo(() => {
    if (filter === UI.archive.videos.filterAll) return VIDEOS;
    return VIDEOS.filter((v) => v.category === filter);
  }, [filter]);

  const visibleVideos = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      <Navbar />
      <main className="pt-32 pb-24">
        <Container>
          <PageHeader
            eyebrow={PAGES.videos.header.eyebrow}
            title={
              <>
                {PAGES.videos.header.titleLead}{' '}
                <span className="text-[#F59E0B]">
                  {PAGES.videos.header.titleHighlight}
                </span>
              </>
            }
            subtitle={PAGES.videos.header.subtitle}
          />

          <CategoryFilter
            options={FILTERS}
            active={filter}
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
