const STORAGE_KEY = 'revelation-memorizer:v1';
const VERSE_DB = 'revelation-memorizer-verses';
const VERSE_STORE = 'translations';
// A missing language means the person has not completed the first-run choice yet.
const DEFAULT_STATE = { language: null, completed: {}, settings: { dailyGoal: 2 } };

export function loadProgress() {
  try {
    return { ...DEFAULT_STATE, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') };
  } catch {
    return DEFAULT_STATE;
  }
}

export function saveProgress(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function markStageComplete(state, verseId, stage) {
  const stages = new Set(state.completed[verseId] || []);
  stages.add(stage);
  return { ...state, completed: { ...state.completed, [verseId]: [...stages] } };
}

export function isVerseMemorized(state, verseId) {
  return (state.completed[verseId] || []).length === 4;
}

function openVerseDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(VERSE_DB, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(VERSE_STORE, { keyPath: 'language' });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function getCachedTranslation(language) {
  const db = await openVerseDb();
  return new Promise((resolve, reject) => {
    const request = db.transaction(VERSE_STORE).objectStore(VERSE_STORE).get(language);
    request.onsuccess = () => { db.close(); resolve(request.result || null); };
    request.onerror = () => { db.close(); reject(request.error); };
  });
}

export async function saveCachedTranslation(language, translation) {
  const existing = await getCachedTranslation(language);
  const merged = {
    ...existing,
    ...translation,
    language,
    chapters: [...new Set([...(existing?.chapters || []), ...(translation.chapters || [])])].sort((a, b) => a - b),
    verses: { ...(existing?.verses || {}), ...(translation.verses || {}) },
  };
  const db = await openVerseDb();
  return new Promise((resolve, reject) => {
    const request = db.transaction(VERSE_STORE, 'readwrite').objectStore(VERSE_STORE).put(merged);
    request.onsuccess = () => { db.close(); resolve(merged); };
    request.onerror = () => { db.close(); reject(request.error); };
  });
}

export function cachedChapters(translation) {
  if (!translation) return [];
  if (translation.chapters) return translation.chapters;
  return [...new Set(Object.keys(translation.verses || {}).map(id => Number(id.split(':')[0])))];
}
