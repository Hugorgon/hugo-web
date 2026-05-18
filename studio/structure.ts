import type { StructureBuilder } from 'sanity/structure';

/**
 * Custom desk structure pro Sanity Studio.
 *
 * Singletons (`siteSettings`, `navigation`, `homePage`) jsou tu vytvořené
 * jako jediné editovatelné dokumenty s pevným `_id`. V content view se
 * neobjeví jako collection (kde by šly vytvořit duplicity), ale jako přímý
 * odkaz na jediný dokument.
 *
 * Sanity samotná singleton chování out-of-the-box neomezuje — proto navíc
 * v `sanity.config.ts` zakážeme „Create new" a „Duplicate" / „Delete"
 * akce pro singleton typy přes `document.actions` a `newDocumentOptions`.
 */
export const SINGLETON_TYPES: ReadonlySet<string> = new Set([
  'siteSettings',
  'navigation',
  'homePage',
]);

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Obsah')
    .items([
      // Singletons — přímý odkaz na jeden dokument
      S.listItem()
        .title('Nastavení webu')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings'),
        ),
      S.listItem()
        .title('Navigace')
        .id('navigation')
        .child(
          S.document()
            .schemaType('navigation')
            .documentId('navigation'),
        ),
      S.listItem()
        .title('Homepage')
        .id('homePage')
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage'),
        ),
      S.divider(),
      // Ostatní collection-style document types (story, video, ...)
      ...S.documentTypeListItems().filter(
        (listItem) => !SINGLETON_TYPES.has(listItem.getId() ?? ''),
      ),
    ]);
