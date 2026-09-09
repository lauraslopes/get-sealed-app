# Revelation Memorizer

A mobile-first React MVP for memorizing Revelation. The app currently includes the four activity stages, language selection, chapter/verse navigation, and local progress persistence.

## Run locally

```bash
npm install
npm run dev
```

Build check:

```bash
npm run build
```

## Storage choice

This MVP does not need a server database. `src/storage.js` stores the selected language and completed verse stages in `localStorage`. This is appropriate for one device and an offline-friendly prototype. Add a backend later only when accounts, multi-device sync, analytics, or shared content management are required.

## YouVersion API preparation

Copy `.env.example` to `.env.local`, add the Bible IDs supplied by YouVersion for the four allowed translations, and add an API token. The prepared request is `fetchChapterVerses` in `src/api.js`:

```js
import { fetchChapterVerses } from './src/api';
const chapter = await fetchChapterVerses({ bibleId, chapter: 1 });
```

Do not expose a production API token in a browser build. For production, proxy this request through a small server/edge function and cache the chapter responses. Confirm that your YouVersion partner/API agreement permits this use and verify the exact Bible IDs and endpoint shape from the credentials/docs they provide.
