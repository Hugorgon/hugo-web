import { defineField, defineType } from 'sanity';

/**
 * Story dokument — mirror tvaru z `src/data/stories.ts`.
 *
 * Pole:
 *  - title         → string, povinné
 *  - slug          → slug generovaný z title, povinné, použité v URL `/stories/<slug>`
 *  - excerpt       → krátký podtitulek (max 280 znaků), povinné
 *  - publishedAt   → datetime (nahrazuje současný formátovaný `date: '3. května 2026'`,
 *                    formátování proběhne na frontendu přes `formatDate(iso, locale)`)
 *  - readTime      → string, free-form (např. "5 min čtení")
 *  - coverImage    → image asset s povinným alt textem
 *  - body          → plain text, odstavce oddělené prázdným řádkem
 *                    (současný shape; portable text přijde později, pokud bude potřeba
 *                    rich formatting)
 *
 * Tahle verze JE SINGLE-LOCALE (CZ-only). Document-level localization přidá
 * `@sanity/document-internationalization` v pozdější vrstvě.
 */
export const story = defineType({
  name: 'story',
  title: 'Příběh',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Titulek',
      type: 'string',
      validation: (Rule) => Rule.required().min(3).max(120),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Použije se v URL: /stories/<slug>',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'excerpt',
      title: 'Perex',
      type: 'text',
      rows: 3,
      description: 'Krátké uvození pod nadpisem na kartě i na detailu.',
      validation: (Rule) => Rule.required().max(280),
    }),

    defineField({
      name: 'publishedAt',
      title: 'Datum publikace',
      type: 'datetime',
      description: 'Formátuje se na frontendu (formatDate). Neukládat formátovaný řetězec.',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'readTime',
      title: 'Doba čtení',
      type: 'string',
      description: 'Volný text, např. "5 min čtení".',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'coverImage',
      title: 'Cover obrázek',
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
      name: 'body',
      title: 'Tělo článku',
      type: 'text',
      rows: 16,
      description: 'Odstavce oddělené prázdným řádkem. Renderují se jako <p> bloky.',
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'excerpt',
      media: 'coverImage',
    },
  },

  orderings: [
    {
      title: 'Nejnovější napřed',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Nejstarší napřed',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
  ],
});
