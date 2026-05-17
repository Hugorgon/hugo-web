/**
 * Centralizované UI texty, které neměly přirozený domov v page/section
 * data souborech (`home.ts`, `about.ts`, `pages.ts`, `contact.ts`).
 *
 * Pravidlo: jakýkoli český string v komponentě, který uvidí uživatel
 * (vč. aria-labelů), patří sem. Při budoucím i18n se tahle data získají
 * z translation backendu — komponenty se měnit nemusí.
 *
 * Template strings používají `{placeholder}` syntax a interpolate()
 * helper z `src/lib/format.ts`.
 */

export const UI = {
  nav: {
    /**
     * Suffix do logo home-link aria-labelu.
     * Plný label se v komponentě skládá jako
     * `${SITE.brand.name} ${SITE.brand.suffix} ${UI.nav.homeAriaSuffix}`.
     */
    homeAriaSuffix: '— domů',
    openMenu: 'Otevřít menu',
    closeMenu: 'Zavřít menu',
  },
  archive: {
    /** Aria-label nad pásem filter pillů (Videa archiv). */
    filterAriaLabel: 'Filtrovat podle kategorie',
    videos: {
      loadMore: 'Načíst další videa',
      countTemplate: 'Zobrazeno {visible} z {total} videí',
      emptyCategory: 'V této kategorii zatím nejsou žádná videa.',
      /** Label pillu „all categories" — zároveň interní sentinel filtru. */
      filterAll: 'Vše',
    },
    stories: {
      loadMore: 'Načíst další příběhy',
      countTemplate: 'Zobrazeno {visible} z {total} příběhů',
    },
  },
  detail: {
    videoBackLink: 'Zpět do archivu',
    storyBackLink: 'Zpět k příběhům',
  },
  lightbox: {
    dialogLabel: 'Náhled fotky',
    closeLabel: 'Zavřít náhled',
    prevLabel: 'Předchozí fotka',
    nextLabel: 'Další fotka',
  },
  photoCard: {
    /** Aria-label šablona pro kliknutí na fotku. */
    openPreviewAriaTemplate: 'Otevřít náhled: {caption}',
  },
} as const;
