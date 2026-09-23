import BottomNav from '../components/BottomNav';
import { TRANSLATIONS } from '../data';
import { getUiCopy } from '../i18n';

export default function ProfileScreen({ language, setLanguage, progress, resetProgress }) {
  const copy = getUiCopy(language);
  return <div className="app-shell"><header className="topbar"><h1>{copy.profile}</h1></header><main className="page stack"><section className="card"><h2>Disciple John</h2><p className="muted">{Object.values(progress.completed).filter(s => s.length === 4).length} {copy.versesSealed}</p></section><section><p className="muted">{copy.studyLanguage}</p><div className="stack">{TRANSLATIONS.map(t => <button className="card" type="button" aria-pressed={language === t.code} style={{ textAlign: 'left', borderColor: language === t.code ? '#003c90' : '#e5e2dc' }} key={t.code} onClick={() => setLanguage(t.code)}><strong>{t.name} ({t.tag})</strong><br /><small className="muted">{t.desc}</small></button>)}</div></section><button className="card" type="button" onClick={resetProgress}>{copy.resetProgress}</button></main><BottomNav language={language} /></div>;
}
