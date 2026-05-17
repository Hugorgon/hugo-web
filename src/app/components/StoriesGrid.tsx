import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { StoryCardFeatured } from './StoryCardFeatured';
import { Container } from './Container';
import { STORIES as LOCAL_STORIES, type Story } from '../../data/stories';
import { HOME } from '../../data/home';
import { ROUTES } from '../../data/routes';
import { fetchStories } from '../../lib/queries/stories';

export function StoriesGrid() {
  // Initial state z local fallbacku — první render je synchronní a vizuálně
  // identický s předchozí verzí. Sanity data přepíšou state až po async fetchi.
  const [stories, setStories] = useState<Story[]>(LOCAL_STORIES);

  useEffect(() => {
    let cancelled = false;
    fetchStories().then((data) => {
      if (!cancelled && data.length > 0) setStories(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const featured = stories.slice(0, 2);

  return (
    <section id="stories" className="bg-[#0A0A0B] py-24">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#F9FAFB] mb-4">
            {HOME.storiesGrid.title}{' '}
            <span className="text-[#F59E0B]">{HOME.storiesGrid.titleHighlight}</span>
          </h2>
          <p className="text-[#D1D5DB] text-lg max-w-2xl mx-auto">
            {HOME.storiesGrid.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featured.map((story) => (
            <StoryCardFeatured key={story.slug} {...story} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to={ROUTES.stories}
            className="text-[#F59E0B] hover:text-[#FFB84D] transition-colors font-medium"
          >
            {HOME.storiesGrid.loadMoreLabel}
          </Link>
        </div>
      </Container>
    </section>
  );
}
