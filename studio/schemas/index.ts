import { story } from './story';
import { video } from './video';

/**
 * Centrální registr všech schemat zahrnutých do studia.
 * Další typy (photo, homePage, ...) sem přidávat postupně,
 * vždy s odpovídajícím seedovým plánem a verifikací editor workflow.
 */
export const schemaTypes = [story, video];
