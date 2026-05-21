import { defineArrayMember, defineField, defineType } from 'sanity';

/**
 * About — singleton.
 *
 * Sdílený zdroj obsahu pro homepage sekci „AboutHugo" i pro dedikovanou
 * stránku /o-mne. Drží:
 *
 *  - portrait        → profilový obrázek + alt text (společný oběma sekcím)
 *  - badge           → oranžová plaketa pod obrázkem (number + label)
 *  - bioParagraphs   → 1–6 odstavců sdíleného bio textu
 *  - features        → 1–8 stat karet (icon dropdown + title + description)
 *  - homeSection     → titulky a CTA pro AboutHugo (homepage sekce)
 *  - pageSection     → titulky a doplňující odstavec pro /o-mne stránku
 *  - pageHeader      → eyebrow + lead/highlight nadpis + subtitle nad
 *                       /o-mne stránkou (page-level hero)
 *  - latestVideos    → titulky a viewAll label pro „Nejnovější videa" sekci
 *                       na /o-mne (samotná videa pořád přes `video` collection)
 *  - latestStories   → titulky a viewAll label pro „Nejnovější příběhy" sekci
 *                       na /o-mne (samotné stories pořád přes `story` collection)
 *
 * Singleton chování (jeden dokument s pevným `_id: "aboutPage"`) je zajištěné
 * v `studio/structure.ts` + `studio/sanity.config.ts`.
 *
 * Frontend `ABOUT` v `src/data/about.ts` slouží jako local fallback — pokud
 * Sanity client není nakonfigurován nebo singleton ještě neexistuje, page
 * vykreslí lokální obsah ve stejném tvaru.
 */
export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'O mně (About)',
  type: 'document',

  fields: [
    // ── PORTRAIT ──────────────────────────────────────────────────────────
    defineField({
      name: 'portrait',
      title: 'Portrét',
      type: 'object',
      description: 'Profilový obrázek zobrazený na obou plochách (homepage i /o-mne).',
      fields: [
        defineField({
          name: 'image',
          title: 'Obrázek',
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
              description: 'Krátký popis obrázku pro screen readery.',
              validation: (Rule) => Rule.required().max(160),
            }),
          ],
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    // ── BADGE ─────────────────────────────────────────────────────────────
    defineField({
      name: 'badge',
      title: 'Oranžová plaketa pod portrétem',
      type: 'object',
      description: 'Velké číslo + krátký popisek, např. „3+" / „roky tvorby".',
      fields: [
        defineField({
          name: 'number',
          title: 'Hlavní číslo',
          type: 'string',
          description: 'Plain text, např. „3+", „150K", „—". Žádné formátování.',
          validation: (Rule) => Rule.required().max(10),
        }),
        defineField({
          name: 'label',
          title: 'Popisek',
          type: 'string',
          description: 'Krátký popisek pod číslem, např. „roky tvorby".',
          validation: (Rule) => Rule.required().max(40),
        }),
      ],
    }),

    // ── BIO PARAGRAPHS ────────────────────────────────────────────────────
    defineField({
      name: 'bioParagraphs',
      title: 'Bio odstavce (sdílené)',
      type: 'array',
      description:
        'Hlavní text bio. Renderuje se jako sekvence <p> bloků. AboutHugo na ' +
        'homepage zobrazuje všechny odstavce; /o-mne stránka navíc přidá ' +
        '`pageSection.extraParagraph` na konec.',
      of: [
        defineArrayMember({
          type: 'text',
          rows: 4,
        }),
      ],
      validation: (Rule) => Rule.required().min(1).max(6),
    }),

    // ── FEATURES ──────────────────────────────────────────────────────────
    defineField({
      name: 'features',
      title: 'Stat karty (4 ikony)',
      type: 'array',
      description:
        'Mřížka 2×2 stat karet pod bio textem. Doporučené 4 (vizuální layout je ' +
        'laděný na 2 sloupce × 2 řádky). Vyšší počet bude pokračovat v dalších řádcích.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'aboutFeature',
          fields: [
            defineField({
              name: 'iconKey',
              title: 'Ikona',
              type: 'string',
              description:
                'Která lucide ikona se zobrazí v oranžovém čtverečku. ' +
                'Hodnoty drží shape s `ICON_MAP` ve `src/lib/queries/aboutPage.ts`.',
              options: {
                list: [
                  { title: 'Trofej (Award)', value: 'award' },
                  { title: 'Hvězda (Star)', value: 'star' },
                  { title: 'Srdce (Heart)', value: 'heart' },
                  { title: 'Blesk (Zap)', value: 'zap' },
                ],
                layout: 'dropdown',
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Nadpis karty',
              type: 'string',
              description: 'Tučný řádek, např. „Oceněný" nebo „Komunita".',
              validation: (Rule) => Rule.required().max(40),
            }),
            defineField({
              name: 'description',
              title: 'Popisek karty',
              type: 'string',
              description:
                'Šedý řádek pod nadpisem, např. „Nejlepší obsah o mazlíčcích 2025" ' +
                'nebo konkrétní metrika.',
              validation: (Rule) => Rule.required().max(80),
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'description' },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1).max(8),
    }),

    // ── HOMEPAGE SECTION COPY ─────────────────────────────────────────────
    defineField({
      name: 'homeSection',
      title: 'Sekce na homepage („Seznamte se s …")',
      type: 'object',
      description: 'Titulky a CTA tlačítko pro AboutHugo sekci na homepage.',
      fields: [
        defineField({
          name: 'title',
          title: 'Nadpis — bílá část',
          type: 'string',
          validation: (Rule) => Rule.required().max(60),
        }),
        defineField({
          name: 'titleHighlight',
          title: 'Nadpis — oranžová část',
          type: 'string',
          validation: (Rule) => Rule.required().max(40),
        }),
        defineField({
          name: 'ctaLabel',
          title: 'Label CTA tlačítka',
          type: 'string',
          description: 'Např. „Více o mně".',
          validation: (Rule) => Rule.required().max(40),
        }),
      ],
    }),

    // ── /o-mne PAGE: hero header ─────────────────────────────────────────
    defineField({
      name: 'pageHeader',
      title: 'Hero hlavička na /o-mne',
      type: 'object',
      description: 'Eyebrow plaketa, lead/highlight nadpis a podtitulek nad stránkou.',
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Eyebrow plaketa',
          type: 'string',
          description: 'Oranžová pill plaketa nad h1, např. „O mně".',
          validation: (Rule) => Rule.required().max(60),
        }),
        defineField({
          name: 'titleLead',
          title: 'Nadpis — bílá část',
          type: 'string',
          validation: (Rule) => Rule.required().max(60),
        }),
        defineField({
          name: 'titleHighlight',
          title: 'Nadpis — oranžová část',
          type: 'string',
          validation: (Rule) => Rule.required().max(80),
        }),
        defineField({
          name: 'subtitle',
          title: 'Podnadpis',
          type: 'text',
          rows: 2,
          validation: (Rule) => Rule.required().max(220),
        }),
      ],
    }),

    // ── /o-mne PAGE: rozšířený intro blok ─────────────────────────────────
    defineField({
      name: 'pageSection',
      title: 'Rozšířený intro blok na /o-mne',
      type: 'object',
      description:
        'Hlavní h2 + doplňující odstavec, který se přidá za sdílené ' +
        '`bioParagraphs` jen na /o-mne stránce.',
      fields: [
        defineField({
          name: 'title',
          title: 'Nadpis — bílá část',
          type: 'string',
          validation: (Rule) => Rule.required().max(80),
        }),
        defineField({
          name: 'titleHighlight',
          title: 'Nadpis — oranžová část',
          type: 'string',
          validation: (Rule) => Rule.required().max(80),
        }),
        defineField({
          name: 'extraParagraph',
          title: 'Doplňující odstavec',
          type: 'text',
          rows: 5,
          description:
            'Přidá se za sdílené `bioParagraphs` jen na /o-mne. ' +
            'Na homepage se nezobrazuje.',
          validation: (Rule) => Rule.required().max(1000),
        }),
      ],
    }),

    // ── /o-mne PAGE: latest videos copy ───────────────────────────────────
    defineField({
      name: 'latestVideos',
      title: 'Sekce „Nejnovější videa" na /o-mne (titulky)',
      type: 'object',
      description:
        'Pouze titulky. Samotná videa se tahají přes `video` collection a ' +
        'pořadí drží `publishedAt desc`.',
      fields: [
        defineField({
          name: 'title',
          title: 'Nadpis — bílá část',
          type: 'string',
          validation: (Rule) => Rule.required().max(40),
        }),
        defineField({
          name: 'titleHighlight',
          title: 'Nadpis — oranžová část',
          type: 'string',
          validation: (Rule) => Rule.required().max(40),
        }),
        defineField({
          name: 'subtitle',
          title: 'Podnadpis',
          type: 'text',
          rows: 2,
          validation: (Rule) => Rule.required().max(200),
        }),
        defineField({
          name: 'viewAllLabel',
          title: 'Label „Zobrazit vše →"',
          type: 'string',
          validation: (Rule) => Rule.required().max(40),
        }),
      ],
    }),

    // ── /o-mne PAGE: latest stories copy ──────────────────────────────────
    defineField({
      name: 'latestStories',
      title: 'Sekce „Nejnovější příběhy" na /o-mne (titulky)',
      type: 'object',
      description:
        'Pouze titulky. Samotné stories se tahají přes `story` collection.',
      fields: [
        defineField({
          name: 'title',
          title: 'Nadpis — bílá část',
          type: 'string',
          validation: (Rule) => Rule.required().max(40),
        }),
        defineField({
          name: 'titleHighlight',
          title: 'Nadpis — oranžová část',
          type: 'string',
          validation: (Rule) => Rule.required().max(40),
        }),
        defineField({
          name: 'subtitle',
          title: 'Podnadpis',
          type: 'text',
          rows: 2,
          validation: (Rule) => Rule.required().max(200),
        }),
        defineField({
          name: 'viewAllLabel',
          title: 'Label „Zobrazit vše →"',
          type: 'string',
          validation: (Rule) => Rule.required().max(40),
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'pageSection.title',
      subtitle: 'badge.label',
      media: 'portrait.image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'About',
        subtitle: subtitle || '/o-mne singleton',
        media,
      };
    },
  },
});
