/**
 * PageHeader copy pro archive/portfolio stránky.
 * Sjednocený tvar: každá stránka má `header` s eyebrow, volitelným
 * `titleLead` (bílá část nadpisu), `titleHighlight` (oranžová) a subtitle.
 * Pokud `titleLead` chybí, nadpis je celý oranžový.
 *
 * Kontaktní stránka (/kontakt) má vlastní header v contact.ts — drží
 * obsah pro tu stránku pohromadě.
 */

export interface PageHeaderCopy {
  eyebrow: string;
  /** Bílá část nadpisu před highlightem. Optional — když chybí, nadpis je celý highlight. */
  titleLead?: string;
  titleHighlight: string;
  subtitle: string;
}

export const PAGES = {
  videos: {
    header: {
      eyebrow: 'Všechny epizody',
      titleLead: 'Archiv',
      titleHighlight: 'videí',
      subtitle:
        'Všechna filmová dobrodružství, komentáře a návody — na jednom místě.',
    } satisfies PageHeaderCopy,
  },
  stories: {
    header: {
      eyebrow: 'Psané příběhy',
      titleHighlight: 'Archiv',
      subtitle: 'Eseje, postřehy a občasné výlevy — od psa s názorem.',
    } satisfies PageHeaderCopy,
  },
  gallery: {
    header: {
      eyebrow: 'Fotogalerie',
      titleLead: 'Mžiky a',
      titleHighlight: 'okamžiky',
      subtitle:
        'Rychlé snímky ze dne — drobnosti, které nestihly natočit ani napsat.',
    } satisfies PageHeaderCopy,
  },
  about: {
    header: {
      eyebrow: 'O mně',
      titleLead: 'Hugo,',
      titleHighlight: 'vypravěč s vlhkým nosem',
      subtitle:
        'Bostonský teriér, který se rozhodl, že život pětatřicet centimetrů od země si zaslouží vlastní filmovou kroniku.',
    } satisfies PageHeaderCopy,
  },
  contact: {
    header: {
      eyebrow: 'Napište nám',
      titleLead: 'Kontaktujte',
      titleHighlight: 'Huga',
      subtitle:
        'Pište mi. Tedy — pište mé lidské. Já mám v rozvrhu hlavně spaní a pozorování.',
    } satisfies PageHeaderCopy,
  },
} as const;
