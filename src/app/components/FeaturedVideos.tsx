import { Link } from 'react-router';
import { VideoCardVertical } from './VideoCardVertical';
import { Container } from './Container';
import { VIDEOS } from '../../data/videos';
import { HOME } from '../../data/home';
import { ROUTES } from '../../data/routes';

const HOME_FEATURED_VIDEOS = VIDEOS.slice(0, 4);

export function FeaturedVideos() {
  return (
    <section id="videos" className="bg-[#111214] py-24">
      <Container>
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#F9FAFB] mb-4">
              {HOME.featuredVideos.title}{' '}
              <span className="text-[#F59E0B]">{HOME.featuredVideos.titleHighlight}</span>
            </h2>
            <p className="text-[#D1D5DB] text-lg max-w-2xl">
              {HOME.featuredVideos.subtitle}
            </p>
          </div>
          <Link
            to={ROUTES.videos}
            className="text-[#F59E0B] hover:text-[#FFB84D] transition-colors font-medium hidden md:block"
          >
            {HOME.featuredVideos.viewAllLabel}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {HOME_FEATURED_VIDEOS.map((video) => (
            <VideoCardVertical key={video.slug} {...video} />
          ))}
        </div>
      </Container>
    </section>
  );
}
