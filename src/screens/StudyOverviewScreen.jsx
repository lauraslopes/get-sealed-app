import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { CHAPTERS } from '../data';

export default function StudyOverviewScreen({ progress }) {
  const navigate = useNavigate();
  const completed = Object.values(progress.completed).filter(stages => stages.length === 4).length;
  return <div className="app-shell"><header className="topbar"><h1>Study</h1></header><main className="page">
    <section className="card"><small className="muted">CHRONOLOGY MASTERPLAN</small><h2>The Revelation of Jesus Christ</h2><p className="muted">{completed} verses sealed</p><div className="progress-track"><div className="progress-fill" style={{ width: `${Math.round(completed / 404 * 100)}%` }} /></div></section>
    <p className="muted">TIMELINE</p><div className="stack">{CHAPTERS.map(ch => { const count = Object.keys(progress.completed).filter(key => key.startsWith(`${ch.id}:`) && progress.completed[key].length === 4).length; return <button className="card" style={{ textAlign: 'left' }} key={ch.id} onClick={() => navigate(`/chapter/${ch.id}`)}><strong>Chapter {ch.id}: {ch.title}</strong><p className="muted" style={{ marginBottom: '.5rem' }}>{count} / {ch.verses} verses sealed</p><div className="progress-track"><div className="progress-fill" style={{ width: `${count / ch.verses * 100}%` }} /></div></button>; })}</div>
  </main><BottomNav /></div>;
}
