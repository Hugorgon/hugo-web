import { story } from './story';
import { video } from './video';
import { siteSettings } from './siteSettings';
import { navigation } from './navigation';
import { homePage } from './homePage';

/**
 * Centrální registr všech schemat zahrnutých do studia.
 * Další typy (photo, aboutPage, ...) sem přidávat postupně,
 * vždy s odpovídajícím seedovým plánem a verifikací editor workflow.
 *
 * Singletons (siteSettings, navigation, homePage) mají speciální chování
 * — viz `studio/structure.ts`.
 */
export const schemaTypes = [story, video, siteSettings, navigation, homePage];
