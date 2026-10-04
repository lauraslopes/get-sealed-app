const baseUrl = import.meta.env.VITE_YOUVERSION_API_BASE_URL || 'https://api.youversion.com/v1';
const appKey = import.meta.env.VITE_YOUVERSION_APP_KEY

function wait(ms, signal) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, ms);
    signal?.addEventListener('abort', () => {
      clearTimeout(timer);
      reject(new DOMException('Aborted', 'AbortError'));
    }, { once: true });
  });
}

async function request(path, signal) {
  if (!appKey) throw new Error('Set VITE_YOUVERSION_APP_KEY to your YouVersion app key.');
  const response = await fetch(`${baseUrl}${path}`, {
    headers: { Accept: 'application/json', 'X-YVP-App-Key': appKey }, signal,
  });
  if (response.status === 429) {
    const retryAfter = Number(response.headers.get('Retry-After'));
    const delay = Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter * 1000 : 1000;
    await wait(delay, signal);
    const retry = await fetch(`${baseUrl}${path}`, { headers: { Accept: 'application/json', 'X-YVP-App-Key': appKey }, signal });
    if (!retry.ok) throw new Error(`YouVersion request failed (${retry.status}).`);
    return retry.json();
  }
  if (!response.ok) throw new Error(`YouVersion request failed (${response.status}).`);
  return response.json();
}

export async function fetchRevelation({ bibleId, chapter = 1, signal, onProgress = () => {} }) {
  if (!bibleId) throw new Error('A YouVersion Bible ID is required.');
  const index = await request(`/bibles/${encodeURIComponent(bibleId)}/index`, signal);
  const revelation = index.books?.find(book => book.id === 'REV');
  const selectedChapter = revelation?.chapters?.find(item => Number(item.id) === Number(chapter));
  const passages = selectedChapter?.verses || [];
  if (!passages.length) throw new Error(`Revelation chapter ${chapter} was not found in this Bible index.`);

  const verses = {};
  onProgress({ completed: 0, total: passages.length });
  for (let i = 0; i < passages.length; i += 1) {
    if (i > 0) await wait(150, signal);
    const passage = passages[i];
    const result = await request(`/bibles/${encodeURIComponent(bibleId)}/passages/${encodeURIComponent(passage.passage_id)}?format=text`, signal);
    const [chapter, verse] = passage.passage_id.split('.').slice(1).map(Number);
    if (result.content) verses[`${chapter}:${verse}`] = result.content;
    onProgress({ completed: i + 1, total: passages.length });
  }
  if (Object.keys(verses).length !== passages.length) throw new Error('Some Revelation verses were missing from the response. Please retry while online.');
  return { bibleId: String(bibleId), downloadedAt: new Date().toISOString(), chapters: [Number(chapter)], verses };
}
