import { Link, useParams, useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { CHAPTERS, SAMPLE_VERSES } from '../data';
import { isVerseMemorized } from '../storage';

export default function VerseSelectionScreen({ progress }) {
  const { chapterId = '1' } = useParams(); const navigate = useNavigate(); const chapter = CHAPTERS[Number(chapterId) - 1] || CHAPTERS[0];
  const verses = Number(chapterId) === 1 ? Object.entries(SAMPLE_VERSES) : Array.from({ length: chapter.verses }, (_, i) => [`${chapterId}:${i + 1}`, 'Verse text will be loaded from YouVersion.']);
  return <div className="app-shell grid-paper"><header className="topbar"><Link to="/study">←</Link><h1>STUDY</h1><span /></header><main className="page"><h1>Chapter {chapter.id}</h1><p className="muted">{chapter.title}</p><div className="stack">{verses.map(([id, text]) => <button className="card" style={{ textAlign: 'left' }} key={id} onClick={() => navigate('/activity/read', { state: { verseId: id, text } })}><strong>{id} {isVerseMemorized(progress, id) && '✓'}</strong><p className="scripture">{text}</p><small className="muted">{isVerseMemorized(progress, id) ? 'Memorized' : 'Start learning'} →</small></button>)}</div></main><BottomNav /></div>;
}
