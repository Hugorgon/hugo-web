import { Fragment, useEffect, useState } from 'react';
import { Play, ChevronDown } from 'lucide-react';
import CountUp from 'react-countup';
import { LinkButton } from './LinkButton';
import { Container } from './Container';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ROUTES } from '../../data/routes';
import { type Video } from '../../data/videos';
import { fetchVideos } from '../../lib/queries/videos';
import {
  fetchHomePage,
  type HomePageData,
} from '../../lib/queries/homePage';

export function HeroSection() {
  const [home, setHome] = useState<HomePageData | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchHomePage().then((data) => {
      if (!cancelled && data) setHome(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const [videos, setVideos] = useState<Video[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchVideos().then((data) => {
      if (!cancelled) setVideos(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!home || !videos) return null;

  const hero = home.hero;
  const newestVideo = videos[0];
  // Defensive: pokud by se z nějakého důvodu nedostal žádný video, CTA padá
  // na archiv `/videos` místo broken detail URL.
  const primaryHref = newestVideo
    ? ROUTES.videoDetail(newestVideo.slug)
    : ROUTES.videos;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src={hero.backgroundImage.url}
          alt={hero.backgroundImage.alt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/80 to-[#0A0A0B]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0B]/60 to-transparent" />
      </div>

      <Container className="relative z-10 py-32">
        <div className="max-w-3xl">
          <div className="inline-block px-4 py-2 bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-full mb-6">
            <span className="text-[#F59E0B] text-sm font-medium">{hero.eyebrow}</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#F9FAFB] mb-6 leading-tight">
            {hero.title}{' '}
            <span className="text-[#F59E0B]">{hero.titleHighlight}</span>
          </h1>

          <p className="text-xl text-[#D1D5DB] mb-8 leading-relaxed max-w-2xl">
            {hero.bio}
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <LinkButton to={primaryHref} className="gap-2">
              <Play size={20} className="fill-[#0A0A0B]" />
              {hero.primaryCta}
            </LinkButton>
            <LinkButton variant="secondary" to={ROUTES.stories}>
              {hero.secondaryCta}
            </LinkButton>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-6 sm:gap-8 text-sm">
            {hero.stats.map((stat, index) => (
              <Fragment key={stat.label}>
                <div>
                  <div className="text-5xl font-bold text-[#F9FAFB] mb-2 tabular-nums">
                    <CountUp start={0} end={stat.end} duration={4.5} delay={stat.delay} suffix={stat.suffix} />
                  </div>
                  <div className="text-[#D1D5DB]">{stat.label}</div>
                  <div className="text-[#9CA3AF] text-xs mt-1">{stat.subtext}</div>
                </div>
                {index < hero.stats.length - 1 && (
                  <div className="hidden sm:block w-px h-20 bg-[#2A2B31]" />
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </Container>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown className="text-[#F59E0B]" size={32} />
      </div>
    </section>
  );
}
