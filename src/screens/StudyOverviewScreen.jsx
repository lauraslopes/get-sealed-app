import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { CHAPTERS } from '../data';
import { getUiCopy } from '../i18n';

function dateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function getCurrentStreak(days = []) {
  const studiedDays = new Set(days);
  const today = new Date();
  const todayKey = dateKey(today);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = dateKey(yesterday);
  let cursor = studiedDays.has(todayKey) ? today : studiedDays.has(yesterdayKey) ? yesterday : null;
  let streak = 0;
  while (cursor) {
    const key = dateKey(cursor);
    if (!studiedDays.has(key)) break;
    streak += 1;
    cursor = new Date(cursor);
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export default function StudyOverviewScreen({ progress, language }) {
  const navigate = useNavigate();
  const copy = getUiCopy(language);
  const memorized = Object.entries(progress.completed).filter(([, stages]) => stages.length === 4).length;
  const totalVerses = CHAPTERS.reduce((total, chapter) => total + chapter.verses, 0);
  const percent = Math.round(memorized / totalVerses * 100);
  const streak = getCurrentStreak(progress.studyDays);

  return <div className="app-shell"><header className="topbar"><h1>{copy.study}</h1></header><main className="page">
    <section className="card overview-card">
      <h2>{copy.revelation}</h2>
      <div className="streak-marker" aria-label={`${streak} ${copy.dayStreak}`}><span aria-hidden="true">🔥</span> {streak} {copy.dayStreak}</div>
      <div className="overview-progress-heading"><small>{copy.overallProgress}</small><strong>{memorized} / {totalVerses} {copy.verses}</strong></div>
      <div className="progress-track" role="progressbar" aria-label={copy.overallProgress} aria-valuenow={percent} aria-valuemin="0" aria-valuemax="100"><div className="progress-fill" style={{ width: `${percent}%` }} /></div>
      <div className="overview-percent">{percent}% {copy.memorized.toLowerCase()}</div>
    </section>
    <p className="muted timeline-label">{copy.timeline}</p>
    <div className="stack chapter-list">{CHAPTERS.map(ch => {
      const chapterVerses = Object.entries(progress.completed).filter(([key]) => key.startsWith(`${ch.id}:`));
      const count = chapterVerses.filter(([, stages]) => stages.length === 4).length;
      const started = chapterVerses.some(([, stages]) => stages.length > 0);
      const status = count === ch.verses ? 'completed' : started ? 'inProgress' : 'readyToBegin';
      return <button className={`card chapter-card chapter-${status}`} type="button" key={ch.id} onClick={() => navigate(`/chapter/${ch.id}`)}>
        <span className="chapter-number">{ch.id}</span>
        <span className="chapter-content"><span className="chapter-status">{copy[status]}</span><strong>{ch.title}</strong><span className="chapter-meta">{count} / {ch.verses} {copy.verses}</span><span className="progress-track"><span className="progress-fill" style={{ width: `${Math.round(count / ch.verses * 100)}%` }} /></span><span className="chapter-action">{status === 'completed' ? copy.review : started ? copy.continueStudy : copy.beginStudy} <span aria-hidden="true">→</span></span></span>
        <span className="chapter-total">{ch.verses} {copy.verses}</span>
      </button>;
    })}</div>
  </main><BottomNav language={language} /></div>;
}
