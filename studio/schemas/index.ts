import { story } from './story';
import { video } from './video';
import { videoCategory } from './videoCategory';
import { photo } from './photo';
import { siteSettings } from './siteSettings';
import { navigation } from './navigation';
import { homePage } from './homePage';
import { aboutPage } from './aboutPage';
import { contactPage } from './contactPage';
import { videosArchive } from './videosArchive';

/**
 * Centrální registr všech schemat zahrnutých do studia.
 *
 * Singletons (siteSettings, navigation, homePage, aboutPage, contactPage,
 * videosArchive) mají speciální chování — viz `studio/structure.ts`.
 * `photo`, `story`, `video`, `videoCategory` jsou standardní collections.
 */
export const schemaTypes = [
  story,
  video,
  videoCategory,
  photo,
  siteSettings,
  navigation,
  homePage,
  aboutPage,
  contactPage,
  videosArchive,
];
