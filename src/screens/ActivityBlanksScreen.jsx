import { useLocation, useNavigate } from 'react-router-dom';
import StudyTabs from '../components/StudyTabs';

export default function ActivityBlanksScreen() {
  const navigate = useNavigate(); const { state } = useLocation(); const verseId = state?.verseId || '1:1'; const text = state?.text || 'The revelation from Jesus Christ, which God gave him to show his servants what must soon take place.'; const words = text.split(' '); const missing = words.map((word, i) => i % 5 === 1 ? '____' : word);
  return <main className="page card"><button onClick={() => navigate(-1)}>← Back</button><StudyTabs currentStage="blanks" /><h1>Revelation {verseId}</h1><p className="muted">Tap missing words to complete the sacred text.</p><p className="scripture">{missing.join(' ')}</p><div className="stack"><button className="card" onClick={() => navigate('/activity/first-letter', { state: { verseId, text } })}>Complete blanks →</button></div></main>;
}
