/**
 * Jediný zdroj pravdy pro videoobsah.
 * FeaturedVideos na domovské stránce tahá první tři položky, archiv /videos
 * zobrazuje vše, /videos/:slug vyhledává podle slugu.
 */

export type VideoCategory = 'Dobrodružství' | 'Komentáře' | 'Návody' | 'Všední den';

export interface Video {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  duration: string;
  views: string;
  imageUrl: string;
  category: VideoCategory;
  publishedAt: string; // ISO datum
}

export const VIDEO_CATEGORIES: readonly VideoCategory[] = [
  'Dobrodružství',
  'Komentáře',
  'Návody',
  'Všední den',
] as const;

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
    views: '245K zhlédnutí',
    imageUrl:
      'https://images.unsplash.com/photo-1613858399748-b39066ab72da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxCb3N0b24lMjBUZXJyaWVyJTIwb3V0ZG9vciUyMGFkdmVudHVyZXxlbnwxfHx8fDE3Nzg0MTQxODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Dobrodružství',
    publishedAt: '2026-05-02',
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
    views: '189K zhlédnutí',
    imageUrl:
      'https://images.unsplash.com/photo-1622964011701-4830a2e0eb07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxCb3N0b24lMjBUZXJyaWVyJTIwZG9nJTIwcG9ydHJhaXQlMjBjaW5lbWF0aWN8ZW58MXx8fHwxNzc4NDE0MTg1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Komentáře',
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
    views: '312K zhlédnutí',
    imageUrl:
      'https://images.unsplash.com/photo-1579510768352-0566b89f11e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxkb2clMjBzdG9yeXRlbGxpbmclMjBjaW5lbWF0aWMlMjBsaWZlc3R5bGV8ZW58MXx8fHwxNzc4NDE0MTg1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Návody',
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
    views: '167K zhlédnutí',
    imageUrl:
      'https://images.unsplash.com/photo-1662382343806-692d6f9b6212?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw3fHxCb3N0b24lMjBUZXJyaWVyJTIwb3V0ZG9vciUyMGFkdmVudHVyZXxlbnwxfHx8fDE3Nzg0MTQxODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Dobrodružství',
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
    views: '203K zhlédnutí',
    imageUrl:
      'https://images.unsplash.com/photo-1630319971713-a2e28507d67b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxCb3N0b24lMjBUZXJyaWVyJTIwZG9nJTIwcG9ydHJhaXQlMjBjaW5lbWF0aWN8ZW58MXx8fHwxNzc4NDE0MTg1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Komentáře',
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
    views: '141K zhlédnutí',
    imageUrl:
      'https://images.unsplash.com/photo-1577345890418-63d5e076033c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw3fHxCb3N0b24lMjBUZXJyaWVyJTIwZG9nJTIwcG9ydHJhaXQlMjBjaW5lbWF0aWN8ZW58MXx8fHwxNzc4NDE0MTg1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Návody',
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
    views: '118K zhlédnutí',
    imageUrl:
      'https://images.unsplash.com/photo-1514984681892-8a5da9d7d6fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxkb2clMjBzdG9yeXRlbGxpbmclMjBjaW5lbWF0aWMlMjBsaWZlc3R5bGV8ZW58MXx8fHwxNzc4NDE0MTg1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Všední den',
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
    views: '198K zhlédnutí',
    imageUrl:
      'https://images.unsplash.com/photo-1774281213848-c99fe97947bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxCb3N0b24lMjBUZXJyaWVyJTIwb3V0ZG9vciUyMGFkdmVudHVyZXxlbnwxfHx8fDE3Nzg0MTQxODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Komentáře',
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
    views: '224K zhlédnutí',
    imageUrl:
      'https://images.unsplash.com/photo-1623010830437-f1f8c2a5b8ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxCb3N0b24lMjBUZXJyaWVyJTIwZG9nJTIwcG9ydHJhaXQlMjBjaW5lbWF0aWN8ZW58MXx8fHwxNzc4NDE0MTg1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Všední den',
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
