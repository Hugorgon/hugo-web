import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { StoryCardFeatured } from './StoryCardFeatured';
import { Container } from './Container';
import { type Story } from '../../data/stories';
import { ROUTES } from '../../data/routes';
import { fetchStories } from '../../lib/queries/stories';
import {
  fetchHomePage,
  type HomePageData,
} from '../../lib/queries/homePage';

export function StoriesGrid() {
  const [stories, setStories] = useState<Story[] | null>(null);
  const [home, setHome] = useState<HomePageData | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchStories().then((data) => {
      if (!cancelled) setStories(data);
    });
    fetchHomePage().then((data) => {
      if (!cancelled && data) setHome(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!stories || !home) return null;

  const featured = stories.slice(0, 2);
  const section = home.storiesGrid;

  return (
    <section id="stories" className="bg-[#0A0A0B] py-24">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#F9FAFB] mb-4">
            {section.title}{' '}
            <span className="text-[#F59E0B]">{section.titleHighlight}</span>
          </h2>
          <p className="text-[#D1D5DB] text-lg max-w-2xl mx-auto">
            {section.subtitle}
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
            {section.loadMoreLabel}
          </Link>
        </div>
      </Container>
    </section>
  );
}
