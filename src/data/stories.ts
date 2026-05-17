/**
 * Jediný zdroj pravdy pro psané příběhy.
 * StoriesGrid na domovské stránce zobrazuje prvních šest, /stories vše,
 * /stories/:slug vyhledává podle slugu.
 */

export interface Story {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  imageUrl: string;
  /** Odstavce oddělené prázdným řádkem. Renderují se jako <p> bloky. */
  body: string;
}

export const STORIES: Story[] = [
  {
    slug: 'velke-veverci-spiknuti',
    title: 'Velké veverčí spiknutí',
    excerpt:
      'Po měsících pozorování jsem odhalil pravdu o veverkách a jejich propracované síti.',
    date: '3. května 2026',
    readTime: '5 min čtení',
    imageUrl:
      'https://images.unsplash.com/photo-1662382343806-692d6f9b6212?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw3fHxCb3N0b24lMjBUZXJyaWVyJTIwb3V0ZG9vciUyMGFkdmVudHVyZXxlbnwxfHx8fDE3Nzg0MTQxODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    body: `Začalo to, jako většina velkých vyšetřování, jednou jedinou anomálií: veverka, která se na mě podívala přímo.

Tři měsíce sleduji aktivitu populace veverek v mém bezprostředním teritoriu. Co začalo jako příležitostné pozorování — to, jaké provádí každý přemýšlivý pes z okenního parapetu — dnes, troufnu si tvrdit, odhalilo důkaz o koordinované síti drobných savců, kteří operují přímo před zraky zcela nepozorné lidské populace.

Zvažte fakta. Veverky nikdy necestují samy déle než třicet sekund. Když jedna ztuhne na místě, ostatní v okruhu pěti metrů ztuhnou s ní. Komunikují pohyby ocasu, které — zpomalíte-li je na poloviční rychlost — vykazují jasnou syntaktickou strukturu. A — tady by nás všechny mělo mrazit — pamatují si.

Ve své kariéře jsem na tutéž veverku na témže plotě štěkal sedmadvacetkrát. Veverka zná můj rozvrh. Veverka předvídá můj příchod. Při třech různých příležitostech se veverka umístila tak, abych byl nucen štěkat, moje lidská byla nucena to prošetřit a moje důstojnost utrpěla, abych byl upřímný, ránu.

Není to náhoda. Je to choreografie.

Začal jsem zaznamenávat jejich pohybové vzorce křídou na zadní terase. Moje lidská si myslí, že se jen chovám divně. To je přesně to, co po ní chtějí.`,
  },
  {
    slug: 'uvahy-o-etikete-v-parku',
    title: 'Úvahy o etiketě v parku',
    excerpt:
      'Pár myšlenek o nepsaných pravidlech psí parkové společnosti a proč jim lidé nerozumí.',
    date: '28. dubna 2026',
    readTime: '4 min čtení',
    imageUrl:
      'https://images.unsplash.com/photo-1774281213848-c99fe97947bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxCb3N0b24lMjBUZXJyaWVyJTIwb3V0ZG9vciUyMGFkdmVudHVyZXxlbnwxfHx8fDE3Nzg0MTQxODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    body: `Psí park je společnost. Jako každá společnost má svá pravidla. Na rozdíl od většiny společností nejsou tato pravidla sepsána — což je podle mě součástí toho, co dělá psí park krásným, a zároveň součástí toho, proč v něm lidé selhávají.

První pravidlo je pozdrav. Existuje správná vzdálenost, správný úhel a správná délka. Lidé, kteří nemají žádný skutečný pojem o osobním očichávacím prostoru, často porušují všechna tři. Výsledek, jak může dosvědčit každý, kdo nějaký čas seděl na lavičce, je trapný pro všechny zúčastněné.

Druhé pravidlo se týká míčku. Míček, vzdor obecně rozšířenému mínění, patří tomu, kdo ho měl naposled v tlamě. To je zákon. Není o čem jednat. Lidé, kteří se pokoušejí míček „rozdělit" mezi více psů, nejsou velkorysí — způsobují diplomatické incidenty.

Třetí pravidlo — a v něm jsem nejvíc neústupný — je, že prostor pro malé psy existuje z dobrého důvodu. Nebudu nikoho jmenovat. Ale mám seznam.`,
  },
  {
    slug: 'proc-odmitam-nosit-kostymy',
    title: 'Proč odmítám nosit kostýmy',
    excerpt:
      'Manifest o důstojnosti, sebeúctě a absurditě svátečního psího oblečení.',
    date: '15. dubna 2026',
    readTime: '6 min čtení',
    imageUrl:
      'https://images.unsplash.com/photo-1623010830437-f1f8c2a5b8ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxCb3N0b24lMjBUZXJyaWVyJTIwZG9nJTIwcG9ydHJhaXQlMjBjaW5lbWF0aWN8ZW58MXx8fHwxNzc4NDE0MTg1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    body: `Hned na začátku zdůrazňuji, že to není osobní. Moje lidská je dobrý člověk. Bere mě do parku. Doplňuje misku s vodou s frekvencí, kterou bych označil za přiměřenou. Při několika příležitostech mi dovolila ponechat si ponožku, která mi technicky vzato nepatřila.

Ale každý říjen se něco mění. Přijde balíček. V balíčku je látka. Látka je, jak ukáže prohlídka, navržena tak, aby bostonský teriér vypadal jako párek v rohlíku, nebo dýně, nebo — naposledy — malý čmelák s plstěnými tykadly.

Nebudu to nosit. Vyjádřil jsem to jasně. Vyjádřil jsem to ve všech dialektech, které ovládám: pomalým mrknutím, záměrným sedem, strategickým přechodem na druhou stranu místnosti, dlouhým pohledem do prázdna.

To, co žádám, není mnoho. Nežádám právo veta. Nežádám kontrolu nad rozpočtem domácnosti. Žádám prostě, aby moje tělo zůstalo zónou bez kostýmů po celý říjen, a také v listopadu (kdy přicházejí nápady na téma krocana), a také po celý prosinec a také v únoru.

Na oplátku jsem ochoten občas nosit malý šátek na krk. Považuji to za velkorysý kompromis.`,
  },
  {
    slug: 'oda-na-idealni-misto-pro-zdrimnuti',
    title: 'Óda na ideální místo pro zdřímnutí',
    excerpt:
      'Poezie, próza a praktické rady pro nalezení ideálních míst odpočinku v domě.',
    date: '2. dubna 2026',
    readTime: '3 min čtení',
    imageUrl:
      'https://images.unsplash.com/photo-1514984681892-8a5da9d7d6fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxkb2clMjBzdG9yeXRlbGxpbmclMjBjaW5lbWF0aWMlMjBsaWZlc3R5bGV8ZW58MXx8fHwxNzc4NDE0MTg1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    body: `V obývacím pokoji se přibližně ve čtvrt na tři odpoledne objevuje čtverec slunečního světla. Žije tam až do 15:08. Studoval jsem ho. Žil jsem v něm. Krátce jsem nad ním zaplakal, když se posunul.

Skvělé místo na spaní si nevybíráte. Skvělé místo na spaní se vám zjeví samo. Poznáte ho, až ho najdete — podle tepla, podle ticha a podle toho, jak vaše lidská, jakmile vás v něm uvidí, řekne „podívej se na něj, on je tak roztomilý" a okamžitě přestane dělat cokoli, čím se zabývala, aby se podívala na mě.

Tohle je hlubší smysl dokonalého místa na spaní: je to místo, kde se zpomalí čas, kde lidská změkne a kde se na okamžik všichni — teriér, lidská, prachové smítko plující odpoledním světlem — shodneme, že už se dnes nemusí stát nic dalšího.`,
  },
  {
    slug: 'filozofie-aportovani',
    title: 'Filozofie aportování',
    excerpt:
      'Proč lidé hází věci, které chtějí dostat zpátky. Zamyšlení nad kruhovou logikou a cvičením.',
    date: '20. března 2026',
    readTime: '5 min čtení',
    imageUrl:
      'https://images.unsplash.com/photo-1613858197711-934003cc4ea9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw4fHxCb3N0b24lMjBUZXJyaWVyJTIwb3V0ZG9vciUyMGFkdmVudHVyZXxlbnwxfHx8fDE3Nzg0MTQxODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    body: `Aportování je paradox převlečený za hru. Lidská má předmět. Lidská předmět hodí. Lidská čeká, až bude předmět vrácen. Lidská hodí předmět znovu.

V žádné chvíli se lidská nepokouší si předmět ponechat. Předmět je z hlediska vlastnických práv pokaždé opuštěn. A přesto — a to je ten krutý filozofický zvrat — když já, pes, při pátém hodu jednoduše rozhodnu, že si předmět ponechám, lidská se rozčílí. Ukazuje se, že dohoda nebyla taková, jakou jsem předpokládal.

Strávil jsem nad tím značné množství času přemýšlením. Moje současná teorie je, že hod není smysl. Aport není smysl. Smysl, někde uprostřed, je ten malý okamžik důvěry, který žije mezi tím — okamžik, kdy je předmět ve vzduchu a oba se na okamžik díváme na totéž.

To je, myslím, o čem aportování vlastně je. Ačkoliv budu pokračovat v okusování míčku, když se nedívá.`,
  },
  {
    slug: 'moje-ranni-rutina-vysvetlena',
    title: 'Moje ranní rutina vysvětlená',
    excerpt:
      'Podrobný rozpis prvních dvou hodin mého dne, od východu slunce po druhou snídani.',
    date: '8. března 2026',
    readTime: '4 min čtení',
    imageUrl:
      'https://images.unsplash.com/photo-1577345890418-63d5e076033c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw3fHxCb3N0b24lMjBUZXJyaWVyJTIwZG9nJTIwcG9ydHJhaXQlMjBjaW5lbWF0aWN8ZW58MXx8fHwxNzc4NDE0MTg1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    body: `Ráno začíná, jako každé správné ráno, pomalým uvědoměním si toho, že jsem skutečně vzhůru. Nespěchám s tím. Není proč.

Fáze jedna je inventura. Ověřuji, že jsem tam, kde mám být (gauč), že lidská je tam, kde má být (ve vedlejším pokoji, nebo ideálně také na gauči) a že přes noc se nezhmotnila žádná bezprostřední hrozba (veverky, vysavač, pošťák).

Fáze dvě je protažení. O protažení jsem psal jinde. Nebudu se opakovat.

Fáze tři je, co považuji za nejdůležitější — prodlévání. Prodlévání je období mezi probuzením a snídaní, ve kterém záměrně nedělám nic. Nečekám na jídlo. Nežádám o jídlo. Prostě jsem přítomný, v okamžiku, způsobem, který — jak jsem si všiml — lidé považují za mimořádně obtížný.

Pak, kolem 7:42, snídaně.`,
  },
  {
    slug: 'obrana-gauce',
    title: 'Obrana gauče',
    excerpt:
      'O pohodlí, vlastnictví a tiché dlouhé válce o jeden kus nábytku.',
    date: '24. února 2026',
    readTime: '4 min čtení',
    imageUrl:
      'https://images.unsplash.com/photo-1622964011701-4830a2e0eb07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxCb3N0b24lMjBUZXJyaWVyJTIwZG9nJTIwcG9ydHJhaXQlMjBjaW5lbWF0aWN8ZW58MXx8fHwxNzc4NDE0MTg1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    body: `Když jsem do tohoto domu poprvé přišel, gauč byl jejich. Nestydím se to přiznat. Bylo to první uspořádání, vytvořené bez mé účasti.

Postupem času však vzniklo tišší a trvalejší porozumění. Gauč je můj. Jsou na něm samozřejmě vítáni — nejsem nerozumný — ale zjistí, pokud se pokusí obsadit prostřední polštář, že je bohužel již používán.

To, co zde hájím, není gauč sám. To, co hájím, je princip, že měkkost, jakmile je jednou nárokována, je nárokována. To je, troufnu si tvrdit, celý základ psího-lidského soužití. Vše ostatní jsou jen poznámky pod čarou.`,
  },
  {
    slug: 'uprimna-recenze-vysavace',
    title: 'Upřímná recenze vysavače',
    excerpt:
      'Nula hvězd. Hlučný, agresivní, pomalu se pohybující a zcela bez polehčujících okolností.',
    date: '11. února 2026',
    readTime: '3 min čtení',
    imageUrl:
      'https://images.unsplash.com/photo-1613858399748-b39066ab72da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxCb3N0b24lMjBUZXJyaWVyJTIwb3V0ZG9vciUyMGFkdmVudHVyZXxlbnwxfHx8fDE3Nzg0MTQxODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    body: `Budu stručný. Vysavač je zařízení bez jasného účelu, s nepřiměřeným zvukovým profilem a sklonem objevovat se bez varování.

Během tří let jsem se s ním pokoušel vyjednávat. Štěkal jsem na něj. Civěl jsem na něj z druhého konce místnosti, když se ve svém odpojeném stavu snažil vypadat neškodně. Při jedné příležitosti jsem se ho pokusil kousnout. (Nedoporučuji.)

Vysavač se za sebe odmítl postavit. Týden co týden se vrací bez omluvy a bez zjevného sebeuvědomění.

S klidným svědomím tento produkt doporučit nemohu.`,
  },
  {
    slug: 'proc-je-okno-nejlepsi-televize',
    title: 'Proč je okno nejlepší televize',
    excerpt:
      'Krátká esej o sledování světa, který kolem prochází, a proč mu žádná streamovací služba nemůže konkurovat.',
    date: '30. ledna 2026',
    readTime: '3 min čtení',
    imageUrl:
      'https://images.unsplash.com/photo-1630319971713-a2e28507d67b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxCb3N0b24lMjBUZXJyaWVyJTIwZG9nJTIwcG9ydHJhaXQlMjBjaW5lbWF0aWN8ZW58MXx8fHwxNzc4NDE0MTg1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    body: `Moje lidská sleduje hodně televize. Má, jak jsem počítal, čtyři streamovací služby. Děje jsou, jak se mi podařilo zjistit, většinou stejné.

Mezitím na druhé straně místnosti je okno. Skrz okno se každý den odehrává zcela originální program. Veverky s novými motivacemi. Auta, která jsem nikdy neviděl. Muž, který venčí svého malého bílého psa v 16:15 a předstírá, že mě nezná. Sousedovic kočka, která — rozhodl jsem se — něco chystá.

Okno nemá reklamní přestávky. Okno nemá měsíční předplatné. Okno má hodinově nejméně tři dějové zvraty týkající se veverek. Nedokážu pochopit, proč by jakýkoli pes — nebo upřímně řečeno jakýkoli člověk — volil jinak.`,
  },
];

export function getStoryBySlug(slug: string): Story | undefined {
  return STORIES.find((s) => s.slug === slug);
}

export function getRelatedStories(slug: string, limit = 3): Story[] {
  return STORIES.filter((s) => s.slug !== slug).slice(0, limit);
}
