import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Container } from '../components/Container';
import { PageHeader } from '../components/PageHeader';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { VideoCardVertical } from '../components/VideoCardVertical';
import { StoryCard } from '../components/StoryCard';
import { VIDEOS as LOCAL_VIDEOS, type Video } from '../../data/videos';
import { STORIES as LOCAL_STORIES, type Story } from '../../data/stories';
import { ABOUT } from '../../data/about';
import { PAGES } from '../../data/pages';
import { fetchStories } from '../../lib/queries/stories';
import { fetchVideos } from '../../lib/queries/videos';

/**
 * Plnohodnotná „O mně" stránka.
 * Vizuálně staví na sekci AboutHugo z homepage a doplňuje řádek
 * nejnovějších videí a nejnovějších příběhů. Texty čerpá z data/about.ts;
 * page-header copy je v data/pages.ts.
 */
export function AboutPage() {
  const allParagraphs = [
    ...ABOUT.bioParagraphs,
    ABOUT.pageSection.extraParagraph,
  ];

  // Stories: initial z local fallbacku → Sanity fetch → top 3 slice.
  // Visual identický s předchozí verzí (LATEST_STORIES = STORIES.slice(0, 3)).
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
  const latestStories = stories.slice(0, 3);

  // Videos: stejný pattern jako stories — initial z local fallbacku, Sanity fetch
  // přepíše state pokud má data. Visual identický s předchozí verzí
  // (LATEST_VIDEOS = VIDEOS.slice(0, 4)).
  const [videos, setVideos] = useState<Video[]>(LOCAL_VIDEOS);
  useEffect(() => {
    let cancelled = false;
    fetchVideos().then((data) => {
      if (!cancelled && data.length > 0) setVideos(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);
  const latestVideos = videos.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      <Navbar />
      <main className="pt-32">
        <Container>
          <PageHeader
            eyebrow={PAGES.about.header.eyebrow}
            title={
              <>
                {PAGES.about.header.titleLead}{' '}
                <span className="text-[#F59E0B]">
                  {PAGES.about.header.titleHighlight}
                </span>
              </>
            }
            subtitle={PAGES.about.header.subtitle}
          />
        </Container>

        {/* Rozšířené představení — vizuální jazyk z AboutHugo */}
        <section className="bg-[#111214] py-24">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                  <ImageWithFallback
                    src={ABOUT.portrait.imageUrl}
                    alt={ABOUT.portrait.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B]/60 to-transparent" />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-[#F59E0B] rounded-2xl p-6 shadow-2xl">
                  <div className="text-[#0A0A0B] text-4xl font-bold mb-1">
                    {ABOUT.badge.number}
                  </div>
                  <div className="text-[#0A0A0B] text-sm font-medium">
                    {ABOUT.badge.label}
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#F9FAFB] mb-6">
                  {ABOUT.pageSection.title}{' '}
                  <span className="text-[#F59E0B]">
                    {ABOUT.pageSection.titleHighlight}
                  </span>
                </h2>

                {allParagraphs.map((paragraph, index) => {
                  const isLast = index === allParagraphs.length - 1;
                  return (
                    <p
                      key={index}
                      className={`text-[#D1D5DB] text-lg leading-relaxed ${isLast ? 'mb-8' : 'mb-6'}`}
                    >
                      {paragraph}
                    </p>
                  );
                })}

                <div className="grid grid-cols-2 gap-6">
                  {ABOUT.features.map(({ Icon, title, description }) => (
                    <div key={title} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="text-[#F59E0B]" size={20} />
                      </div>
                      <div>
                        <div className="text-[#F9FAFB] font-semibold mb-1">
                          {title}
                        </div>
                        <div className="text-[#9CA3AF] text-sm">{description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Nejnovější videa */}
        <section className="bg-[#0A0A0B] py-24">
          <Container>
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#F9FAFB] mb-4">
                  {ABOUT.latestVideos.title}{' '}
                  <span className="text-[#F59E0B]">
                    {ABOUT.latestVideos.titleHighlight}
                  </span>
                </h2>
                <p className="text-[#D1D5DB] text-lg max-w-2xl">
                  {ABOUT.latestVideos.subtitle}
                </p>
              </div>
              <Link
                to={ABOUT.latestVideos.viewAllTo}
                className="text-[#F59E0B] hover:text-[#FFB84D] transition-colors font-medium hidden md:block"
              >
                {ABOUT.latestVideos.viewAllLabel}
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {latestVideos.map((video) => (
                <VideoCardVertical key={video.slug} {...video} />
              ))}
            </div>
          </Container>
        </section>

        {/* Nejnovější příběhy */}
        <section className="bg-[#111214] py-24">
          <Container>
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#F9FAFB] mb-4">
                  {ABOUT.latestStories.title}{' '}
                  <span className="text-[#F59E0B]">
                    {ABOUT.latestStories.titleHighlight}
                  </span>
                </h2>
                <p className="text-[#D1D5DB] text-lg max-w-2xl">
                  {ABOUT.latestStories.subtitle}
                </p>
              </div>
              <Link
                to={ABOUT.latestStories.viewAllTo}
                className="text-[#F59E0B] hover:text-[#FFB84D] transition-colors font-medium hidden md:block"
              >
                {ABOUT.latestStories.viewAllLabel}
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestStories.map((story) => (
                <StoryCard key={story.slug} {...story} />
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
