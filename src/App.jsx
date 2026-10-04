import { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { TRANSLATIONS } from './data';
import WelcomeScreen from './screens/WelcomeScreen';
import StudyOverviewScreen from './screens/StudyOverviewScreen';
import VerseSelectionScreen from './screens/VerseSelectionScreen';
import ProfileScreen from './screens/ProfileScreen';
import ActivityReadScreen from './screens/ActivityReadScreen';
import ActivityBlanksScreen from './screens/ActivityBlanksScreen';
import ActivityFirstLetterScreen from './screens/ActivityFirstLetterScreen';
import ActivityWriteScreen from './screens/ActivityWriteScreen';
import DownloadScreen from './screens/DownloadScreen';
import { cachedChapters, getCachedTranslation, loadProgress, markStageComplete, saveCachedTranslation, saveProgress } from './storage';
import { fetchRevelation } from './api';

function CachedChapterRoute({ progress, cache }) {
  const { chapterId } = useParams();
  if (!cachedChapters(cache).includes(Number(chapterId))) return <Navigate to="/study" replace />;
  return <VerseSelectionScreen progress={progress} language={progress.language} translation={cache} />;
}

export default function App() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(loadProgress);
  const [pendingLanguage, setPendingLanguage] = useState(null);
  const [pendingChapter, setPendingChapter] = useState(1);
  const [downloadReturn, setDownloadReturn] = useState('/study');
  const [ready, setReady] = useState(false);
  const [cache, setCache] = useState(null);
  const [chapterDownload, setChapterDownload] = useState(null);
  useEffect(() => saveProgress(progress), [progress]);
  useEffect(() => {
    let live = true;
    if (!progress.language) { setReady(true); return undefined; }
    getCachedTranslation(progress.language).then(value => {
      if (!live) return;
      setCache(value);
      if (!cachedChapters(value).includes(1)) { setPendingLanguage(progress.language); setPendingChapter(1); setDownloadReturn('/study'); }
      setReady(true);
    }).catch(() => { if (live) { setPendingLanguage(progress.language); setPendingChapter(1); setReady(true); } });
    return () => { live = false; };
  }, []);
  const beginDownload = (language, returnTo = '/study', chapter = 1) => { setPendingLanguage(language); setPendingChapter(chapter); setDownloadReturn(returnTo); navigate('/download'); };
  const downloadReady = (language, translation) => {
    setProgress(current => ({ ...current, language }));
    setPendingLanguage(null);
    setCache(translation);
    navigate(downloadReturn, { replace: true });
  };
  const downloadChapterInline = async chapter => {
    if (chapterDownload && !chapterDownload.error) return;
    const language = progress.language;
    const bible = TRANSLATIONS.find(item => item.code === language);
    setChapterDownload({ chapter, completed: 0, total: 0, error: '' });
    try {
      const result = await fetchRevelation({
        bibleId: bible.bibleId,
        chapter,
        onProgress: value => setChapterDownload(current => current?.chapter === chapter ? { ...current, ...value } : current),
      });
      const updatedCache = await saveCachedTranslation(language, result);
      setCache(updatedCache);
      setChapterDownload(null);
    } catch (error) {
      setChapterDownload(current => current?.chapter === chapter ? { ...current, error: error.message || 'Download failed.' } : current);
    }
  };
  const completeVerse = verseId => setProgress(current => {
    let next = current;
    ['read', 'blanks', 'first-letter', 'write'].forEach(stage => { next = markStageComplete(next, verseId, stage); });
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    return { ...next, studyDays: [...new Set([...(next.studyDays || []), today])] };
  });
  const resetProgress = () => setProgress(current => ({ ...current, completed: {} }));
  if (!ready) return <main className="page"><p role="status">Loading your offline Bible…</p></main>;
  const requireLanguage = element => progress.language && !pendingLanguage ? element : <Navigate to={pendingLanguage ? '/download' : '/welcome'} replace />;
  return <Routes>
    <Route path="/" element={<Navigate to={pendingLanguage ? '/download' : progress.language ? '/study' : '/welcome'} replace />} />
    <Route path="/welcome" element={<WelcomeScreen language={progress.language} beginDownload={beginDownload} />} />
    <Route path="/download" element={<DownloadScreen language={pendingLanguage || progress.language} chapter={pendingChapter} onReady={downloadReady} />} />
    <Route path="/study" element={requireLanguage(<StudyOverviewScreen progress={progress} language={progress.language} translation={cache} downloadChapter={downloadChapterInline} chapterDownload={chapterDownload} />)} />
    <Route path="/chapter/:chapterId" element={requireLanguage(<CachedChapterRoute progress={progress} cache={cache} />)} />
    <Route path="/activity/read" element={requireLanguage(<ActivityReadScreen language={progress.language} />)} />
    <Route path="/activity/blanks" element={requireLanguage(<ActivityBlanksScreen language={progress.language} />)} />
    <Route path="/activity/first-letter" element={requireLanguage(<ActivityFirstLetterScreen language={progress.language} />)} />
    <Route path="/activity/write" element={requireLanguage(<ActivityWriteScreen completeVerse={completeVerse} language={progress.language} />)} />
    <Route path="/profile" element={requireLanguage(<ProfileScreen language={progress.language} beginDownload={beginDownload} progress={progress} resetProgress={resetProgress} />)} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>;
}
