import { useNavigate } from 'react-router-dom';
import { TRANSLATIONS } from '../data';
import { getUiCopy } from '../i18n';

export default function WelcomeScreen({ language, setLanguage }) {
  const navigate = useNavigate();
  const copy = getUiCopy(language);
  return <main className="page">
    <section><h1>{copy.welcomeTitle}</h1><p className="scripture muted"><em>{copy.welcomeIntro}</em></p>
      <p className="muted">{copy.availableTranslations}</p><div className="stack">{TRANSLATIONS.map(t => <button className="card" type="button" aria-pressed={language === t.code} style={{ textAlign: 'left', borderColor: language === t.code ? '#003c90' : '#e5e2dc' }} key={t.code} onClick={() => setLanguage(t.code)}><strong>{t.name} <small>{t.tag}</small></strong><br /><span className="muted">{t.desc}</span>{language === t.code && <span style={{ float: 'right', color: '#003c90' }}>✓</span>}</button>)}</div>
      {!language && <p className="muted" role="status">{copy.selectTranslation}</p>}
      <button className="primary-button" type="button" disabled={!language} style={{ marginTop: '1.5rem' }} onClick={() => navigate('/study')}>{copy.startMemorizing}</button>
    </section>
  </main>;
}
