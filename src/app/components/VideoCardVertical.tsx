import { Play, Clock } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ROUTES } from '../../data/routes';

interface VideoCardVerticalProps {
  slug: string;
  title: string;
  description: string;
  duration: string;
  views: string;
  imageUrl: string;
  category?: string;
}

/**
 * Vertikální 9:16 karta krátkého videa.
 * Vizuální jazyk je shodný s VideoCard (barvy, typografie, hover, animace,
 * play-button overlay, badge na duraci a kategorii) — liší se pouze
 * orientace náhledu na portrét. Používá se na homepage v sekci
 * FeaturedVideos, v archivu /videos a v sekci „Související videa" na
 * detailu videa — tedy ve všech video render path. Klasický 16:9 VideoCard
 * je zachovaný v repu, ale aktuálně se nikde nerenderuje.
 */
export function VideoCardVertical({
  slug,
  title,
  description,
  duration,
  views,
  imageUrl,
  category,
}: VideoCardVerticalProps) {
  return (
    <Link
      to={ROUTES.videoDetail(slug)}
      className="group block bg-[#161618] rounded-lg overflow-hidden active:scale-[0.99] will-change-transform"
      style={{
        transitionProperty: 'transform',
        transitionDuration: '300ms',
        transitionTimingFunction: 'ease-in-out',
      }}
    >
      <div className="relative aspect-[9/16] overflow-hidden bg-[#111214]">
        <ImageWithFallback
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 rounded-full bg-[#F59E0B] flex items-center justify-center">
            <Play className="text-[#0A0A0B] fill-[#0A0A0B] ml-1" size={24} />
          </div>
        </div>
        <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 rounded text-xs text-[#F9FAFB] flex items-center gap-1">
          <Clock size={12} />
          {duration}
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
        <div className="text-[#9CA3AF] text-xs">{views}</div>
      </div>
    </Link>
  );
}
