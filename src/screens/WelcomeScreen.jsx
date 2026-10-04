import { useState } from 'react';
import { TRANSLATIONS } from '../data';
import { getUiCopy } from '../i18n';

export default function WelcomeScreen({ language, beginDownload }) {
  const [selected, setSelected] = useState(language);
  const copy = getUiCopy(language);
  return <main className="page">
    <section><h1>{copy.welcomeTitle}</h1><p className="scripture muted"><em>{copy.welcomeIntro}</em></p>
      <p className="muted">{copy.availableTranslations}</p><div className="stack">{TRANSLATIONS.map(t => <button className="card" type="button" aria-pressed={selected === t.code} style={{ textAlign: 'left', borderColor: selected === t.code ? '#003c90' : '#e5e2dc' }} key={t.code} onClick={() => setSelected(t.code)}><strong>{t.name} <small>{t.tag}</small></strong><br /><span className="muted">{t.desc}</span>{selected === t.code && <span style={{ float: 'right', color: '#003c90' }}>✓</span>}</button>)}</div>
      {!selected && <p className="muted" role="status">{copy.selectTranslation}</p>}
      <button className="primary-button" type="button" disabled={!selected} style={{ marginTop: '1.5rem' }} onClick={() => beginDownload(selected)}>{copy.confirmLanguage}</button>
    </section>
  </main>;
}
