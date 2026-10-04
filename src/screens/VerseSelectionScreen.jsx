import { Link, useParams, useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { CHAPTERS } from '../data';
import { getUiCopy } from '../i18n';
import { isVerseMemorized } from '../storage';

export default function VerseSelectionScreen({ progress, language, translation }) {
  const { chapterId = '1' } = useParams();
  const navigate = useNavigate();
  const copy = getUiCopy(language);
  const chapter = CHAPTERS[Number(chapterId) - 1] || CHAPTERS[0];
  const chapterVerses = Object.entries(translation?.verses || {}).filter(([id]) => id.startsWith(`${chapterId}:`));
  const verses = chapterVerses;

  return (
    <div className="app-shell grid-paper">
      <header className="topbar">
        <Link to="/study">←</Link>
        <h1>{copy.study}</h1>
        <span />
      </header>
      <main className="page">
        <h1>{copy.chapter} {chapter.id}</h1>
        <p className="muted">{chapter.title}</p>
        <div className="stack">
          {verses.map(([id, text]) => (
            <button
              className="card"
              key={id}
              style={{ textAlign: 'left' }}
              type="button"
              onClick={() => navigate('/activity/read', { state: { verseId: id, text } })}
            >
              <strong>{id} {isVerseMemorized(progress, id) && '✓'}</strong>
              <p className="scripture">{text}</p>
              <small className="muted">
                {isVerseMemorized(progress, id) ? copy.memorized : copy.startLearning} →
              </small>
            </button>
          ))}
        </div>
      </main>
      <BottomNav language={language} />
    </div>
  );
}
