import { story } from './story';

/**
 * Centrální registr všech schemat zahrnutých do studia.
 * Další typy (video, photo, homePage, ...) sem přidávat postupně,
 * vždy s odpovídajícím seedovým plánem a verifikací editor workflow.
 */
export const schemaTypes = [story];
