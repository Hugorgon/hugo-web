/**
 * Globální brand a sdílené texty napříč webem.
 * Single source of truth pro logo, popis projektu a copyright.
 */

export const SITE = {
  brand: {
    /** První, primární část loga (bílá). */
    name: 'Hugo',
    /** Druhá, oranžová část loga. */
    suffix: 'Stories',
  },
  /** Krátký popis projektu — používán ve Footeru pod logem. */
  description:
    'Charismatický bostonský teriér sdílí příběhy, názory a filmová krátká videa z psí perspektivy.',
  /** Plný copyright řádek ve Footeru. */
  copyright: '© 2026 Hugo Stories. Všechna práva vyhrazena.',
} as const;
