import { Play, Clock } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ROUTES } from '../../data/routes';
import {
  VIDEO_TYPE_LABELS,
  type VideoLanguage,
  type VideoTypeSlug,
} from '../../data/videos';

interface VideoCardProps {
  slug: string;
  title: string;
  description: string;
  language: VideoLanguage;
  videoType: VideoTypeSlug;
  imageUrl: string;
  category?: string;
}

/**
 * Visual is unchanged from the original implementation — only the outer
 * wrapper switched from <div> to <Link> so the whole card is a navigation
 * target (better a11y and right-click/cmd-click semantics).
 */
export function VideoCard({
  slug,
  title,
  description,
  language,
  videoType,
  imageUrl,
  category,
}: VideoCardProps) {
  return (
    <Link
      to={ROUTES.videoDetail(slug)}
      className="group block bg-[#161618] rounded-lg overflow-hidden hover:scale-[1.04] active:scale-[0.99] will-change-transform"
      style={{
        transitionProperty: 'transform',
        transitionDuration: '300ms',
        transitionTimingFunction: 'ease-in-out',
      }}
    >
      <div className="relative aspect-video overflow-hidden bg-[#111214]">
        <ImageWithFallback
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover object-top group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* Play button trvale viditelný; lehké zvětšení na hover. */}
        <div className="absolute top-[66%] left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-14 h-14 rounded-full bg-[#F59E0B]/60 flex items-center justify-center transition-transform duration-200 ease-soft group-hover:scale-125">
            <Play className="text-[#0A0A0B] fill-[#0A0A0B] ml-1" size={20} />
          </div>
        </div>
        <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 rounded text-xs text-[#F9FAFB] flex items-center gap-1">
          <Clock size={12} />
          {VIDEO_TYPE_LABELS[videoType]}
        </div>
        {category && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-[#F59E0B] rounded text-xs text-[#0A0A0B] font-medium">
            {category}
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-[#F9FAFB] mb-2 group-hover:text-[#F59E0B] transition-colors">
          {title}
        </h3>
        <p className="text-[#9CA3AF] text-sm leading-relaxed mb-3">
          {description}
        </p>
        <div className="text-[#9CA3AF] text-xs">{language}</div>
      </div>
    </Link>
  );
}
