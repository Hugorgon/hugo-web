# Hugo Stories — Sanity Studio

Editorská aplikace pro Hugo Stories. Žije v `/studio` jako **samostatná Vite/React app**, sdílí monorepo s hlavním frontendem v `/src`, ale **nemá ho ovlivnit**.

V téhle fázi:

- Frontend stále čte z `src/data/*.ts` (žádné Sanity fetchery)
- Žádná Sanity závislost není v hlavním `package.json`
- Studio je jen pro validaci editor workflow + schema designu

## První setup

1. **Vytvoř Sanity projekt** na [sanity.io/manage](https://sanity.io/manage). Poznamenej si `projectId`.
2. **Zkopíruj env soubor**:

   ```bash
   cp .env.example .env.local
   ```

   A doplň `SANITY_STUDIO_PROJECT_ID`.
3. **Instaluj balíčky** (uvnitř `/studio`):

   ```bash
   cd studio
   npm install
   ```
4. **Spusť Studio** lokálně:

   ```bash
   npm run dev
   ```

   Studio běží na <http://localhost:3333>.

## Skripty

| Skript | Co dělá |
|---|---|
| `npm run dev` | Spustí Studio v dev módu na portu 3333 |
| `npm run build` | Build Studio pro produkční nasazení |
| `npm run deploy` | Deploy Studio na `<projectId>.sanity.studio` |

## Schemas

| Typ | Soubor | Zrcadlí |
|---|---|---|
| `story` | `schemas/story.ts` | `src/data/stories.ts` (single-locale CZ) |

Další schemas (`video`, `photo`, `homePage`, ...) se přidají postupně podle plánu.

## Co dál

1. Vytvořit první testovací `Story` dokument v Studiu pro ověření workflow
2. Naseedovat existující CZ příběhy z `src/data/stories.ts` (jednorázový skript přijde v další vrstvě)
3. Teprve poté řešit Sanity client + GROQ fetchery v hlavním frontendu

**Co tahle vrstva NEDĚLÁ:**

- Nepřipojuje frontend na Sanity
- Nemaže `src/data/stories.ts`
- Nezavádí lokalizaci na schema úrovni (přijde s `@sanity/document-internationalization`)
- Nedeployuje nic do produkce
