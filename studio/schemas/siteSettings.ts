import { defineField, defineType } from 'sanity';

/**
 * Nastavení webu — singleton.
 *
 * Drží sdílené brand a footer texty:
 *  - brandName     → primární (bílá) část loga, např. „Hugo"
 *  - brandSuffix   → oranžová část loga, např. „Stories"
 *  - description   → krátký popis projektu pod logem ve Footeru
 *  - copyright     → celý copyright řádek ve spodním Footer pruhu
 *
 * Singleton chování (jeden dokument s pevným `_id: "siteSettings"`) je
 * zajištěné v `studio/structure.ts`. Schema samotný je obyčejný document type.
 */
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Nastavení webu',
  type: 'document',

  fields: [
    defineField({
      name: 'brandName',
      title: 'Brand: primární část',
      type: 'string',
      description: 'První, bílá část loga (např. „Hugo").',
      validation: (Rule) => Rule.required().min(1).max(40),
    }),
    defineField({
      name: 'brandSuffix',
      title: 'Brand: oranžová část',
      type: 'string',
      description: 'Druhá, oranžová část loga (např. „Stories").',
      validation: (Rule) => Rule.required().min(1).max(40),
    }),
    defineField({
      name: 'description',
      title: 'Krátký popis webu',
      type: 'text',
      rows: 3,
      description: 'Tagline ve Footeru pod logem.',
      validation: (Rule) => Rule.required().max(280),
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright řádek',
      type: 'string',
      description:
        'Celý copyright řádek ve Footeru, např. „© 2026 Hugo Stories. Všechna práva vyhrazena."',
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: { title: 'brandName', subtitle: 'brandSuffix' },
    prepare: ({ title, subtitle }) => ({
      title: `${title ?? ''} ${subtitle ?? ''}`.trim() || 'Nastavení webu',
      subtitle: 'Nastavení webu',
    }),
  },
});
