import { defineArrayMember, defineField, defineType } from 'sanity';

/**
 * Navigace — singleton.
 *
 * Drží všechny editovatelné odkazy:
 *  - navLinks            → hlavní položky v navbaru
 *  - navbarCta           → CTA tlačítko v pravé části navbaru
 *  - footerExplore       → Footer kolona „Procházet"
 *  - footerCategories    → Footer kolona „Kategorie"
 *  - footerSocialColumn  → Footer kolona „Sledujte Huga" (ikony, ne text linky)
 *  - footerLegalLinks    → spodní řádek Footeru (Privacy, Terms, Kontakt)
 *
 * Target stringy jsou volně psané (např. „/videos", „/#newsletter").
 * Routes drží frontend (`src/data/routes.ts`) jako typový kontrakt; Sanity
 * stranou určuje LABELY a CÍLE.
 *
 * Singleton chování (jediný dokument s pevným `_id: "navigation"`)
 * je zajištěné v `studio/structure.ts`.
 */
export const navigation = defineType({
  name: 'navigation',
  title: 'Navigace',
  type: 'document',

  fields: [
    defineField({
      name: 'navLinks',
      title: 'Položky v navbaru',
      type: 'array',
      description:
        'Pořadí v navbaru. Každá položka má label, kind (route/hash) a cílovou URL.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'navLink',
          fields: [
            defineField({
              name: 'label',
              title: 'Popisek',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'kind',
              title: 'Typ',
              type: 'string',
              description:
                '„route" = běžný odkaz na stránku; „hash" = kotva na homepage.',
              options: {
                list: [
                  { title: 'Route', value: 'route' },
                  { title: 'Hash', value: 'hash' },
                ],
                layout: 'radio',
              },
              initialValue: 'route',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'target',
              title: 'Cíl (URL nebo hash)',
              type: 'string',
              description: 'Např. „/videos" pro route nebo „/#newsletter" pro hash.',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'target' },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: 'navbarCta',
      title: 'CTA tlačítko v navbaru',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Popisek',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'target',
          title: 'Cíl (URL nebo hash)',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    defineField({
      name: 'footerExplore',
      title: 'Footer kolona: Procházet',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Nadpis kolony',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'links',
          title: 'Odkazy',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'footerLink',
              fields: [
                defineField({
                  name: 'label',
                  title: 'Popisek',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'target',
                  title: 'Cíl',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: { select: { title: 'label', subtitle: 'target' } },
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'footerCategories',
      title: 'Footer kolona: Kategorie',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Nadpis kolony',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'links',
          title: 'Odkazy',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'footerLink',
              fields: [
                defineField({
                  name: 'label',
                  title: 'Popisek',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'target',
                  title: 'Cíl',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: { select: { title: 'label', subtitle: 'target' } },
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'footerSocialColumn',
      title: 'Footer kolona: Sledujte Huga (ikony)',
      type: 'object',
      description:
        'Sociální ikony v pravé Footer koloně. Ikonu vybírá iconKey enum, frontend ji mapuje na lucide-react komponent.',
      fields: [
        defineField({
          name: 'heading',
          title: 'Nadpis kolony',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'links',
          title: 'Sociální ikony',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'footerSocialLink',
              fields: [
                defineField({
                  name: 'label',
                  title: 'Popisek (aria-label)',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'href',
                  title: 'URL (zatím „#" pro placeholder)',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'iconKey',
                  title: 'Ikona',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Instagram', value: 'instagram' },
                      { title: 'YouTube', value: 'youtube' },
                      { title: 'Facebook', value: 'facebook' },
                    ],
                    layout: 'dropdown',
                  },
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: { select: { title: 'label', subtitle: 'iconKey' } },
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'footerLegalLinks',
      title: 'Legal odkazy (spodní řádek Footeru)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'footerLink',
          fields: [
            defineField({
              name: 'label',
              title: 'Popisek',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'target',
              title: 'Cíl',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: 'label', subtitle: 'target' } },
        }),
      ],
    }),
  ],

  preview: {
    prepare: () => ({
      title: 'Navigace',
      subtitle: 'Navbar + Footer odkazy',
    }),
  },
});
