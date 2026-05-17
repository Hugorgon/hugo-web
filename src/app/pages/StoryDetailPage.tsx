import { useEffect, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Link, useParams } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Container } from '../components/Container';
import { StoryCard } from '../components/StoryCard';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { NotFoundPage } from './NotFoundPage';
import { STORIES as LOCAL_STORIES, type Story } from '../../data/stories';
import { ROUTES } from '../../data/routes';
import { UI } from '../../data/ui';
import { fetchStoryBySlug, fetchRelatedStories } from '../../lib/queries/stories';

export function StoryDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  // Initial state z local fallbacku — pokud slug existuje lokálně, první render
  // je synchronní a vizuálně identický. Sanity data přepíší state až po fetchi.
  const localMatch = slug
    ? LOCAL_STORIES.find((s) => s.slug === slug)
    : undefined;
  const localRelated = slug
    ? LOCAL_STORIES.filter((s) => s.slug !== slug).slice(0, 3)
    : [];

  const [story, setStory] = useState<Story | undefined>(localMatch);
  const [related, setRelated] = useState<Story[]>(localRelated);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    fetchStoryBySlug(slug).then((data) => {
      if (!cancelled && data) setStory(data);
    });
    fetchRelatedStories(slug, 3).then((data) => {
      if (!cancelled && data.length > 0) setRelated(data);
    });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (!slug || !story) {
    return <NotFoundPage />;
  }

  const paragraphs = story.body.split(/\n\s*\n/);

  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      <Navbar />
      <main className="pt-28 pb-24">
        <Container>
          <Link
            to={ROUTES.stories}
            className="inline-flex items-center gap-2 text-[#9CA3AF] hover:text-[#F59E0B] transition-colors mb-8 text-sm"
          >
            <ChevronLeft size={16} />
            {UI.detail.storyBackLink}
          </Link>

          {/* Editorial hero image */}
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden mb-12 bg-[#111214]">
            <ImageWithFallback
              src={story.imageUrl}
              alt={story.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B]/80 via-transparent to-transparent" />
          </div>

          {/* Reading column */}
          <article className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 text-sm text-[#9CA3AF] mb-6">
              <span>{story.date}</span>
              <span>•</span>
              <span>{story.readTime}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-[#F9FAFB] mb-8 leading-tight">
              {story.title}
            </h1>

            <p className="text-xl text-[#D1D5DB] mb-12 leading-relaxed">
              {story.excerpt}
            </p>

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

            <div className="mt-16 pt-10 border-t border-[#2A2B31] flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B] font-bold">
                H
              </div>
              <div>
                <div className="text-[#F9FAFB] font-semibold">Hugo</div>
                <div className="text-[#9CA3AF] text-sm">
                  Bostonský teriér, filozof, občasný komik
                </div>
              </div>
            </div>
          </article>

          {/* Related stories */}
          {related.length > 0 && (
            <div className="mt-24 pt-16 border-t border-[#2A2B31]">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-[#F9FAFB]">
                  Související <span className="text-[#F59E0B]">příběhy</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {related.map((s) => (
                  <StoryCard key={s.slug} {...s} />
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
