import { Link, useNavigate } from 'react-router-dom';
import { TRANSLATIONS } from '../data';

export default function WelcomeScreen({ language, setLanguage }) {
  const navigate = useNavigate();
  return <main className="page">
    <div className="topbar"><strong>REVELATION CHRONOLOGY</strong><Link to="/study">Skip</Link></div>
    <section><h1>Let's Get Sealed!</h1><p className="scripture muted"><em>Select your preferred Scripture translation to begin your memorization journey.</em></p>
      <p className="muted">AVAILABLE TRANSLATIONS</p><div className="stack">{TRANSLATIONS.map(t => <button className="card" style={{ textAlign: 'left', borderColor: language === t.code ? '#003c90' : '#e5e2dc' }} key={t.code} onClick={() => setLanguage(t.code)}><strong>{t.name} <small>{t.tag}</small></strong><br /><span className="muted">{t.desc}</span>{language === t.code && <span style={{ float: 'right', color: '#003c90' }}>✓</span>}</button>)}</div>
      <button className="primary-button" style={{ marginTop: '1.5rem' }} onClick={() => navigate('/study')}>Start Memorizing →</button>
    </section>
  </main>;
}
