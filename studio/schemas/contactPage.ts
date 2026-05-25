import { defineArrayMember, defineField, defineType } from 'sanity';

/**
 * Contact — singleton.
 *
 * Drží sjednocený seznam kontaktních metod (sociální profily + e-mail jako
 * jedna entita). Každá karta má `iconKey` enum, který se na frontendu
 * resolvne přes `ICON_MAP` v `src/lib/queries/contactPage.ts`.
 *
 * Pravidla renderování (vynucuje frontend, ne schema):
 *  - `enabled !== false` → karta se zobrazí. Default true.
 *  - Pořadí v gridu = `displayOrder` asc; položky bez čísla padají na konec.
 *  - Když je `url` vyplněná → karta je external link (target="_blank",
 *    rel="noopener noreferrer").
 *  - Když `url` chybí → karta je plain text (anti-spam pattern pro e-mail,
 *    žádný `mailto:`, žádný anchor).
 *  - `notice` je volitelný drobný řádek pod displayText — používá se hlavně
 *    pro e-mail, aby šel vysvětlit obfuskovaný zápis.
 *
 * Singleton chování (jeden dokument s pevným `_id: "contactPage"`) je
 * zajištěné v `studio/structure.ts` + `studio/sanity.config.ts`.
 *
 * Editor workflow:
 *  - Skrýt e-mail z webu → `enabled = false` (NE smazat).
 *  - Přidat Facebook → nová karta s `iconKey: 'facebook'`, beze změny kódu.
 */
export const contactPage = defineType({
  name: 'contactPage',
  title: 'Kontakt',
  type: 'document',

  fields: [
    defineField({
      name: 'methods',
      title: 'Kontaktní metody',
      type: 'array',
      description:
        'Sociální profily + e-mail. Pořadí na webu řídí `displayOrder` ' +
        '(nižší = dřív). Karty s `enabled = false` zůstanou v Sanity ale ' +
        'na webu se nezobrazí.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'contactMethod',
          fields: [
            defineField({
              name: 'label',
              title: 'Štítek (Label)',
              type: 'string',
              description:
                'Drobný šedý řádek nad displayText, např. „Instagram", ' +
                '„YouTube" nebo „E-mail".',
              validation: (Rule) => Rule.required().max(40),
            }),
            defineField({
              name: 'displayText',
              title: 'Zobrazený text',
              type: 'string',
              description:
                'Hlavní řádek karty. Pro sociální profily handle (např. ' +
                '„@hugorgon"), pro e-mail obfuskovaný zápis (např. ' +
                '„hugo [zavináč] hugorgon [tečka] cz").',
              validation: (Rule) => Rule.required().max(120),
            }),
            defineField({
              name: 'iconKey',
              title: 'Ikona',
              type: 'string',
              description:
                'Která lucide ikona se zobrazí v oranžovém čtverečku. ' +
                'Hodnoty drží shape s `ICON_MAP` ve `src/lib/queries/contactPage.ts`. ' +
                'Pro přidání další platformy stačí editorovi vybrat z dropdownu.',
              options: {
                list: [
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Twitter / X', value: 'twitter' },
                  { title: 'E-mail (Mail)', value: 'mail' },
                ],
                layout: 'dropdown',
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              description:
                'Plná URL profilu (https://…). Volitelné: pokud chybí, karta se ' +
                'vykreslí jako neklikatelný text — používá se pro e-mail (anti-spam).',
              validation: (Rule) => Rule.uri({ scheme: ['https', 'http'] }),
            }),
            defineField({
              name: 'notice',
              title: 'Vysvětlivka pod textem',
              type: 'string',
              description:
                'Volitelný drobný řádek pod displayText. Hlavně pro e-mail ' +
                'položku, aby šel vysvětlit obfuskovaný zápis. U sociálních ' +
                'profilů obvykle prázdné.',
              validation: (Rule) => Rule.max(200),
            }),
            defineField({
              name: 'enabled',
              title: 'Zobrazit na webu',
              type: 'boolean',
              description:
                'Pokud false, karta zůstane v Sanity, ale na webu se nezobrazí. ' +
                'Používejte místo mazání — historie obsahu zůstane.',
              initialValue: true,
            }),
            defineField({
              name: 'displayOrder',
              title: 'Pořadí',
              type: 'number',
              description:
                'Nižší číslo = dřív v gridu. Karty bez čísla padají na konec.',
            }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'displayText',
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Kontakt',
        subtitle: '/kontakt singleton',
      };
    },
  },
});
