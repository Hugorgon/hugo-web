import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Container } from '../components/Container';
import { PageHeader } from '../components/PageHeader';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { VideoCardVertical } from '../components/VideoCardVertical';
import { StoryCard } from '../components/StoryCard';
import { ROUTES } from '../../data/routes';
import { VIDEOS as LOCAL_VIDEOS, type Video } from '../../data/videos';
import { STORIES as LOCAL_STORIES, type Story } from '../../data/stories';
import { fetchStories } from '../../lib/queries/stories';
import { fetchVideos } from '../../lib/queries/videos';
import {
  fetchAboutPage,
  LOCAL_ABOUT,
  type AboutPageData,
} from '../../lib/queries/aboutPage';

/**
 * Plnohodnotná „O mně" stránka.
 * Vizuálně staví na sekci AboutHugo z homepage a doplňuje řádek
 * nejnovějších videí a nejnovějších příběhů.
 *
 * About copy (portrét, badge, bio, features, headlines) tahá z `aboutPage`
 * Sanity singletonu s lokálním fallbackem (`LOCAL_ABOUT`). Latest videos /
 * latest stories tahají z `video` / `story` collections jako předtím.
 */
export function AboutPage() {
  // About content: initial z local fallbacku → Sanity fetch.
  const [about, setAbout] = useState<AboutPageData>(LOCAL_ABOUT);
  useEffect(() => {
    let cancelled = false;
    fetchAboutPage().then((data) => {
      if (!cancelled && data) setAbout(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const allParagraphs = [
    ...about.bioParagraphs,
    about.pageSection.extraParagraph,
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
            eyebrow={about.pageHeader.eyebrow}
            title={
              <>
                {about.pageHeader.titleLead}{' '}
                <span className="text-[#F59E0B]">
                  {about.pageHeader.titleHighlight}
                </span>
              </>
            }
            subtitle={about.pageHeader.subtitle}
          />
        </Container>

        {/* Rozšířené představení — vizuální jazyk z AboutHugo */}
        <section className="bg-[#111214] py-24">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                  <ImageWithFallback
                    src={about.portrait.imageUrl}
                    alt={about.portrait.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B]/60 to-transparent" />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-[#F59E0B] rounded-2xl p-6 shadow-2xl">
                  <div className="text-[#0A0A0B] text-4xl font-bold mb-1">
                    {about.badge.number}
                  </div>
                  <div className="text-[#0A0A0B] text-sm font-medium">
                    {about.badge.label}
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#F9FAFB] mb-6">
                  {about.pageSection.title}{' '}
                  <span className="text-[#F59E0B]">
                    {about.pageSection.titleHighlight}
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
                  {about.features.map(({ Icon, title, description }) => (
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
                  {about.latestVideos.title}{' '}
                  <span className="text-[#F59E0B]">
                    {about.latestVideos.titleHighlight}
                  </span>
                </h2>
                <p className="text-[#D1D5DB] text-lg max-w-2xl">
                  {about.latestVideos.subtitle}
                </p>
              </div>
              <Link
                to={ROUTES.videos}
                className="text-[#F59E0B] hover:text-[#FFB84D] transition-colors font-medium hidden md:block"
              >
                {about.latestVideos.viewAllLabel}
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
                  {about.latestStories.title}{' '}
                  <span className="text-[#F59E0B]">
                    {about.latestStories.titleHighlight}
                  </span>
                </h2>
                <p className="text-[#D1D5DB] text-lg max-w-2xl">
                  {about.latestStories.subtitle}
                </p>
              </div>
              <Link
                to={ROUTES.stories}
                className="text-[#F59E0B] hover:text-[#FFB84D] transition-colors font-medium hidden md:block"
              >
                {about.latestStories.viewAllLabel}
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
