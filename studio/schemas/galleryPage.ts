import { defineField, defineType } from 'sanity';

/**
 * Gallery page — singleton.
 *
 * Drží editovatelný obsah hero hlavičky na `/fotogalerie` stránce
 * (eyebrow plaketa + nadpis bílá/oranžová + podtitulek). Samotné fotky
 * jsou separátní `photo` collection.
 *
 * Singleton chování (jeden dokument s pevným `_id: "galleryPage"`) je
 * zajištěné v `studio/structure.ts` + `studio/sanity.config.ts`.
 */
export const galleryPage = defineType({
  name: 'galleryPage',
  title: 'Fotogalerie (/fotogalerie)',
  type: 'document',

  fields: [
    defineField({
      name: 'pageHeader',
      title: 'Hero hlavička',
      type: 'object',
      description:
        'Eyebrow plaketa + nadpis (bílá + oranžová) + podtitulek nad galerií.',
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Eyebrow plaketa',
          type: 'string',
          description: 'Oranžová pill plaketa nad h1, např. „Fotogalerie".',
          validation: (Rule) => Rule.required().max(60),
        }),
        defineField({
          name: 'titleLead',
          title: 'Nadpis — bílá část',
          type: 'string',
          description:
            'První, bílá část nadpisu (např. „Mžiky a"). Volitelné — když ' +
            'chybí, celý nadpis je oranžový.',
        }),
        defineField({
          name: 'titleHighlight',
          title: 'Nadpis — oranžová část',
          type: 'string',
          description: 'Oranžová zvýrazněná část nadpisu (např. „okamžiky").',
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
        title: 'Fotogalerie',
        subtitle: '/fotogalerie singleton',
      };
    },
  },
});
