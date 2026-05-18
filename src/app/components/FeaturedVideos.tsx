import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { VideoCardVertical } from './VideoCardVertical';
import { Container } from './Container';
import { VIDEOS as LOCAL_VIDEOS, type Video } from '../../data/videos';
import { ROUTES } from '../../data/routes';
import { fetchVideos } from '../../lib/queries/videos';
import {
  fetchHomePage,
  LOCAL_HOME,
  type HomePageData,
} from '../../lib/queries/homePage';

export function FeaturedVideos() {
  // Initial state z local fallbacku — první render je synchronní a vizuálně
  // identický s předchozí verzí. Sanity data přepíšou state až po async fetchi.
  const [videos, setVideos] = useState<Video[]>(LOCAL_VIDEOS);
  const [home, setHome] = useState<HomePageData>(LOCAL_HOME);

  useEffect(() => {
    let cancelled = false;
    fetchVideos().then((data) => {
      if (!cancelled && data.length > 0) setVideos(data);
    });
    fetchHomePage().then((data) => {
      if (!cancelled && data) setHome(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const featured = videos.slice(0, 4);
  const section = home.featuredVideos;

  return (
    <section id="videos" className="bg-[#111214] py-24">
      <Container>
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#F9FAFB] mb-4">
              {section.title}{' '}
              <span className="text-[#F59E0B]">{section.titleHighlight}</span>
            </h2>
            <p className="text-[#D1D5DB] text-lg max-w-2xl">
              {section.subtitle}
            </p>
          </div>
          <Link
            to={ROUTES.videos}
            className="text-[#F59E0B] hover:text-[#FFB84D] transition-colors font-medium hidden md:block"
          >
            {section.viewAllLabel}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((video) => (
            <VideoCardVertical key={video.slug} {...video} />
          ))}
        </div>
      </Container>
    </section>
  );
}
