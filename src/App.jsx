import { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import WelcomeScreen from './screens/WelcomeScreen';
import StudyOverviewScreen from './screens/StudyOverviewScreen';
import VerseSelectionScreen from './screens/VerseSelectionScreen';
import ProfileScreen from './screens/ProfileScreen';
import ActivityReadScreen from './screens/ActivityReadScreen';
import ActivityBlanksScreen from './screens/ActivityBlanksScreen';
import ActivityFirstLetterScreen from './screens/ActivityFirstLetterScreen';
import ActivityWriteScreen from './screens/ActivityWriteScreen';
import { loadProgress, markStageComplete, saveProgress } from './storage';

export default function App() {
  const [progress, setProgress] = useState(loadProgress);
  useEffect(() => saveProgress(progress), [progress]);
  const setLanguage = language => setProgress(current => ({ ...current, language }));
  const completeVerse = verseId => setProgress(current => {
    let next = current;
    ['read', 'blanks', 'first-letter', 'write'].forEach(stage => { next = markStageComplete(next, verseId, stage); });
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    return { ...next, studyDays: [...new Set([...(next.studyDays || []), today])] };
  });
  const resetProgress = () => setProgress(current => ({ ...current, completed: {} }));
  const requireLanguage = element => progress.language ? element : <Navigate to="/welcome" replace />;
  return <Routes>
    <Route path="/" element={<Navigate to={progress.language ? '/study' : '/welcome'} replace />} />
    <Route path="/welcome" element={<WelcomeScreen language={progress.language} setLanguage={setLanguage} />} />
    <Route path="/study" element={requireLanguage(<StudyOverviewScreen progress={progress} language={progress.language} />)} />
    <Route path="/chapter/:chapterId" element={requireLanguage(<VerseSelectionScreen progress={progress} language={progress.language} />)} />
    <Route path="/activity/read" element={requireLanguage(<ActivityReadScreen language={progress.language} />)} />
    <Route path="/activity/blanks" element={requireLanguage(<ActivityBlanksScreen language={progress.language} />)} />
    <Route path="/activity/first-letter" element={requireLanguage(<ActivityFirstLetterScreen language={progress.language} />)} />
    <Route path="/activity/write" element={requireLanguage(<ActivityWriteScreen completeVerse={completeVerse} language={progress.language} />)} />
    <Route path="/profile" element={requireLanguage(<ProfileScreen language={progress.language} setLanguage={setLanguage} progress={progress} resetProgress={resetProgress} />)} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>;
}
