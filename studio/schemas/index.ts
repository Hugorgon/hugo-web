import { story } from './story';
import { video } from './video';
import { photo } from './photo';
import { siteSettings } from './siteSettings';
import { navigation } from './navigation';
import { homePage } from './homePage';
import { aboutPage } from './aboutPage';

/**
 * Centrální registr všech schemat zahrnutých do studia.
 * Další typy (contactPage, ...) sem přidávat postupně, vždy s odpovídajícím
 * seedovým plánem a verifikací editor workflow.
 *
 * Singletons (siteSettings, navigation, homePage, aboutPage) mají speciální
 * chování — viz `studio/structure.ts`. `photo`, `story`, `video` jsou
 * standardní collections.
 */
export const schemaTypes = [
  story,
  video,
  photo,
  siteSettings,
  navigation,
  homePage,
  aboutPage,
];
