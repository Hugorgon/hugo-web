import { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Container } from '../components/Container';
import { PageHeader } from '../components/PageHeader';
import { PhotoCard } from '../components/PhotoCard';
import { Lightbox } from '../components/Lightbox';
import { type Photo } from '../../data/photos';
import { fetchPhotos } from '../../lib/queries/photos';
import {
  fetchGalleryPage,
  type GalleryPageData,
} from '../../lib/queries/galleryPage';

export function GalleryPage() {
  const [photos, setPhotos] = useState<Photo[] | null>(null);
  const [page, setPage] = useState<GalleryPageData | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchPhotos().then((data) => {
      if (!cancelled) setPhotos(data);
    });
    fetchGalleryPage().then((data) => {
      if (!cancelled && data) setPage(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!photos || !page) return null;

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
            eyebrow={page.pageHeader.eyebrow}
            title={
              <>
                {page.pageHeader.titleLead && (
                  <>{page.pageHeader.titleLead}{' '}</>
                )}
                <span className="text-[#F59E0B]">
                  {page.pageHeader.titleHighlight}
                </span>
              </>
            }
            subtitle={page.pageHeader.subtitle}
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
