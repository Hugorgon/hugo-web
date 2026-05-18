import { defineArrayMember, defineField, defineType } from 'sanity';

/**
 * Homepage — singleton.
 *
 * Drží editovatelný obsah pro homepage sekce:
 *  - hero            → eyebrow, title (lead + highlight), bio, dvě CTA labely,
 *                       background image (with alt), 1–6 stats položek
 *  - featuredVideos  → titulky pro „Vybraná videa" sekci (data o videích
 *                       samotných pořád přes `video` collection)
 *  - storiesGrid     → titulky pro „Psané příběhy" sekci
 *  - socialContent   → titulky pro „Sledujte mou cestu" sekci
 *                       (3 platformy pořád local v src/data/home.ts)
 *  - newsletter      → heading, lead, form labels, 3 check položky
 *
 * Categories sekce a SocialContent.platforms array NEJSOU součástí tohoto
 * singletonu — drží se v lokálních datech, samostatná phase je rozšíří
 * o `videoCategory` a `socialPlatform` collections.
 *
 * Singleton chování (jediný dokument s `_id: "homePage"`) je zajištěné
 * v `studio/structure.ts` a `studio/sanity.config.ts`.
 */
export const homePage = defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',

  fields: [
    // ── HERO ──────────────────────────────────────────────────────────────
    defineField({
      name: 'hero',
      title: 'Hero sekce',
      type: 'object',
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Badge nad nadpisem',
          type: 'string',
          description: 'Oranžová pill plaketa nad h1, např. „Nová epizoda každý týden".',
          validation: (Rule) => Rule.required().max(80),
        }),
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
          name: 'bio',
          title: 'Bio odstavec',
          type: 'text',
          rows: 4,
          validation: (Rule) => Rule.required().max(600),
        }),
        defineField({
          name: 'primaryCta',
          title: 'Primární CTA tlačítko (label)',
          type: 'string',
          description: 'Text na oranžovém tlačítku. Cíl tlačítka zatím není v CMS (Button bez navigace).',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'secondaryCta',
          title: 'Sekundární CTA tlačítko (label)',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'backgroundImage',
          title: 'Pozadí (background image)',
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
              description: 'Stručný popis obrázku pro screen readery.',
              validation: (Rule) => Rule.required(),
            }),
          ],
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'stats',
          title: 'Statistiky pod CTA',
          type: 'array',
          description: 'Animovaná čísla (CountUp). 1–6 položek, typicky 3.',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'heroStat',
              fields: [
                defineField({
                  name: 'end',
                  title: 'Cílová hodnota',
                  type: 'number',
                  validation: (Rule) => Rule.required().min(0),
                }),
                defineField({
                  name: 'suffix',
                  title: 'Sufix (např. „+")',
                  type: 'string',
                }),
                defineField({
                  name: 'label',
                  title: 'Popisek pod číslem',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'subtext',
                  title: 'Drobný subtext',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'delay',
                  title: 'Zpoždění animace (sekundy)',
                  type: 'number',
                  initialValue: 0.6,
                  validation: (Rule) => Rule.required().min(0).max(5),
                }),
              ],
              preview: {
                select: { title: 'label', subtitle: 'subtext' },
                prepare: ({ title, subtitle }) => ({
                  title: title ?? '',
                  subtitle: subtitle ?? '',
                }),
              },
            }),
          ],
          validation: (Rule) => Rule.required().min(1).max(6),
        }),
      ],
    }),

    // ── FEATURED VIDEOS ───────────────────────────────────────────────────
    defineField({
      name: 'featuredVideos',
      title: 'Sekce „Vybraná videa" (titulky)',
      type: 'object',
      description: 'Pouze titulky a labely. Samotná videa se tahají z `video` collection.',
      fields: [
        defineField({
          name: 'title',
          title: 'Nadpis — bílá část',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'titleHighlight',
          title: 'Nadpis — oranžová část',
          type: 'string',
          validation: (Rule) => Rule.required(),
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
          title: 'Odkaz „Zobrazit vše →"',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    // ── STORIES GRID ──────────────────────────────────────────────────────
    defineField({
      name: 'storiesGrid',
      title: 'Sekce „Psané příběhy" (titulky)',
      type: 'object',
      description: 'Pouze titulky a labely. Samotné příběhy se tahají z `story` collection.',
      fields: [
        defineField({
          name: 'title',
          title: 'Nadpis — bílá část',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'titleHighlight',
          title: 'Nadpis — oranžová část',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'subtitle',
          title: 'Podnadpis',
          type: 'text',
          rows: 2,
          validation: (Rule) => Rule.required().max(200),
        }),
        defineField({
          name: 'loadMoreLabel',
          title: 'Odkaz „Načíst další příběhy →"',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    // ── SOCIAL CONTENT ────────────────────────────────────────────────────
    defineField({
      name: 'socialContent',
      title: 'Sekce „Sledujte mou cestu" (titulky)',
      type: 'object',
      description: '3 platforem cards zatím zůstávají v lokálních datech — přijdou s `socialPlatform` collection v další phase.',
      fields: [
        defineField({
          name: 'title',
          title: 'Nadpis — bílá část',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'titleHighlight',
          title: 'Nadpis — oranžová část',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'subtitle',
          title: 'Podnadpis',
          type: 'text',
          rows: 2,
          validation: (Rule) => Rule.required().max(200),
        }),
      ],
    }),

    // ── NEWSLETTER ────────────────────────────────────────────────────────
    defineField({
      name: 'newsletter',
      title: 'Newsletter sekce',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Nadpis',
          type: 'string',
          validation: (Rule) => Rule.required().max(100),
        }),
        defineField({
          name: 'lead',
          title: 'Úvodní odstavec',
          type: 'text',
          rows: 4,
          validation: (Rule) => Rule.required().max(400),
        }),
        defineField({
          name: 'inputPlaceholder',
          title: 'Placeholder e-mail inputu',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'inputAriaLabel',
          title: 'Aria-label e-mail inputu',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'submitLabel',
          title: 'Label submit tlačítka',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'checks',
          title: 'Položky pod formulářem (s ✓ ikonou)',
          type: 'array',
          of: [defineArrayMember({ type: 'string' })],
          description: 'Krátké check položky, typicky 3.',
          validation: (Rule) => Rule.required().min(1).max(6),
        }),
      ],
    }),
  ],

  preview: {
    prepare: () => ({
      title: 'Homepage',
      subtitle: 'Hero + sekce homepage',
    }),
  },
});
