import BottomNav from '../components/BottomNav';
import { TRANSLATIONS } from '../data';

export default function ProfileScreen({ language, setLanguage, progress, resetProgress }) {
  return <div className="app-shell"><header className="topbar"><h1>Profile</h1></header><main className="page stack"><section className="card"><h2>Disciple John</h2><p className="muted">{Object.values(progress.completed).filter(s => s.length === 4).length} verses sealed</p></section><section><p className="muted">STUDY LANGUAGE</p><div className="stack">{TRANSLATIONS.map(t => <button className="card" style={{ textAlign: 'left', borderColor: language === t.code ? '#003c90' : '#e5e2dc' }} key={t.code} onClick={() => setLanguage(t.code)}><strong>{t.name} ({t.tag})</strong><br /><small className="muted">{t.desc}</small></button>)}</div></section><button className="card" onClick={resetProgress}>↻ Reset memorization progress</button></main><BottomNav /></div>;
}
