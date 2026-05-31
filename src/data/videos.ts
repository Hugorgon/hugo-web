/**
 * Jediný zdroj pravdy pro videoobsah.
 * FeaturedVideos na domovské stránce tahá první tři položky, archiv /videos
 * zobrazuje vše, /videos/:slug vyhledává podle slugu.
 *
 * Kategorie jsou nyní CMS-řízené (Sanity `videoCategory` collection). Frontend
 * `VideoCategory` typ je čistý string — žádný TS union nad obsahem, protože
 * kategorie přidává editor v Studiu bez code change.
 *
 * `VIDEO_CATEGORY_FALLBACK` níže slouží jako local fallback dat pro filter
 * pilly a homepage karty před tím, než async fetch z Sanity doběhne (nebo
 * pokud Sanity není nakonfigurovaná). Hodnoty `value` v tomto poli MUSÍ
 * odpovídat slugům `videoCategory.value` v Sanity, jinak filtering nebude
 * fungovat.
 */

export type VideoCategory = string;

export interface Video {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  duration: string;
  views: string;
  imageUrl: string;
  /**
   * Slug kategorie. Odpovídá `videoCategory.value` v Sanity. Lokální VIDEOS
   * položky používají nové slugy; legacy stringy ('Dobrodružství' atd.) byly
   * zahozeny při category resetu.
   */
  category: VideoCategory;
  publishedAt: string; // ISO datum
  /**
   * Volitelná YouTube URL — watch, youtu.be, /embed, nebo /shorts.
   * Když je vyplněná, detail stránky renderuje skutečný YouTube iframe;
   * když chybí, padá zpět na statický náhled s play tlačítkem.
   */
  youtubeUrl?: string;
}

/**
 * Local fallback pro video kategorie — mirror Sanity `videoCategory` collection
 * shape. Slouží VideosPage a Categories.tsx pro sync první render před fetchem.
 * Pořadí drží `displayOrder` asc.
 */
export interface VideoCategoryItem {
  /** Stabilní slug, URL klíč. Odpovídá `videoCategory.value` v Sanity. */
  value: string;
  title: string;
  description: string;
  /** Klíč v `ICON_MAP` v `src/lib/queries/videoCategories.ts`. */
  iconKey: string;
  displayOrder: number;
  enabled: boolean;
}

export const VIDEO_CATEGORY_FALLBACK: readonly VideoCategoryItem[] = [
  {
    value: 'muj-pohled',
    title: 'Můj pohled',
    description: 'Nikdo se neptal. Stejně ho dostaneš.',
    iconKey: 'eye',
    displayOrder: 1,
    enabled: true,
  },
  {
    value: 'pristizen-pri-cinu',
    title: 'Přistižen při činu',
    description: 'Bez právníka nic neřeknu!',
    iconKey: 'camera',
    displayOrder: 2,
    enabled: true,
  },
  {
    value: 'humanoidi',
    title: 'Humanoidi',
    description: 'Výzkum stále probíhá.',
    iconKey: 'users',
    displayOrder: 3,
    enabled: true,
  },
  {
    value: 'vyjimecne-situace',
    title: 'Výjimečné situace',
    description: 'Nevím kam s tím, tak čuč.',
    iconKey: 'sparkles',
    displayOrder: 4,
    enabled: true,
  },
] as const;

/**
 * Pouze slugy nových kategorií. Zachováno pro místa, kde stačí seznam value
 * stringů (např. VideosPage `VALID_CATEGORIES` guard pro URL params).
 */
export const VIDEO_CATEGORIES: readonly string[] = VIDEO_CATEGORY_FALLBACK.map(
  (c) => c.value,
);

export const VIDEOS: Video[] = [
  {
    slug: 'moje-prvni-dobrodruzstvi-na-plazi',
    title: 'Moje první dobrodružství na pláži',
    description:
      'Poprvé objevuji oceán. Spoiler: vlny mi nesedí, ale dělám, že jsem statečný.',
    longDescription: `Bylo úterý — takové to úterý, které začíná vodítkem, jízdou autem a podezřele chybějící přípravou večeře. Moje lidská si sbalila tašku. Plážové osušky. Krém na opalování. Malý slunečník, který jsem se později pokusil zahrabat.

Když jsme dorazili, nejdřív mě udeřila vůně. Sůl, mokrý písek a něco staršího — něco prvotního. Oceán jsem už viděl, v dokumentech, které moje lidská sleduje, když si myslí, že spím. (Spím málokdy. Pozoruji.) Vidět ho ale naživo, slyšet ho řvát, byla úplně jiná věc.

Před kamerou se přiznám k momentu váhání na okraji vody. Ne strach — strach nikdy — ale pečlivé filozofické zvažování, zda je zapojení s entitou tak velkou strategicky rozumné. První vlna, když přišla, byla drzá. Druhá vlna o něco méně. U sedmé vlny jsme se vzájemně pochopili.

Při západu slunce jsem nepostavil žádný hrad z písku, snědl malé množství chaluh (nedoporučuji) a naučil se, že krabi jsou v podstatě hodně malí psi, kteří nenávidí všechny. Vrátil jsem se k autu jako proměněný teriér.`,
    duration: '8:24',
    views: '1000 kg+',
    imageUrl:
      '/images/hugo.jpg',
    category: 'vyjimecne-situace',
    publishedAt: '2026-05-02',
    youtubeUrl: 'https://youtube.com/shorts/Av8D1mnVDjA',
  },
  {
    slug: 'proc-jsou-lide-posedli-pamlsky',
    title: 'Proč jsou lidé posedlí pamlsky',
    description:
      'Filozofické zamyšlení nad lidskou tendencí odměňovat chování jídlem. Ironické, že ano?',
    longDescription: `Všiml jsem si, že lidé mají hluboké a poněkud trapné přesvědčení, že jídlo je odpověď na všechno. Sedni? Pamlsek. Zůstaň? Pamlsek. Nesněz gauč? Pamlsek. Je v tom systém a já v něm podle všech dostupných měřítek vítězím.

Nefascinují mě samotné pamlsky, ale propracovaný rituál, který si kolem nich lidé budují. Šuplík. Sáček. Třesení. Pomalý příchod. Pauza. Oční kontakt. Je to divadlo a oba jsme v něm herci.

V této epizodě se pokouším — s omezeným úspěchem — obrátit dynamiku a odměnit svoji lidskou za dobré chování. Spoiler: na zvoneček nereagovala.`,
    duration: '6:15',
    views: '1000 kg+',
    imageUrl:
      '/images/hugo.jpg',
    category: 'humanoidi',
    publishedAt: '2026-04-24',
  },
  {
    slug: 'umeni-spanku-mistrovsky-kurz',
    title: 'Umění spánku: mistrovský kurz',
    description:
      'Dovedl jsem umění strategického zdřímnutí k dokonalosti. Tady je vše, co potřebujete vědět o maximalizaci odpočinku.',
    longDescription: `Na světě jsou dva druhy psů: ti, kteří spí, a ti, kteří se to ještě nenaučili. Tohle je mistrovský kurz pro druhou skupinu.

Základy jsou jednoduché. Volba podkladu. Orientace těla. Hospodaření se světlem. Blízkost oblíbenému křeslu vaší lidské (tak akorát, aby se nemohla pohnout, aniž by si vás všimla). Většina amatérů dělá chybu, když volí pohodlí místo strategie. Pohodlí je vedlejší produkt strategie. Neplést.

Na konci této epizody pochopíte rozdíl mezi taktickým zdřímnutím (dvanáct minut, částečná bdělost, u průduchu) a hlubokým regeneračním spánkem (čtyřicet minut, úplné odevzdání, na něčem, co technicky vzato není vaše).`,
    duration: '12:30',
    views: '1000 kg+',
    imageUrl:
      '/images/hugo.jpg',
    category: 'muj-pohled',
    publishedAt: '2026-04-15',
  },
  {
    slug: 'veverci-hlidka-terenni-studie',
    title: 'Veverčí hlídka: terénní studie',
    description:
      'Tři měsíce pečlivého pozorování, sestříhané do definitivního veverčího dokumentu.',
    longDescription: `Vítejte v terénu. Devadesát dva dní dokumentuji chování, pohybové vzorce a znepokojivou inteligenci populace veverek na zahradě. To, co jsem se naučil, podle mě změní všechno.

Tohle není video o honbě. Honba je odpověď nepříliš sofistikovaného psa. Tohle je video o pozorování — trpělivém, metodickém, s chladným odstupem skutečného badatele. Je v tom rozdíl. Chtěl bych, aby si toho rozdílu někdo všiml.`,
    duration: '5:48',
    views: '1000 kg+',
    imageUrl:
      '/images/hugo.jpg',
    category: 'pristizen-pri-cinu',
    publishedAt: '2026-04-08',
  },
  {
    slug: 'jak-rozlustit-rec-lidskeho-tela',
    title: 'Jak rozluštit řeč lidského těla',
    description:
      'Nenápadná znamení, podle kterých poznáte, jestli se procházka blíží, odkládá, nebo se o ní jen mluví.',
    longDescription: `Lidé jsou přesvědčeni, že jsou nenápadní. Nejsou. Po třech letech důkladného studia mohu s jistotou prohlásit, že každá procházka, každé jídlo a každá jízda autem je oznámena tělem dávno před slovy.

V této epizodě rozebírám sedm mikropohybů, které by se měl naučit číst každý pes. Pohled na boty. Odložení telefonu. Sáhnutí po klíčích. Zaváhání u kabátu. Zastavení u dveří. Předstíraný strečink. A ten, o kterém lidé sami nevědí — letmý pohled k vodítku.`,
    duration: '9:12',
    views: '1000 kg+',
    imageUrl:
      '/images/hugo.jpg',
    category: 'humanoidi',
    publishedAt: '2026-03-30',
  },
  {
    slug: 'jak-zvladnout-dokonale-protazeni',
    title: 'Jak zvládnout dokonalé protažení',
    description:
      'Čtyřminutový průvodce jediným ranním rituálem, na kterém opravdu záleží. Včetně poznámek k technice.',
    longDescription: `Pozice psa hlavou dolů (ano, pojmenovaná po nás, není zač) není jógová pozice. Je to prohlášení. V tomto krátkém návodu probírám správné postavení tlapek, ideální oblouk páteře a přesnou délku povzdechu po protažení, který vaší lidské signalizuje, že jste teď ochotni začít zvažovat snídani.

Krátká pasáž je věnována i bočnímu protažení, které osobně nepodporuji, ale uvádím ho pro úplnost.`,
    duration: '4:30',
    views: '1000 kg+',
    imageUrl:
      '/images/hugo.jpg',
    category: 'muj-pohled',
    publishedAt: '2026-03-22',
  },
  {
    slug: 'ranni-rutina-pro-psy-se-vkusem',
    title: 'Ranní rutina pro psy se vkusem',
    description:
      'Den ze života v prvních devadesáti minutách, komentovaný s patřičnou vážností.',
    longDescription: `Ráno je posvátné. Způsob, jakým začnete den, určuje, jak ho strávíte, a pokud ho trávíte spánkem na gauči (a já ano), musí být vaše ráno pečlivě nakalibrované.

Tato epizoda je natočená v reálném čase. Bez střihů. Bez triků. Jen jeden bostonský teriér prochází svým ránem s rozvahou tvora, který přesně ví, kde se schovává druhá snídaně.`,
    duration: '7:55',
    views: '1000 kg+',
    imageUrl:
      '/images/hugo.jpg',
    category: 'muj-pohled',
    publishedAt: '2026-03-14',
  },
  {
    slug: 'spisy-postaka-vysetrovani',
    title: 'Spisy pošťáka: vyšetřování',
    description:
      'Chodí každý den. Nosí papír. Odchází. Co plánuje? Vedu si poznámky.',
    longDescription: `Každý den přibližně v 11:42 přichází muž v uniformě k našemu domu, vkládá předměty štěrbinou ve dveřích a odchází. Tři roky na něj štěkám. Tři roky stále chodí.

Tato epizoda je výsledkem šestitýdenní sledovací operace. Mám záznamy. Mám fotografie. Mám — navzdory svému lepšímu úsudku — teorii.`,
    duration: '6:42',
    views: '1000 kg+',
    imageUrl:
      '/images/hugo.jpg',
    category: 'pristizen-pri-cinu',
    publishedAt: '2026-03-05',
  },
  {
    slug: 'den-koupele-uprimna-recenze',
    title: 'Den koupele: upřímná recenze',
    description:
      'Dvě hvězdy. Voda byla teplá, ručníky měkké, zážitek byl osobní zradou.',
    longDescription: `Podívejte. Nebudu předstírat, že to byl pozitivní zážitek. Nebyl. Šampon agresivně voněl. Hluk z kohoutku byl nepřijatelný. Moje lidská použila slova „hodný kluk" přibližně sedmadvacetkrát, což jsem se naučil rozpoznávat jako moment, kdy se chystá udělat něco, co se mi nebude líbit.

Pravda však je, že běsnění po koupeli bylo profesionální úrovně. Ocenění přijímám v komentářích.`,
    duration: '5:20',
    views: '1000 kg+',
    imageUrl:
      '/images/hugo.jpg',
    category: 'vyjimecne-situace',
    publishedAt: '2026-02-26',
  },
];

export function getVideoBySlug(slug: string): Video | undefined {
  return VIDEOS.find((v) => v.slug === slug);
}

/**
 * Vrátí až `limit` dalších videí pro zobrazení vedle `slug`.
 * Videa ze stejné kategorie mají přednost; zbytek seznamu doplní případnou mezeru.
 */
export function getRelatedVideos(slug: string, limit = 3): Video[] {
  const current = getVideoBySlug(slug);
  const others = VIDEOS.filter((v) => v.slug !== slug);
  if (!current) return others.slice(0, limit);

  const sameCategory = others.filter((v) => v.category === current.category);
  const otherCategory = others.filter((v) => v.category !== current.category);
  return [...sameCategory, ...otherCategory].slice(0, limit);
}
