import type { LucideIcon } from 'lucide-react';
import {
  Compass,
  Facebook,
  GraduationCap,
  Home as HomeIcon,
  Instagram,
  MessageCircle,
  Youtube,
} from 'lucide-react';

/**
 * Obsah pro homepage sekce (kromě AboutHugo, který má vlastní pass do about.ts).
 * Každá sekce má vlastní podstrom — komponenty čerpají z HOME.<sectionKey>.
 *
 * Konvence:
 *  - title: bílá část nadpisu
 *  - titleHighlight: oranžová zvýrazněná část (vykresluje komponenta)
 *  - subtitle: krátký popisek pod h2
 *  - viewAllLabel / loadMoreLabel: odkaz „Zobrazit vše →" / „Načíst další →"
 */

export interface HeroStat {
  /** Cílová hodnota počítadla (CountUp end). */
  end: number;
  /** Sufix za číslem ("+" apod.). */
  suffix: string;
  /** Hlavní popisek pod číslem. */
  label: string;
  /** Sekundární drobnější popisek. */
  subtext: string;
  /** Zpoždění startu animace v sekundách. */
  delay: number;
}

export interface CategoryItem {
  /** Slug = název kategorie tak, jak ji posíláme do URL `?category=...`. */
  slug: string;
  title: string;
  description: string;
  Icon: LucideIcon;
  videoCount: string;
}

export interface SocialPlatformItem {
  platform: string;
  Icon: LucideIcon;
  followers: string;
  description: string;
  handle: string;
}

export const HOME = {
  hero: {
    eyebrow: 'Nová epizoda každý týden',
    title: 'Život',
    titleHighlight: 'psíma očima',
    bio: 'Jsem Hugo, bostonský teriér s vyhraněnými názory. Sledujte, jak procházím absurditami lidského života, sdílím filmová dobrodružství a nabízím postřehy o něco bystřejší, než byste od průměrného psa čekali.',
    primaryCta: 'Pustit nejnovější epizodu',
    secondaryCta: 'Prozkoumat příběhy',
    stats: [
      {
        end: 2555,
        suffix: '+',
        label: 'dní zkušeností',
        subtext: 'Psí život v praxi',
        delay: 0.6,
      },
      {
        end: 84,
        suffix: '+',
        label: 'měsíců s lidmi',
        subtext: 'Terénní výzkum lidstva',
        delay: 0.7,
      },
      {
        end: 999,
        suffix: '+',
        label: 'názorů',
        subtext: 'Většinou nevyžádaných',
        delay: 0.8,
      },
    ] satisfies HeroStat[],
  },

  featuredVideos: {
    title: 'Vybraná',
    titleHighlight: 'videa',
    subtitle: 'Filmové příběhy a sarkastické komentáře přímo ode mě',
    viewAllLabel: 'Zobrazit vše →',
  },

  categories: {
    title: 'Prozkoumat',
    titleHighlight: 'kategorie',
    subtitle: 'Ponořte se do různých stránek mého života a moudrosti',
    items: [
      {
        slug: 'Dobrodružství',
        title: 'Dobrodružství',
        description:
          'Poznávám svět, jedno přičichnutí po druhém. Od parků až po pláže — buďte u mých statečných výprav.',
        Icon: Compass,
        videoCount: '1000 kg+',
      },
      {
        slug: 'Všední den',
        title: 'Všední den',
        description:
          'Všední okamžiky, které dělají život zajímavým. Jak se dívám na polštáře na gauči i na čas večeře.',
        Icon: HomeIcon,
        videoCount: '1000 kg+',
      },
      {
        slug: 'Komentáře',
        title: 'Komentáře',
        description:
          'Postřehy k lidskému chování, podávané s typickým sarkasmem a šarmem.',
        Icon: MessageCircle,
        videoCount: '1000 kg+',
      },
      {
        slug: 'Návody',
        title: 'Návody',
        description:
          'Životně důležité dovednosti, které by měl ovládat každý pes (i člověk). Učí odborník: já.',
        Icon: GraduationCap,
        videoCount: '1000 kg+',
      },
    ] satisfies CategoryItem[],
  },

  storiesGrid: {
    title: 'Psané',
    titleHighlight: 'příběhy',
    subtitle: 'Myšlenky, postřehy a občasné výlevy z mé perspektivy',
    loadMoreLabel: 'Načíst další příběhy →',
  },

  socialContent: {
    title: 'Sledujte mou',
    titleHighlight: 'cestu',
    subtitle:
      'Spojte se se mnou na sociálních sítích — denní aktualizace a exkluzivní obsah',
    platforms: [
      {
        platform: 'Instagram',
        Icon: Instagram,
        followers: '1000 kg+',
        description: 'Denní stories a zákulisí',
        handle: '@hugorgon',
      },
      {
        platform: 'YouTube',
        Icon: Youtube,
        followers: '1000 kg+',
        description: 'Plnohodnotné filmové epizody',
        handle: '@Hugorgon',
      },
      {
        platform: 'Facebook',
        Icon: Facebook,
        followers: '1000 kg+',
        description: 'Komunita a diskuse',
        handle: 'Hugo Stories',
      },
    ] satisfies SocialPlatformItem[],
  },

  newsletter: {
    heading: 'Přidejte se ke smečce',
    lead: 'Každý týden vám pošlu příběhy, exkluzivní zákulisí a občasné filozofické zamyšlení rovnou do schránky. Žádný spam — jen kvalitní obsah od psa s názorem.',
    inputPlaceholder: 'Zadejte svůj e-mail',
    inputAriaLabel: 'E-mailová adresa',
    submitLabel: 'Odebírat',
    checks: ['Týdenní aktualizace', 'Exkluzivní obsah', 'Odhlášení kdykoli'],
  },
} as const;
