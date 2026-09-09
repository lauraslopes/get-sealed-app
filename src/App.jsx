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
    return next;
  });
  const resetProgress = () => setProgress(current => ({ ...current, completed: {} }));
  return <Routes>
    <Route path="/" element={<Navigate to="/welcome" replace />} />
    <Route path="/welcome" element={<WelcomeScreen language={progress.language} setLanguage={setLanguage} />} />
    <Route path="/study" element={<StudyOverviewScreen progress={progress} />} />
    <Route path="/chapter/:chapterId" element={<VerseSelectionScreen progress={progress} />} />
    <Route path="/activity/read" element={<ActivityReadScreen />} />
    <Route path="/activity/blanks" element={<ActivityBlanksScreen />} />
    <Route path="/activity/first-letter" element={<ActivityFirstLetterScreen />} />
    <Route path="/activity/write" element={<ActivityWriteScreen completeVerse={completeVerse} />} />
    <Route path="/profile" element={<ProfileScreen language={progress.language} setLanguage={setLanguage} progress={progress} resetProgress={resetProgress} />} />
    <Route path="*" element={<Navigate to="/study" replace />} />
  </Routes>;
}
