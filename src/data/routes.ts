/**
 * Interní routy projektu — single source of truth pro URL.
 *
 * Komponenty, navigace, data soubory i route definice v App.tsx
 * importují odsud. Při budoucím napojení CMS stačí přemapovat hodnoty
 * tady a celá navigační struktura se přepíše bez zásahu do komponent.
 *
 * Statické cesty (`videos`, `about`, ...) lze použít zaměnitelně v
 * `<Link to>` i v `<Route path>`. Pattern stringy
 * (`videoDetailPattern`, ...) jsou určené výhradně pro `<Route path>`.
 * URL pro konkrétní detail se staví buildery (`videoDetail(slug)`).
 */

export const ROUTES = {
  /** Statické cesty. */
  home: '/',
  videos: '/videos',
  stories: '/stories',
  gallery: '/fotogalerie',
  about: '/o-mne',
  contact: '/kontakt',
  privacy: '/zasady-soukromi',
  terms: '/podminky-pouzivani',

  /** Patterns pro <Route path> u detail stránek. */
  videoDetailPattern: '/videos/:slug',
  storyDetailPattern: '/stories/:slug',

  /** Hash kotva na sekci Newsletter na homepage. */
  newsletterAnchor: '/#newsletter',

  /** Builder URL pro detail konkrétního videa. */
  videoDetail: (slug: string): string => `/videos/${slug}`,

  /** Builder URL pro detail konkrétního článku. */
  storyDetail: (slug: string): string => `/stories/${slug}`,
} as const;
