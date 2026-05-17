import { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Container } from '../components/Container';
import { StoryCard } from '../components/StoryCard';
import { PageHeader } from '../components/PageHeader';
import { Button } from '../components/Button';
import { STORIES as LOCAL_STORIES, type Story } from '../../data/stories';
import { PAGES } from '../../data/pages';
import { UI } from '../../data/ui';
import { interpolate } from '../../lib/format';
import { fetchStories } from '../../lib/queries/stories';

const PAGE_SIZE = 6;

export function StoriesPage() {
  // Initial state z local fallbacku — visual 1:1 s předchozí verzí.
  // Sanity data přepíší state až po async fetchi (pokud existují).
  const [stories, setStories] = useState<Story[]>(LOCAL_STORIES);
  const [visible, setVisible] = useState(PAGE_SIZE);

  useEffect(() => {
    let cancelled = false;
    fetchStories().then((data) => {
      if (!cancelled && data.length > 0) setStories(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const visibleStories = stories.slice(0, visible);
  const hasMore = visible < stories.length;

  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      <Navbar />
      <main className="pt-32 pb-24">
        <Container>
          <PageHeader
            eyebrow={PAGES.stories.header.eyebrow}
            title={
              <span className="text-[#F59E0B]">
                {PAGES.stories.header.titleHighlight}
              </span>
            }
            subtitle={PAGES.stories.header.subtitle}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleStories.map((story) => (
              <StoryCard key={story.slug} {...story} />
            ))}
          </div>

          {hasMore && (
            <div className="text-center mt-12">
              <Button
                variant="secondary"
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
              >
                {UI.archive.stories.loadMore}
              </Button>
            </div>
          )}

          <p className="text-center text-[#9CA3AF] text-sm mt-8">
            {interpolate(UI.archive.stories.countTemplate, {
              visible: visibleStories.length,
              total: stories.length,
            })}
          </p>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
