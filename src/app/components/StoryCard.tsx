import { Link } from 'react-router';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ROUTES } from '../../data/routes';

interface StoryCardProps {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  imageUrl: string;
  readTime: string;
}

/**
 * Visual is unchanged from the original implementation — the outer wrapper
 * is now a <Link> so the entire card opens the corresponding story.
 */
export function StoryCard({
  slug,
  title,
  excerpt,
  date,
  imageUrl,
  readTime,
}: StoryCardProps) {
  return (
    <Link
      to={ROUTES.storyDetail(slug)}
      className="group block bg-[#161618] rounded-lg overflow-hidden active:scale-[0.99] will-change-transform"
      style={{
        transitionProperty: 'transform',
        transitionDuration: '300ms',
        transitionTimingFunction: 'ease-in-out',
      }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#111214]">
        <ImageWithFallback
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 text-xs text-[#9CA3AF] mb-3">
          <span>{date}</span>
          <span>•</span>
          <span>{readTime}</span>
        </div>
        <h3 className="text-lg font-semibold text-[#F9FAFB] mb-2 group-hover:text-[#F59E0B] transition-colors">
          {title}
        </h3>
        <p className="text-[#9CA3AF] text-sm leading-relaxed">{excerpt}</p>
      </div>
    </Link>
  );
}
