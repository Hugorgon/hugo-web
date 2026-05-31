import { useEffect, useMemo, useState } from 'react';
import { CategoryCard } from './CategoryCard';
import { Container } from './Container';
import { HOME } from '../../data/home';
import { VIDEOS as LOCAL_VIDEOS, type Video } from '../../data/videos';
import { ROUTES } from '../../data/routes';
import {
  fetchVideoCategories,
  LOCAL_VIDEO_CATEGORIES,
  type VideoCategoryEntry,
} from '../../lib/queries/videoCategories';
import { fetchVideos } from '../../lib/queries/videos';
import { interpolate } from '../../lib/format';

/**
 * Homepage „Prozkoumat kategorie" sekce.
 *
 * Karty jsou CMS-řízené (Sanity `videoCategory` collection). Title, description
 * a ikona přichází ze Sanity; section labels (`title`, `titleHighlight`,
 * `subtitle`) jsou pořád local v `HOME.categories.*`.
 *
 * Video count na každé kartě je počítaný live ze seznamu videí v dané
 * kategorii (`videos.filter(v => v.category === category.value).length`),
 * takže metrika není fake / placeholder — odpovídá reálnému obsahu webu.
 */
export function Categories() {
  // Initial state z local fallbacků — první render je sync a vizuálně shodný
  // s předchozí verzí. Sanity data přepíšou state až po async fetchi.
  const [categories, setCategories] = useState<VideoCategoryEntry[]>(
    LOCAL_VIDEO_CATEGORIES,
  );
  const [videos, setVideos] = useState<Video[]>(LOCAL_VIDEOS);

  useEffect(() => {
    let cancelled = false;
    fetchVideoCategories().then((data) => {
      if (!cancelled && data.length > 0) setCategories(data);
    });
    fetchVideos().then((data) => {
      if (!cancelled && data.length > 0) setVideos(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Spočítat počet videí pro každou kategorii v jednom průchodu.
  const countsByValue = useMemo(() => {
    const map = new Map<string, number>();
    for (const v of videos) {
      if (!v.category) continue;
      map.set(v.category, (map.get(v.category) ?? 0) + 1);
    }
    return map;
  }, [videos]);

  return (
    <section className="bg-[#0A0A0B] py-24">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#F9FAFB] mb-4">
            {HOME.categories.title}{' '}
            <span className="text-[#F59E0B]">{HOME.categories.titleHighlight}</span>
          </h2>
          <p className="text-[#D1D5DB] text-lg max-w-2xl mx-auto">
            {HOME.categories.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map(({ value, title, description, Icon }) => {
            const count = countsByValue.get(value) ?? 0;
            return (
              <CategoryCard
                key={value}
                title={title}
                description={description}
                icon={<Icon size={24} />}
                videoCount={interpolate(HOME.categories.videoCountTemplate, {
                  count,
                })}
                to={`${ROUTES.videos}?category=${encodeURIComponent(value)}`}
              />
            );
          })}
        </div>
      </Container>
    </section>
  );
}
