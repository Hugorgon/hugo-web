/**
 * Jediný zdroj pravdy pro fotogalerii.
 * GalleryPage renderuje všechny položky v 3-sloupcové masonry mozaice
 * s mixovanými poměry stran. Detail stránka zatím neexistuje — galerie
 * funguje jako čistý vizuální feed.
 */

export type PhotoAspect = '4/5' | '4/3' | '1/1' | '3/4' | '16/9';

export type PhotoCategory =
  | 'Dobrodružství'
  | 'Portrét'
  | 'Všední den'
  | 'Příroda'
  | 'Detail';

export interface Photo {
  id: string;
  imageUrl: string;
  caption: string;
  /** ISO datum publikace. */
  date: string;
  category?: PhotoCategory;
  aspect: PhotoAspect;
}

export const PHOTOS: Photo[] = [
  {
    id: 'rano-na-okne',
    imageUrl:
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=900&q=80',
    caption: 'Ranní rosa byla studenější, než vypadala.',
    date: '2026-05-12',
    category: 'Detail',
    aspect: '4/5',
  },
  {
    id: 'mezi-listim',
    imageUrl:
      'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=900&q=80',
    caption: 'Listí šustí jinak, když ho prozkoumáváte kožich-blízko.',
    date: '2026-05-10',
    category: 'Příroda',
    aspect: '4/3',
  },
  {
    id: 'portret-cerne-pozadi',
    imageUrl:
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=900&q=80',
    caption: 'Studiový portrét. Tvářil jsem se zaujatě.',
    date: '2026-05-08',
    category: 'Portrét',
    aspect: '3/4',
  },
  {
    id: 'sneha-pristihl',
    imageUrl:
      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=900&q=80',
    caption: 'První sníh roku. Beru ho jako osobní výzvu.',
    date: '2026-05-05',
    category: 'Dobrodružství',
    aspect: '1/1',
  },
  {
    id: 'kavarna-spolecnice',
    imageUrl:
      'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=900&q=80',
    caption: 'Doprovod do kavárny. Capuccino mě nezajímalo.',
    date: '2026-05-03',
    category: 'Všední den',
    aspect: '4/5',
  },
  {
    id: 'cesta-domu',
    imageUrl:
      'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=900&q=80',
    caption: 'Cesta domů má jiný rytmus, když nesete vlastní stín.',
    date: '2026-04-30',
    category: 'Všední den',
    aspect: '16/9',
  },
  {
    id: 'plaz-rano',
    imageUrl:
      'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=900&q=80',
    caption: 'Plážové ráno. Mokrý písek, suché poznámky.',
    date: '2026-04-27',
    category: 'Dobrodružství',
    aspect: '4/3',
  },
  {
    id: 'detail-tlapky',
    imageUrl:
      'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=900&q=80',
    caption: 'Tlapka po dešti. Někdo ji bude muset utřít.',
    date: '2026-04-25',
    category: 'Detail',
    aspect: '1/1',
  },
  {
    id: 'portret-zlate-svetlo',
    imageUrl:
      'https://images.unsplash.com/photo-1591946614720-90a587da4a36?w=900&q=80',
    caption: 'Zlatá hodina. Foto bylo pořízeno proti mé vůli.',
    date: '2026-04-22',
    category: 'Portrét',
    aspect: '4/5',
  },
  {
    id: 'park-zima',
    imageUrl:
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=900&q=80',
    caption: 'Park v půlce dubna. Ještě se klidně rozhodne pro zimu.',
    date: '2026-04-18',
    category: 'Příroda',
    aspect: '16/9',
  },
  {
    id: 'okno-domov',
    imageUrl:
      'https://images.unsplash.com/photo-1605897472359-85e4b94d685d?w=900&q=80',
    caption: 'Okenní hlídka. Veverka neprošla.',
    date: '2026-04-15',
    category: 'Všední den',
    aspect: '3/4',
  },
  {
    id: 'studio-cerno-bila',
    imageUrl:
      'https://images.unsplash.com/photo-1568572933382-74d440642117?w=900&q=80',
    caption: 'Černobílá. Lidé tomu říkají umění, já tomu říkám čtvrtek.',
    date: '2026-04-12',
    category: 'Portrét',
    aspect: '4/3',
  },
];
