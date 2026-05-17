import { defineField, defineType } from 'sanity';

/**
 * Video dokument — embed workflow přes YouTube URL.
 *
 * Pole:
 *  - title           → string, povinné
 *  - slug            → slug generovaný z title, povinné, použité v URL `/videos/<slug>`
 *  - youtubeUrl      → URL na YouTube video (youtube.com / youtu.be / shorts), povinné
 *  - platform        → string enum, default „youtube". Připraveno na rozšíření
 *                      (Vimeo, Mux, atd.) bez breaking change v Sanity datasetu.
 *  - description     → krátký tagline pod nadpisem na kartě (max 280 znaků), povinné
 *  - longDescription → plain text, odstavce oddělené prázdným řádkem; renderuje se
 *                      jako sekvence `<p>` bloků na detail page. Portable Text
 *                      záměrně NEpoužitý — drží shape s aktuálním `Video.longDescription`.
 *  - duration        → string, povinné (formát „MM:SS" nebo „HH:MM:SS")
 *  - views           → string, VOLITELNÉ (např. „245K zhlédnutí" nebo „1000 kg+");
 *                      některá videa metriku ukazovat nemusí
 *  - coverImage      → image asset s povinným alt textem (thumbnail)
 *  - category        → string enum z 4 fixních hodnot, ne reference type (mirror
 *                      současného `VideoCategory` union typu ve frontendu)
 *  - publishedAt     → datetime, povinné (formátuje se na frontendu přes formatDate)
 *
 * Workflow je outbound-embed: video soubor sám se nikam neuploaduje, Sanity
 * drží jen URL + cover thumbnail. Žádné Mux/Vimeo/TikTok integrace zatím.
 *
 * Single-locale (CZ) — document-level i18n přidá `@sanity/document-internationalization`
 * v pozdější vrstvě, jakmile bude EN obsah skutečně existovat.
 */
export const video = defineType({
  name: 'video',
  title: 'Video',
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
      description: 'Použije se v URL: /videos/<slug>',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      description:
        'Plná URL videa na YouTube. Podporované formáty: ' +
        'https://www.youtube.com/watch?v=…, https://youtu.be/…, ' +
        'https://www.youtube.com/shorts/….',
      validation: (Rule) =>
        Rule.required()
          .uri({ scheme: ['https'] })
          .custom((value) => {
            if (!value) return true; // required řeší prázdný case
            return /^https:\/\/(www\.)?(youtube\.com|youtu\.be)\//i.test(value)
              ? true
              : 'URL musí vést na YouTube (youtube.com nebo youtu.be).';
          }),
    }),

    defineField({
      name: 'platform',
      title: 'Platforma',
      type: 'string',
      description:
        'Aktuálně pouze YouTube. Pole je tu, aby se v budoucnu daly přidat ' +
        'Vimeo / Mux / TikTok bez breaking změny v datech.',
      options: {
        list: [{ title: 'YouTube', value: 'youtube' }],
        layout: 'dropdown',
      },
      initialValue: 'youtube',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Krátký popisek',
      type: 'text',
      rows: 2,
      description: 'Tagline pod nadpisem na kartě (1–2 věty).',
      validation: (Rule) => Rule.required().max(280),
    }),

    defineField({
      name: 'longDescription',
      title: 'Plný popis',
      type: 'text',
      rows: 16,
      description:
        'Odstavce oddělené prázdným řádkem. Renderuje se jako <p> bloky na detail stránce.',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'duration',
      title: 'Délka',
      type: 'string',
      description: 'Formát „MM:SS" nebo „HH:MM:SS", např. „8:24".',
      validation: (Rule) =>
        Rule.required().regex(/^(\d{1,2}:)?\d{1,2}:\d{2}$/, {
          name: 'duration-format',
          invert: false,
        }),
    }),

    defineField({
      name: 'views',
      title: 'Metrika zhlédnutí',
      type: 'string',
      description:
        'Volitelné. Volný text jako „245K zhlédnutí" nebo „1000 kg+". Pokud chybí, na frontendu se prostě nezobrazí.',
    }),

    defineField({
      name: 'coverImage',
      title: 'Náhled (thumbnail)',
      type: 'image',
      description:
        'Thumbnail pro kartu i detail page (např. screenshot z YouTube nebo vlastní cover).',
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
      name: 'category',
      title: 'Kategorie',
      type: 'string',
      description:
        'Jedna ze čtyř pevně daných kategorií. Hodnoty drží shape s `VideoCategory` union typem ve frontendu — žádné nové kategorie bez frontend update.',
      options: {
        list: [
          { title: 'Dobrodružství', value: 'Dobrodružství' },
          { title: 'Komentáře', value: 'Komentáře' },
          { title: 'Návody', value: 'Návody' },
          { title: 'Všední den', value: 'Všední den' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'publishedAt',
      title: 'Datum publikace',
      type: 'datetime',
      description:
        'Formátuje se na frontendu přes formatDate(iso). Neukládat formátovaný řetězec.',
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
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
