import { defineField, defineType } from 'sanity';

/**
 * Videos archive — singleton.
 *
 * Drží editovatelný obsah hero hlavičky na `/videos` archivní stránce
 * (eyebrow plaketa + nadpis bílá/oranžová + podtitulek). Samotná videa
 * a kategorie jsou separátní typy (`video`, `videoCategory`).
 *
 * Page size (12 videí na klik) zůstává frontend konstanta — strukturální,
 * ne obsahová.
 *
 * Singleton chování (jeden dokument s pevným `_id: "videosArchive"`) je
 * zajištěné v `studio/structure.ts` + `studio/sanity.config.ts`.
 */
export const videosArchive = defineType({
  name: 'videosArchive',
  title: 'Archiv videí (/videos)',
  type: 'document',

  fields: [
    defineField({
      name: 'pageHeader',
      title: 'Hero hlavička',
      type: 'object',
      description: 'Eyebrow plaketa + nadpis (bílá + oranžová) + podtitulek nad archivem.',
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Eyebrow plaketa',
          type: 'string',
          description: 'Oranžová pill plaketa nad h1, např. „Všechny epizody".',
          validation: (Rule) => Rule.required().max(60),
        }),
        defineField({
          name: 'titleLead',
          title: 'Nadpis — bílá část',
          type: 'string',
          description:
            'První, bílá část nadpisu (např. „Archiv"). Volitelné — když ' +
            'chybí, celý nadpis je oranžový.',
        }),
        defineField({
          name: 'titleHighlight',
          title: 'Nadpis — oranžová část',
          type: 'string',
          description: 'Oranžová zvýrazněná část nadpisu (např. „videí").',
          validation: (Rule) => Rule.required().max(60),
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
  ],

  preview: {
    prepare() {
      return {
        title: 'Archiv videí',
        subtitle: '/videos singleton',
      };
    },
  },
});
