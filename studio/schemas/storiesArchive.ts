import { defineField, defineType } from 'sanity';

/**
 * Stories archive — singleton.
 *
 * Drží editovatelný obsah hero hlavičky na `/stories` archivní stránce
 * (eyebrow plaketa + nadpis bílá/oranžová + podtitulek). Samotné příběhy
 * jsou separátní `story` collection.
 *
 * Page size / load-more chování řídí frontend (strukturální, ne obsahové).
 *
 * Singleton chování (jeden dokument s pevným `_id: "storiesArchive"`) je
 * zajištěné v `studio/structure.ts` + `studio/sanity.config.ts`.
 */
export const storiesArchive = defineType({
  name: 'storiesArchive',
  title: 'Archiv příběhů (/stories)',
  type: 'document',

  fields: [
    defineField({
      name: 'pageHeader',
      title: 'Hero hlavička',
      type: 'object',
      description:
        'Eyebrow plaketa + nadpis (bílá + oranžová) + podtitulek nad archivem.',
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Eyebrow plaketa',
          type: 'string',
          description: 'Oranžová pill plaketa nad h1, např. „Psané příběhy".',
          validation: (Rule) => Rule.required().max(60),
        }),
        defineField({
          name: 'titleLead',
          title: 'Nadpis — bílá část',
          type: 'string',
          description:
            'První, bílá část nadpisu. Volitelné — když chybí, celý ' +
            'nadpis je oranžový.',
        }),
        defineField({
          name: 'titleHighlight',
          title: 'Nadpis — oranžová část',
          type: 'string',
          description: 'Oranžová zvýrazněná část nadpisu (např. „Archiv").',
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
        title: 'Archiv příběhů',
        subtitle: '/stories singleton',
      };
    },
  },
});
