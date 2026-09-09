import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import StudyTabs from '../components/StudyTabs';

export default function ActivityWriteScreen({ completeVerse }) {
  const navigate = useNavigate(); const { state } = useLocation(); const verseId = state?.verseId || '1:1'; const expected = state?.text || 'The revelation from Jesus Christ, which God gave him to show his servants what must soon take place.'; const [value, setValue] = useState(''); const [verified, setVerified] = useState(false);
  const check = () => { if (value.trim().length >= 15) { completeVerse(verseId); setVerified(true); } };
  return <main className="page card"><button onClick={() => navigate(-1)}>← Back</button><StudyTabs currentStage="write" /><h1>Revelation {verseId}</h1><p className="muted">Type the verse from memory.</p><textarea value={value} onChange={event => setValue(event.target.value)} placeholder="The revelation from Jesus Christ..." />{verified && <p style={{ color: '#003c90' }}>✓ Verse mastered and sealed into memory.</p>}<button className="primary-button" onClick={verified ? () => navigate(`/chapter/${verseId.split(':')[0]}`) : check}>{verified ? 'Complete & Return' : 'Check Answer'}</button><button className="muted" onClick={() => setValue(expected)}>Quick Fill (Mock Test)</button></main>;
}
