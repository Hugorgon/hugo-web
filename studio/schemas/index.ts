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
import { storiesArchive } from './storiesArchive';
import { galleryPage } from './galleryPage';

/**
 * Centrální registr všech schemat zahrnutých do studia.
 *
 * Singletons (siteSettings, navigation, homePage, aboutPage, contactPage,
 * videosArchive, storiesArchive, galleryPage) mají speciální chování —
 * viz `studio/structure.ts`. `photo`, `story`, `video`, `videoCategory`
 * jsou standardní collections.
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
  storiesArchive,
  galleryPage,
];
