import type { LucideIcon } from 'lucide-react';
import { Award, Heart, Star, Zap } from 'lucide-react';
import { ROUTES } from './routes';

/**
 * Obsah pro AboutHugo (homepage sekce) i AboutPage (/o-mne).
 * Sdílený portrét, badge, 4 feature ikony a první dva bio odstavce.
 * AboutPage doplňuje extra odstavec a vlastní h2 v `pageSection`.
 * Stránkové sekce „Nejnovější videa" / „Nejnovější příběhy" mají vlastní
 * podstromy `latestVideos` / `latestStories`.
 */

export interface AboutFeature {
  Icon: LucideIcon;
  title: string;
  description: string;
}

export const ABOUT = {
  portrait: {
    imageUrl:
      '/images/hugo.jpg',
    alt: 'Portrét Huga',
  },
  badge: {
    number: '3+',
    label: 'roky tvorby',
  },
  features: [
    {
      Icon: Award,
      title: 'Oceněný',
      description: 'Nejlepší obsah o mazlíčcích 2025',
    },
    {
      Icon: Star,
      title: 'Nejvýše hodnocený',
      description: '1000 kg+',
    },
    {
      Icon: Heart,
      title: 'Komunita',
      description: '1000 kg+',
    },
    {
      Icon: Zap,
      title: 'Pravidelný',
      description: 'Nové epizody každý týden',
    },
  ] satisfies AboutFeature[],
  /** Sdílené bio odstavce — AboutHugo používá oba, AboutPage je doplňuje extra paragraphem. */
  bioParagraphs: [
    'Jsem bostonský teriér s vášní pro vyprávění a citem pro filmovou zkratku. Narodil jsem se v Bostonu (kde jinde) a poslední tři roky dokumentuji život z úhlu, který většina lidí přehlíží — asi pětatřicet centimetrů od země.',
    'Můj obsah kombinuje dechberoucí obrazy s ostrými, lehce sarkastickými komentáři ke všemu — od veverčí politiky po existenciální tíseň při čekání na večeři. Nejsem jen pes s kamerou. Jsem vypravěč, filozof a občas komik.',
  ],
  /** Sekce „Seznamte se s Hugem" na homepage. */
  homeSection: {
    title: 'Seznamte se s',
    titleHighlight: 'Hugem',
    ctaLabel: 'Více o mně',
    ctaTo: ROUTES.about,
  },
  /** Hlavní intro sekce na /o-mne stránce. */
  pageSection: {
    title: 'Pes, který si všiml',
    titleHighlight: 'víc, než měl',
    extraParagraph:
      'Začalo to nevinně, jednou krátkou epizodou o ranní rutině. Dneska už mám stovky příběhů, věrné publikum a stálý pocit, že lidé jsou pořád dost zajímavé téma — alespoň pro psa.',
  },
  /** Sekce „Nejnovější videa" na /o-mne. */
  latestVideos: {
    title: 'Nejnovější',
    titleHighlight: 'videa',
    subtitle: 'Co jsem natočil v poslední době',
    viewAllLabel: 'Zobrazit vše →',
    viewAllTo: ROUTES.videos,
  },
  /** Sekce „Nejnovější příběhy" na /o-mne. */
  latestStories: {
    title: 'Nejnovější',
    titleHighlight: 'příběhy',
    subtitle: 'Co jsem napsal v poslední době',
    viewAllLabel: 'Zobrazit vše →',
    viewAllTo: ROUTES.stories,
  },
} as const;
