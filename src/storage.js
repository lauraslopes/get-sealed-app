const STORAGE_KEY = 'revelation-memorizer:v1';
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
