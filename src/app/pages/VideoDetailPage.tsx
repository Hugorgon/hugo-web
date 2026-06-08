import { useEffect, useState } from 'react';
import { ChevronLeft, Clock, Languages, Play, Calendar } from 'lucide-react';
import { Link, useParams } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Container } from '../components/Container';
import { VideoCardVertical } from '../components/VideoCardVertical';
import { Button } from '../components/Button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { NotFoundPage } from './NotFoundPage';
import {
  VIDEO_TYPE_LABELS,
  type Video,
} from '../../data/videos';
import { ROUTES } from '../../data/routes';
import { UI } from '../../data/ui';
import { formatDate } from '../../lib/format';
import { fetchVideoBySlug, fetchRelatedVideos } from '../../lib/queries/videos';
import {
  fetchVideoCategories,
  getCategoryTitle,
  type VideoCategoryEntry,
} from '../../lib/queries/videoCategories';
import { getYouTubeEmbedUrl } from '../../lib/youtube';

export function VideoDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  // null  = still loading (don't render anything yet)
  // undefined = Sanity returned no match (show NotFoundPage)
  // Video = found, render detail
  const [video, setVideo] = useState<Video | undefined | null>(null);
  const [related, setRelated] = useState<Video[]>([]);
  const [categories, setCategories] = useState<VideoCategoryEntry[]>([]);

  useEffect(() => {
    if (!slug) {
      setVideo(undefined);
      return;
    }
    let cancelled = false;
    setVideo(null); // reset to loading on slug change
    fetchVideoBySlug(slug).then((data) => {
      if (!cancelled) setVideo(data); // undefined if not found
    });
    fetchRelatedVideos(slug, 4).then((data) => {
      if (!cancelled) setRelated(data);
    });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    let cancelled = false;
    fetchVideoCategories().then((data) => {
      if (!cancelled) setCategories(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (video === null) return null; // still loading
  if (!slug || !video) return <NotFoundPage />; // not found

  const paragraphs = video.longDescription.split(/\n\s*\n/);
  const embedUrl = getYouTubeEmbedUrl(video.youtubeUrl);
  const categoryLabel = getCategoryTitle(video.category, categories);

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
              {embedUrl ? (
                // Real YouTube embed. Same 9:16 shell, same rounded corners,
                // same dark surface — only the inner content changes.
                <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-[#111214]">
                  <iframe
                    src={embedUrl}
                    title={video.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              ) : (
                // Fallback: keeps the original static preview unchanged when
                // a video has no youtubeUrl yet.
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
                    {VIDEO_TYPE_LABELS[video.videoType]}
                  </div>
                  <div className="absolute top-4 left-4 px-3 py-1.5 bg-[#F59E0B] rounded text-xs text-[#0A0A0B] font-medium">
                    {categoryLabel}
                  </div>
                </div>
              )}
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
                  <Languages size={14} />
                  {video.language}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={14} />
                  {VIDEO_TYPE_LABELS[video.videoType]}
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
                  Neodcházej po jedné epizodě. 🐾
                </h2>
                <p className="text-[#9CA3AF] text-sm leading-relaxed mb-6">
                  Nová videa přibývají průběžně. Mrkni do archivu nebo sleduj Huga na sociálních sítích.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to={ROUTES.videos}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition duration-200 ease-soft active:scale-[0.98] select-none bg-[#F59E0B] text-[#0A0A0B] hover:bg-[#FFB84D]"
                  >
                    Prozkoumat archiv
                  </Link>
                  <Link
                    to={ROUTES.contact}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition duration-200 ease-soft active:scale-[0.98] select-none bg-[#0A0A0B] text-[#F9FAFB] border border-[#2A2B31] hover:border-[#F59E0B]"
                  >
                    Sleduj Huga
                  </Link>
                </div>
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
                {related.map(({ category, ...rest }) => (
                  <VideoCardVertical
                    key={rest.slug}
                    {...rest}
                    category={getCategoryTitle(category, categories)}
                  />
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
