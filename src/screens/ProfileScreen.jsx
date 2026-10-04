import BottomNav from '../components/BottomNav';
import { TRANSLATIONS } from '../data';
import { getUiCopy } from '../i18n';
import { useState } from 'react';

export default function ProfileScreen({ language, beginDownload, progress, resetProgress }) {
  const [selected, setSelected] = useState(language);
  const copy = getUiCopy(language);
  return <div className="app-shell"><header className="topbar"><h1>{copy.profile}</h1></header><main className="page stack"><section className="card"><h2>Disciple John</h2><p className="muted">{Object.values(progress.completed).filter(s => s.length === 4).length} {copy.versesSealed}</p></section><section><p className="muted">{copy.studyLanguage}</p><div className="stack">{TRANSLATIONS.map(t => <button className="card" type="button" aria-pressed={selected === t.code} style={{ textAlign: 'left', borderColor: selected === t.code ? '#003c90' : '#e5e2dc' }} key={t.code} onClick={() => setSelected(t.code)}><strong>{t.name} ({t.tag})</strong><br /><small className="muted">{t.desc}</small></button>)}</div><button className="primary-button" style={{ marginTop: '.75rem' }} type="button" disabled={selected === language} onClick={() => beginDownload(selected, '/profile')}>{copy.confirmLanguage}</button></section><button className="card" type="button" onClick={resetProgress}>{copy.resetProgress}</button></main><BottomNav language={language} /></div>;
}
