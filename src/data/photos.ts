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
      '/images/hugo.jpg',
    caption: 'Ranní rosa byla studenější, než vypadala.',
    date: '2026-05-12',
    category: 'Detail',
    aspect: '4/5',
  },
  {
    id: 'mezi-listim',
    imageUrl:
      '/images/hugo.jpg',
    caption: 'Listí šustí jinak, když ho prozkoumáváte kožich-blízko.',
    date: '2026-05-10',
    category: 'Příroda',
    aspect: '4/3',
  },
  {
    id: 'portret-cerne-pozadi',
    imageUrl:
      '/images/hugo.jpg',
    caption: 'Studiový portrét. Tvářil jsem se zaujatě.',
    date: '2026-05-08',
    category: 'Portrét',
    aspect: '3/4',
  },
  {
    id: 'sneha-pristihl',
    imageUrl:
      '/images/hugo.jpg',
    caption: 'První sníh roku. Beru ho jako osobní výzvu.',
    date: '2026-05-05',
    category: 'Dobrodružství',
    aspect: '1/1',
  },
  {
    id: 'kavarna-spolecnice',
    imageUrl:
      '/images/hugo.jpg',
    caption: 'Doprovod do kavárny. Capuccino mě nezajímalo.',
    date: '2026-05-03',
    category: 'Všední den',
    aspect: '4/5',
  },
  {
    id: 'cesta-domu',
    imageUrl:
      '/images/hugo.jpg',
    caption: 'Cesta domů má jiný rytmus, když nesete vlastní stín.',
    date: '2026-04-30',
    category: 'Všední den',
    aspect: '16/9',
  },
  {
    id: 'plaz-rano',
    imageUrl:
      '/images/hugo.jpg',
    caption: 'Plážové ráno. Mokrý písek, suché poznámky.',
    date: '2026-04-27',
    category: 'Dobrodružství',
    aspect: '4/3',
  },
  {
    id: 'detail-tlapky',
    imageUrl:
      '/images/hugo.jpg',
    caption: 'Tlapka po dešti. Někdo ji bude muset utřít.',
    date: '2026-04-25',
    category: 'Detail',
    aspect: '1/1',
  },
  {
    id: 'portret-zlate-svetlo',
    imageUrl:
      '/images/hugo.jpg',
    caption: 'Zlatá hodina. Foto bylo pořízeno proti mé vůli.',
    date: '2026-04-22',
    category: 'Portrét',
    aspect: '4/5',
  },
  {
    id: 'park-zima',
    imageUrl:
      '/images/hugo.jpg',
    caption: 'Park v půlce dubna. Ještě se klidně rozhodne pro zimu.',
    date: '2026-04-18',
    category: 'Příroda',
    aspect: '16/9',
  },
  {
    id: 'okno-domov',
    imageUrl:
      '/images/hugo.jpg',
    caption: 'Okenní hlídka. Veverka neprošla.',
    date: '2026-04-15',
    category: 'Všední den',
    aspect: '3/4',
  },
  {
    id: 'studio-cerno-bila',
    imageUrl:
      '/images/hugo.jpg',
    caption: 'Černobílá. Lidé tomu říkají umění, já tomu říkám čtvrtek.',
    date: '2026-04-12',
    category: 'Portrét',
    aspect: '4/3',
  },
];
