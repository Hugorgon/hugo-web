import { defineField, defineType } from 'sanity';

/**
 * Video category — collection (ne singleton).
 *
 * Sada kategorií, mezi kterými může editor video zařadit. `video.category`
 * je nyní `reference` na tento typ, takže přidání / odebrání kategorie je
 * čistě Studio operace — žádná změna frontend kódu.
 *
 * Pole:
 *  - title         → label zobrazený na webu (filter pill, homepage karta).
 *                     Lze přejmenovat bez dopadu na URL (URL drží `value`).
 *  - value         → stabilní slug, URL klíč v `?category=...`. Set jednou,
 *                     pak read-only — přejmenování by rozbilo všechny pre-filtered
 *                     odkazy na webu.
 *  - description   → krátký tagline pod titulkem na homepage kartě.
 *  - iconKey       → která lucide ikona se vykreslí v oranžovém čtverečku na
 *                     homepage kartě. Hodnoty drží shape s `ICON_MAP` v
 *                     `src/lib/queries/videoCategories.ts`.
 *  - displayOrder  → pořadí ve filter pillech i v homepage gridu (nižší dřív).
 *                     Kategorie bez čísla padají na konec.
 *  - enabled       → false = kategorie zůstane v Sanity, ale na webu se
 *                     nezobrazí (žádný filter pill, žádná homepage karta).
 *                     Videa s referencí na disabled kategorii se na archivu
 *                     ukáží pouze ve filtru „Vše".
 *
 * Pořadí v Studio listu: `displayOrder asc` (s coalesce fallbackem na 9999),
 * pak `title asc` jako tiebreaker.
 */
export const videoCategory = defineType({
  name: 'videoCategory',
  title: 'Video kategorie',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Název',
      type: 'string',
      description: 'Zobrazený název na webu (filter pill + homepage karta).',
      validation: (Rule) => Rule.required().min(1).max(60),
    }),

    defineField({
      name: 'value',
      title: 'URL slug (stabilní)',
      type: 'slug',
      description:
        'Pevný identifikátor v URL `?category=<slug>`. Generujte z názvu, ' +
        'pak NEMĚŇTE — přejmenování slugu rozbije všechny pre-filtered odkazy ' +
        'na webu i ve sdílených odkazech. Změnu názvu provádějte v poli „Název".',
      options: {
        source: 'title',
        maxLength: 60,
        slugify: (input) =>
          input
            .toLowerCase()
            .normalize('NFD')
            .replace(/[̀-ͯ]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
            .slice(0, 60),
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Krátký popisek',
      type: 'text',
      rows: 2,
      description: 'Tagline pod titulkem na homepage kartě (1–2 věty).',
      validation: (Rule) => Rule.required().max(160),
    }),

    defineField({
      name: 'iconKey',
      title: 'Ikona',
      type: 'string',
      description:
        'Lucide ikona v oranžovém čtverečku na homepage kartě. Pro přidání ' +
        'nového klíče: rozšiř `ICON_MAP` ve `src/lib/queries/videoCategories.ts` ' +
        'a doplň hodnotu sem do dropdownu.',
      options: {
        list: [
          { title: 'Oko (Eye)', value: 'eye' },
          { title: 'Kamera (Camera)', value: 'camera' },
          { title: 'Lidé (Users)', value: 'users' },
          { title: 'Jiskry (Sparkles)', value: 'sparkles' },
          { title: 'Kompas (Compass)', value: 'compass' },
          { title: 'Domov (Home)', value: 'home' },
          { title: 'Bublina (MessageCircle)', value: 'messageCircle' },
          { title: 'Promoce (GraduationCap)', value: 'graduationCap' },
          { title: 'Lupa (Search)', value: 'search' },
          { title: 'Blesk (Zap)', value: 'zap' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'displayOrder',
      title: 'Pořadí',
      type: 'number',
      description:
        'Nižší číslo = dřív. Kategorie bez čísla padají na konec (řadí se po těch s číslem).',
    }),

    defineField({
      name: 'enabled',
      title: 'Zobrazit na webu',
      type: 'boolean',
      description:
        'Pokud false, kategorie zůstane v Sanity, ale na webu se nezobrazí (žádný filter pill, žádná homepage karta).',
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      slug: 'value.current',
      enabled: 'enabled',
      order: 'displayOrder',
    },
    prepare({ title, subtitle, slug, enabled, order }) {
      const orderLabel = typeof order === 'number' ? `#${order}` : '#—';
      const enabledLabel = enabled === false ? ' • SKRYTÁ' : '';
      return {
        title: title || '(bez názvu)',
        subtitle: `${orderLabel} • /${slug ?? '?'}${enabledLabel} • ${subtitle ?? ''}`,
      };
    },
  },

  orderings: [
    {
      title: 'Pořadí (displayOrder)',
      name: 'displayOrderAsc',
      by: [
        { field: 'displayOrder', direction: 'asc' },
        { field: 'title', direction: 'asc' },
      ],
    },
    {
      title: 'Název (A–Z)',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
});
