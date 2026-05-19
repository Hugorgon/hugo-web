import { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Container } from '../components/Container';
import { PageHeader } from '../components/PageHeader';
import { PhotoCard } from '../components/PhotoCard';
import { Lightbox } from '../components/Lightbox';
import { PHOTOS as LOCAL_PHOTOS, type Photo } from '../../data/photos';
import { PAGES } from '../../data/pages';
import { fetchPhotos } from '../../lib/queries/photos';

/**
 * Fotogalerie — vizuální feed s mixed aspect ratio mozaikou.
 * Stránka záměrně nepoužívá Container pro samotnou mozaiku — galerie sahá
 * až k `max-w-[1920px]` s vlastním horizontálním paddingem, aby na velkých
 * monitorech působila organičtěji než klasický 1280px archiv.
 *
 * Masonry layout = čisté CSS `columns-*` + `break-inside-avoid` na kartách
 * (žádná knihovna). Reveal a hover je řešený přímo v PhotoCard.
 *
 * Lightbox je vykreslený vedle main na úrovni page rootu, aby překryl
 * navbar i celou galerii. Otevření / zavírání / navigaci řídí lokální stav
 * `selectedIndex`.
 *
 * Data flow:
 *  - Initial state z local fallbacku (`LOCAL_PHOTOS`) — první render je
 *    synchronní a vizuálně identický s předchozí verzí.
 *  - Sanity data přepíšou state až po async fetchi (pokud existují).
 */
export function GalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>(LOCAL_PHOTOS);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchPhotos().then((data) => {
      if (!cancelled && data.length > 0) setPhotos(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const selectedPhoto =
    selectedIndex !== null ? photos[selectedIndex] ?? null : null;

  const handleClose = () => setSelectedIndex(null);

  const handlePrev = () =>
    setSelectedIndex((current) =>
      current === null
        ? null
        : current === 0
          ? photos.length - 1
          : current - 1,
    );

  const handleNext = () =>
    setSelectedIndex((current) =>
      current === null
        ? null
        : current === photos.length - 1
          ? 0
          : current + 1,
    );

  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      <Navbar />
      <main className="pt-32 pb-24">
        <Container>
          <PageHeader
            eyebrow={PAGES.gallery.header.eyebrow}
            title={
              <>
                {PAGES.gallery.header.titleLead}{' '}
                <span className="text-[#F59E0B]">
                  {PAGES.gallery.header.titleHighlight}
                </span>
              </>
            }
            subtitle={PAGES.gallery.header.subtitle}
          />
        </Container>

        {/* Full-bleed gallery surface, kapováno na 1920px. */}
        <div className="w-full max-w-[1920px] mx-auto px-6 lg:px-12">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
            {photos.map((photo, index) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                onOpen={() => setSelectedIndex(index)}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />

      <Lightbox
        photo={selectedPhoto}
        onClose={handleClose}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
}
