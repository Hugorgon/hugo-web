import { useEffect, useState } from 'react';
import { ChevronLeft, Clock, Eye, Play, Calendar } from 'lucide-react';
import { Link, useParams } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Container } from '../components/Container';
import { VideoCardVertical } from '../components/VideoCardVertical';
import { Button } from '../components/Button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { NotFoundPage } from './NotFoundPage';
import { VIDEOS as LOCAL_VIDEOS, type Video } from '../../data/videos';
import { ROUTES } from '../../data/routes';
import { UI } from '../../data/ui';
import { formatDate } from '../../lib/format';
import { fetchVideoBySlug, fetchRelatedVideos } from '../../lib/queries/videos';

/**
 * Detail videa ve stylu Reels / Shorts / TikTok.
 *
 * Layout:
 * - Mobile a tablet: jednosloupcový — vertikální 9:16 přehrávač nahoře
 *   (max-w-[400px], vycentrovaný), informace o videu pod ním.
 * - Desktop (lg+): dvousloupcový — přehrávač vlevo (sticky, 360px široký),
 *   informace vpravo. Pomer 9:16 je vždy zachovaný, takže video není
 *   nikdy ořezáno ani na menších desktopových rozlišeních.
 *
 * Související videa dole používají stejné VideoCardVertical jako homepage
 * a archiv — celá video sekce webu drží jednotný social-first jazyk.
 */
export function VideoDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  // Initial state z local fallbacku — pokud slug existuje lokálně, první render
  // je synchronní a vizuálně identický s předchozí verzí. Sanity data přepíší
  // state až po async fetchi (pokud existují).
  const localMatch = slug
    ? LOCAL_VIDEOS.find((v) => v.slug === slug)
    : undefined;

  // Local „related" replikuje category-priority logiku z fetchRelatedVideos,
  // aby initial render měl stejné pořadí karet jako po fetchi z Sanity.
  const localRelated = (() => {
    if (!slug) return [];
    const others = LOCAL_VIDEOS.filter((v) => v.slug !== slug);
    if (!localMatch) return others.slice(0, 4);
    return [
      ...others.filter((v) => v.category === localMatch.category),
      ...others.filter((v) => v.category !== localMatch.category),
    ].slice(0, 4);
  })();

  const [video, setVideo] = useState<Video | undefined>(localMatch);
  const [related, setRelated] = useState<Video[]>(localRelated);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    fetchVideoBySlug(slug).then((data) => {
      if (!cancelled && data) setVideo(data);
    });
    fetchRelatedVideos(slug, 4).then((data) => {
      if (!cancelled) setRelated(data);
    });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (!slug || !video) {
    return <NotFoundPage />;
  }

  const paragraphs = video.longDescription.split(/\n\s*\n/);

  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      <Navbar />
      <main className="pt-28 pb-24">
        <Container>
          <Link
            to={ROUTES.videos}
            className="inline-flex items-center gap-2 text-[#9CA3AF] hover:text-[#F59E0B] transition-colors mb-8 text-sm"
          >
            <ChevronLeft size={16} />
            {UI.detail.videoBackLink}
          </Link>

          {/* Vertikální přehrávač + informace */}
          <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8 lg:gap-12">
            {/* Player column */}
            <div className="w-full max-w-[400px] mx-auto lg:max-w-none lg:mx-0 lg:sticky lg:top-28 lg:self-start">
              <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-[#111214] group cursor-pointer">
                <ImageWithFallback
                  src={video.imageUrl}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-[#F59E0B] flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-300 ease-soft">
                    <Play
                      className="text-[#0A0A0B] fill-[#0A0A0B] ml-1"
                      size={32}
                    />
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 px-3 py-2 bg-black/80 rounded text-sm text-[#F9FAFB] flex items-center gap-2">
                  <Clock size={14} />
                  {video.duration}
                </div>
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-[#F59E0B] rounded text-xs text-[#0A0A0B] font-medium">
                  {video.category}
                </div>
              </div>
            </div>

            {/* Info column */}
            <article>
              <h1 className="text-4xl md:text-5xl font-bold text-[#F9FAFB] mb-6 leading-tight">
                {video.title}
              </h1>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[#9CA3AF] mb-10 pb-10 border-b border-[#2A2B31]">
                <span className="flex items-center gap-2">
                  <Calendar size={14} />
                  {formatDate(video.publishedAt)}
                </span>
                <span className="flex items-center gap-2">
                  <Eye size={14} />
                  {video.views}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={14} />
                  {video.duration}
                </span>
              </div>

              <div className="space-y-6">
                {paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-[#D1D5DB] text-lg leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </div>

              {/* Inline CTA na konci textu — žádný sticky sidebar */}
              <div className="mt-12 bg-[#161618] border border-[#2A2B31] rounded-lg p-6">
                <h2 className="text-xl font-semibold text-[#F9FAFB] mb-3">
                  Nezmeškejte žádnou epizodu
                </h2>
                <p className="text-[#9CA3AF] text-sm leading-relaxed mb-6">
                  Nová videa každý pátek. Přidejte se ke smečce a dostaňte je do schránky hned, jak vyjdou.
                </p>
                <Link
                  to="/#newsletter"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition duration-200 ease-soft active:scale-[0.98] select-none bg-[#F59E0B] text-[#0A0A0B] hover:bg-[#FFB84D]"
                >
                  Sleduj Huga
                </Link>
              </div>
            </article>
          </div>

          {/* Related — stejné vertikální karty jako zbytek webu */}
          {related.length > 0 && (
            <div className="mt-24 pt-16 border-t border-[#2A2B31]">
              <div className="flex items-end justify-between mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-[#F9FAFB]">
                  Další <span className="text-[#F59E0B]">epizody</span>
                </h2>
                <Link
                  to={ROUTES.videos}
                  className="text-[#F59E0B] hover:text-[#FFB84D] transition-colors font-medium hidden md:block"
                >
                  Zobrazit vše →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {related.map((v) => (
                  <VideoCardVertical key={v.slug} {...v} />
                ))}
              </div>
            </div>
          )}
        </Container>
      </main>
      <Footer />
    </div>
  );
}
