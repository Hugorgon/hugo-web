import { useEffect, useMemo, useState } from 'react';
import { CategoryCard } from './CategoryCard';
import { Container } from './Container';
import { HOME } from '../../data/home';
import { type Video } from '../../data/videos';
import { ROUTES } from '../../data/routes';
import {
  fetchVideoCategories,
  type VideoCategoryEntry,
} from '../../lib/queries/videoCategories';
import { fetchVideos } from '../../lib/queries/videos';
import { interpolate } from '../../lib/format';

export function Categories() {
  const [categories, setCategories] = useState<VideoCategoryEntry[] | null>(null);
  const [videos, setVideos] = useState<Video[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchVideoCategories().then((data) => {
      if (!cancelled) setCategories(data);
    });
    fetchVideos().then((data) => {
      if (!cancelled) setVideos(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Spočítat počet videí pro každou kategorii v jednom průchodu.
  // Null-safe: runs before the guard but handles null gracefully.
  const countsByValue = useMemo(() => {
    const map = new Map<string, number>();
    for (const v of (videos ?? [])) {
      if (!v.category) continue;
      map.set(v.category, (map.get(v.category) ?? 0) + 1);
    }
    return map;
  }, [videos]);

  if (!categories || !videos) return null;

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
