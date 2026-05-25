import { story } from './story';
import { video } from './video';
import { photo } from './photo';
import { siteSettings } from './siteSettings';
import { navigation } from './navigation';
import { homePage } from './homePage';
import { aboutPage } from './aboutPage';
import { contactPage } from './contactPage';

/**
 * Centrální registr všech schemat zahrnutých do studia.
 *
 * Singletons (siteSettings, navigation, homePage, aboutPage, contactPage)
 * mají speciální chování — viz `studio/structure.ts`. `photo`, `story`,
 * `video` jsou standardní collections.
 */
export const schemaTypes = [
  story,
  video,
  photo,
  siteSettings,
  navigation,
  homePage,
  aboutPage,
  contactPage,
];
