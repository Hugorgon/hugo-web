import { story } from './story';
import { video } from './video';
import { photo } from './photo';
import { siteSettings } from './siteSettings';
import { navigation } from './navigation';
import { homePage } from './homePage';

/**
 * Centrální registr všech schemat zahrnutých do studia.
 * Další typy (aboutPage, contactPage, ...) sem přidávat postupně,
 * vždy s odpovídajícím seedovým plánem a verifikací editor workflow.
 *
 * Singletons (siteSettings, navigation, homePage) mají speciální chování
 * — viz `studio/structure.ts`. `photo` je standardní collection.
 */
export const schemaTypes = [
  story,
  video,
  photo,
  siteSettings,
  navigation,
  homePage,
];
