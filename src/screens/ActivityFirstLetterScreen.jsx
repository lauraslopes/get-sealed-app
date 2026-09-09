import { useLocation, useNavigate } from 'react-router-dom';
import StudyTabs from '../components/StudyTabs';

export default function ActivityFirstLetterScreen() {
  const navigate = useNavigate(); const { state } = useLocation(); const verseId = state?.verseId || '1:1'; const text = state?.text || 'The revelation from Jesus Christ, which God gave him to show his servants what must soon take place.'; const words = text.split(' ');
  return <main className="page card"><button onClick={() => navigate(-1)}>← Back</button><StudyTabs currentStage="first-letter" /><h1>Revelation {verseId}</h1><p className="scripture">{words.map((word, index) => <span key={index} style={{ marginRight: '.4rem', color: index < 4 ? '#0f52ba' : '#737784' }}>{index < 4 ? word : `${word[0]}...`}</span>)}</p><button className="primary-button" onClick={() => navigate('/activity/write', { state: { verseId, text } })}>Next Stage: Write Whole Verse</button></main>;
}
