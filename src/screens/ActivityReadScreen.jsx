import { useLocation, useNavigate } from 'react-router-dom';
import StudyTabs from '../components/StudyTabs';
import { SAMPLE_VERSES } from '../data';

export default function ActivityReadScreen() {
  const navigate = useNavigate(); const { state } = useLocation(); const verseId = state?.verseId || '1:1'; const text = state?.text || SAMPLE_VERSES[verseId] || SAMPLE_VERSES['1:1'];
  return <main className="page card"><button onClick={() => navigate(-1)}>← Back</button><StudyTabs currentStage="read" /><small className="muted">STAGE 1 OF 4: CONTEMPLATE</small><h1>Revelation {verseId}</h1><p className="scripture">{text}</p><p className="muted">Read and internalize the flow, rhythm, and significance of each word.</p><button className="primary-button" onClick={() => navigate('/activity/blanks', { state: { verseId, text } })}>Proceed to Blanks →</button></main>;
}
