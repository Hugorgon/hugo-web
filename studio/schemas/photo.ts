import { defineField, defineType } from 'sanity';

/**
 * Photo dokument — mirror tvaru z `src/data/photos.ts`.
 *
 * Pole:
 *  - slug          → ID použité jako React key (gallery nemá detail page, takže
 *                     není v URL — drží stabilní identitu)
 *  - caption       → popisek pod fotkou v lightboxu i jako alt fallback v gridu
 *  - image         → image asset s povinným alt textem
 *  - category      → volitelná kategorie (5 fixních hodnot, dropdown)
 *  - aspect        → povinný poměr stran (5 fixních hodnot, určuje výšku karty
 *                     v masonry gridu)
 *  - date          → datetime (kdy byla fotka pořízena, default sort newest first)
 *  - displayOrder  → volitelné manuální pořadí (nižší číslo = dřív v galerii;
 *                     pokud chybí, padá na `date desc`)
 *
 * Single-locale (CZ). Document-level i18n přijde s
 * `@sanity/document-internationalization` v pozdější vrstvě.
 */
export const photo = defineType({
  name: 'photo',
  title: 'Fotka',
  type: 'document',

  fields: [
    defineField({
      name: 'slug',
      title: 'ID (slug)',
      type: 'slug',
      description:
        'Stabilní identifikátor — používá se jako React key v masonry gridu. ' +
        'Galerie nemá detail page, takže slug není v URL.',
      options: {
        source: 'caption',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'caption',
      title: 'Popisek',
      type: 'text',
      rows: 2,
      description: 'Krátký popisek pod fotkou. Slouží i jako alt text pro screen readery.',
      validation: (Rule) => Rule.required().max(280),
    }),

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
          description: 'Stručný popis obrázku pro screen readery (může se lišit od caption).',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'category',
      title: 'Kategorie',
      type: 'string',
      description:
        'Volitelná kategorie. Hodnoty drží shape s `PhotoCategory` union typem ve frontendu.',
      options: {
        list: [
          { title: 'Dobrodružství', value: 'Dobrodružství' },
          { title: 'Portrét', value: 'Portrét' },
          { title: 'Všední den', value: 'Všední den' },
          { title: 'Příroda', value: 'Příroda' },
          { title: 'Detail', value: 'Detail' },
        ],
        layout: 'dropdown',
      },
    }),

    defineField({
      name: 'aspect',
      title: 'Poměr stran',
      type: 'string',
      description:
        'Určuje výšku karty v masonry gridu. Hodnoty drží shape s `PhotoAspect` union typem ve frontendu.',
      options: {
        list: [
          { title: '4:5 (na výšku)', value: '4/5' },
          { title: '4:3 (na šířku)', value: '4/3' },
          { title: '1:1 (čtverec)', value: '1/1' },
          { title: '3:4 (mírně na výšku)', value: '3/4' },
          { title: '16:9 (široký)', value: '16/9' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'date',
      title: 'Datum',
      type: 'datetime',
      description: 'Kdy byla fotka pořízena. Default řazení v galerii: nejnovější napřed.',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'displayOrder',
      title: 'Pořadí (volitelné)',
      type: 'number',
      description:
        'Manuální pořadí v galerii. Nižší číslo = dřív. Pokud chybí, řadí se podle `date desc`.',
    }),
  ],

  preview: {
    select: {
      title: 'caption',
      subtitle: 'category',
      media: 'image',
    },
  },

  orderings: [
    {
      title: 'Nejnovější napřed',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
    {
      title: 'Pořadí (displayOrder)',
      name: 'displayOrderAsc',
      by: [{ field: 'displayOrder', direction: 'asc' }],
    },
  ],
});
