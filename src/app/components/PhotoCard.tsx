import { useEffect, useRef, useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Photo, PhotoAspect } from '../../data/photos';
import { UI } from '../../data/ui';
import { formatDate, interpolate } from '../../lib/format';

/**
 * Statický lookup pro aspect ratio třídy.
 * Tailwind JIT potřebuje vidět string literály přímo v kódu, takže žádný
 * dynamicky složený `aspect-[${ratio}]`. Tahle mapa je single source of truth.
 */
const ASPECT_CLASS: Record<PhotoAspect, string> = {
  '4/5': 'aspect-[4/5]',
  '4/3': 'aspect-[4/3]',
  '1/1': 'aspect-square',
  '3/4': 'aspect-[3/4]',
  '16/9': 'aspect-video',
};

interface PhotoCardProps {
  photo: Photo;
  /** Otevře lightbox náhled pro tuto fotku. */
  onOpen: () => void;
}

/**
 * Image-first gallery card.
 * Sémanticky `<figure>`, ale klikatelný — vnitřní image area je `<button>`,
 * aby keyboard focus a aria-label fungovaly nativně. Caption a kategorie
 * uvnitř buttonu mají `pointer-events-none`, takže klik prochází na button.
 *
 * Hover feel ladí s VideoCard/StoryCard:
 *   • image zoom uvnitř `overflow-hidden` wrapperu
 *   • žádný `hover:scale-*` na vnějším rounded wrapperu (sub-pixel artifact)
 *
 * Reveal: lehký fade + 8px translate při vstupu do viewportu přes
 * IntersectionObserver. Po prvním zobrazení se observer odpojí — žádný loop.
 */
export function PhotoCard({ photo, onOpen }: PhotoCardProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Fallback pro prostředí bez IntersectionObserver (SSR, staré prohlížeče).
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '80px 0px 80px 0px', threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const dateLabel = formatDate(photo.date);

  return (
    <figure
      ref={ref}
      className={`group relative mb-6 break-inside-avoid bg-[#161618] rounded-lg overflow-hidden transition-all duration-500 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={interpolate(UI.photoCard.openPreviewAriaTemplate, {
          caption: photo.caption,
        })}
        className={`relative block w-full ${ASPECT_CLASS[photo.aspect]} overflow-hidden bg-[#161618] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0B]`}
      >
        <ImageWithFallback
          src={photo.imageUrl}
          alt={photo.caption}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
        />

        {/* Spodní gradient + caption — pointer-events-none, klik propadne na button. */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent pt-12 pb-4 px-4 pointer-events-none text-left">
          <figcaption className="text-[#F9FAFB] text-sm leading-snug">
            {photo.caption}
          </figcaption>
          <div className="text-[#9CA3AF] text-xs mt-1">{dateLabel}</div>
        </div>

        {/* Kategorie (volitelné) — stejný badge style jako u VideoCard. */}
        {photo.category && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-[#F59E0B] rounded text-xs text-[#0A0A0B] font-medium pointer-events-none">
            {photo.category}
          </div>
        )}
      </button>
    </figure>
  );
}
