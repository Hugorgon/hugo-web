import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Photo } from '../../data/photos';
import { UI } from '../../data/ui';
import { formatDate } from '../../lib/format';

interface LightboxProps {
  photo: Photo | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

/**
 * Fullscreen lightbox náhled pro fotogalerii.
 * Lightweight implementace — žádná knihovna, žádný focus trap,
 * žádný portal. Lokální stav pro entrance animaci, globální keydown
 * listener pro Escape/←/→, body scroll lock při otevření.
 *
 * Klik na backdrop = zavřít.
 * Klik na obrázek = stopPropagation, nezavírá.
 * Exit animace záměrně chybí — close je instant unmount, drží to lightweight.
 */
export function Lightbox({ photo, onClose, onPrev, onNext }: LightboxProps) {
  const [entered, setEntered] = useState(false);

  // Entrance animation — po prvním paintu s entered=false flipneme na true
  // přes rAF, aby browser stihl namalovat počáteční stav a transition zaběhl.
  useEffect(() => {
    if (photo) {
      const id = requestAnimationFrame(() => setEntered(true));
      return () => cancelAnimationFrame(id);
    }
    setEntered(false);
  }, [photo]);

  // Klávesnice — ESC zavře, šipky listují.
  useEffect(() => {
    if (!photo) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        onPrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        onNext();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [photo, onClose, onPrev, onNext]);

  // Body scroll lock — zabrání scrollu galerie pod lightboxem.
  useEffect(() => {
    if (!photo) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [photo]);

  if (!photo) return null;

  const dateLabel = formatDate(photo.date);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={UI.lightbox.dialogLabel}
      className={`fixed inset-0 z-50 flex items-center justify-center p-6 transition-opacity duration-200 ease-out ${
        entered ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Backdrop — klik mimo obrázek zavře. */}
      <div
        className="absolute inset-0 bg-[#0A0A0B]/95 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Zavírací X. */}
      <button
        type="button"
        onClick={onClose}
        aria-label={UI.lightbox.closeLabel}
        className="absolute top-4 right-4 z-10 p-2 rounded-full text-[#F9FAFB] hover:text-[#F59E0B] hover:bg-white/5 transition-colors"
      >
        <X size={28} />
      </button>

      {/* Předchozí. */}
      <button
        type="button"
        onClick={onPrev}
        aria-label={UI.lightbox.prevLabel}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full text-[#F9FAFB] hover:text-[#F59E0B] hover:bg-white/5 transition-colors"
      >
        <ChevronLeft size={32} />
      </button>

      {/* Další. */}
      <button
        type="button"
        onClick={onNext}
        aria-label={UI.lightbox.nextLabel}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full text-[#F9FAFB] hover:text-[#F59E0B] hover:bg-white/5 transition-colors"
      >
        <ChevronRight size={32} />
      </button>

      {/* Obrázek + caption — stopPropagation drží klik dovnitř. */}
      <figure
        onClick={(event) => event.stopPropagation()}
        className={`relative z-10 flex flex-col items-center max-w-[90vw] max-h-[90vh] transition-all duration-200 ease-out ${
          entered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <ImageWithFallback
          src={photo.imageUrl}
          alt={photo.caption}
          className="max-w-[90vw] max-h-[80vh] object-contain rounded-lg"
        />
        <figcaption className="mt-4 text-center max-w-2xl">
          <div className="text-[#F9FAFB] text-base leading-snug">
            {photo.caption}
          </div>
          <div className="text-[#9CA3AF] text-sm mt-1">{dateLabel}</div>
        </figcaption>
      </figure>
    </div>
  );
}
