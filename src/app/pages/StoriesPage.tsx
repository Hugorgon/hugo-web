import { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Container } from '../components/Container';
import { StoryCard } from '../components/StoryCard';
import { PageHeader } from '../components/PageHeader';
import { Button } from '../components/Button';
import { STORIES as LOCAL_STORIES, type Story } from '../../data/stories';
import { UI } from '../../data/ui';
import { interpolate } from '../../lib/format';
import { fetchStories } from '../../lib/queries/stories';
import {
  fetchStoriesArchive,
  LOCAL_STORIES_ARCHIVE,
  type StoriesArchiveData,
} from '../../lib/queries/storiesArchive';

const PAGE_SIZE = 6;

export function StoriesPage() {
  // Initial state z local fallbacku — visual 1:1 s předchozí verzí.
  // Sanity data přepíší state až po async fetchi (pokud existují).
  const [stories, setStories] = useState<Story[]>(LOCAL_STORIES);
  const [archive, setArchive] = useState<StoriesArchiveData>(
    LOCAL_STORIES_ARCHIVE,
  );
  const [visible, setVisible] = useState(PAGE_SIZE);

  useEffect(() => {
    let cancelled = false;
    fetchStories().then((data) => {
      if (!cancelled) setStories(data);
    });
    fetchStoriesArchive().then((data) => {
      if (!cancelled && data) setArchive(data);
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
