import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { CHAPTERS } from '../data';
import { getUiCopy } from '../i18n';

export default function StudyOverviewScreen({ progress, language }) {
  const navigate = useNavigate();
  const copy = getUiCopy(language);
  const completed = Object.values(progress.completed).filter(stages => stages.length === 4).length;
  return <div className="app-shell"><header className="topbar"><h1>{copy.study}</h1></header><main className="page">
    <section className="card"><small className="muted">{copy.chronology}</small><h2>{copy.revelation}</h2><p className="muted">{completed} {copy.versesSealed}</p><div className="progress-track"><div className="progress-fill" style={{ width: `${Math.round(completed / 404 * 100)}%` }} /></div></section>
    <p className="muted">{copy.timeline}</p><div className="stack">{CHAPTERS.map(ch => { const count = Object.keys(progress.completed).filter(key => key.startsWith(`${ch.id}:`) && progress.completed[key].length === 4).length; return <button className="card" style={{ textAlign: 'left' }} key={ch.id} onClick={() => navigate(`/chapter/${ch.id}`)}><strong>{copy.chapter} {ch.id}: {ch.title}</strong><p className="muted" style={{ marginBottom: '.5rem' }}>{count} / {ch.verses} {copy.versesSealed}</p><div className="progress-track"><div className="progress-fill" style={{ width: `${count / ch.verses * 100}%` }} /></div></button>; })}</div>
  </main><BottomNav language={language} /></div>;
}
