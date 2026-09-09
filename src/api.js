const baseUrl = import.meta.env.VITE_YOUVERSION_API_BASE_URL || 'https://api.youversion.com/v1';

export async function fetchChapterVerses({ bibleId, chapter = 1, token = import.meta.env.VITE_YOUVERSION_API_TOKEN }) {
  if (!bibleId || !token) throw new Error('Configure a YouVersion Bible ID and API token before requesting verses.');
  const response = await fetch(`${baseUrl}/bibles/${encodeURIComponent(bibleId)}/books/REV/chapters/${chapter}/verses`, {
    headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error(`YouVersion request failed (${response.status}).`);
  return response.json();
}

export async function fetchRevelation({ bibleId, token = import.meta.env.VITE_YOUVERSION_API_TOKEN }) {
  const chapters = await Promise.all(
    Array.from({ length: 22 }, (_, index) => fetchChapterVerses({ bibleId, chapter: index + 1, token })),
  );
  return chapters.flatMap((chapter, index) => ({ chapter: index + 1, ...chapter }));
}
