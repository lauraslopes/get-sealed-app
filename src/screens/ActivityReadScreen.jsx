import { useLocation, useNavigate } from 'react-router-dom';
import StudyTabs from '../components/StudyTabs';
import { SAMPLE_VERSES } from '../data';
import { getUiCopy } from '../i18n';

export default function ActivityReadScreen({ language }) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const copy = getUiCopy(language);
  const verseId = state?.verseId || '1:1';
  const text = state?.text || SAMPLE_VERSES[verseId] || SAMPLE_VERSES['1:1'];

  return (
    <main className="page card">
      <button type="button" onClick={() => navigate('/study/')}>{copy.back}</button>
      <StudyTabs currentStage="read" language={language} />
      <small className="muted">{copy.stageOne}</small>
      <h1>{copy.revelation} {verseId}</h1>
      <p className="scripture">{text}</p>
      <p className="muted">{copy.readInstruction}</p>
      <button
        className="primary-button"
        type="button"
        onClick={() => navigate('/activity/blanks', { state: { verseId, text } })}
      >
        {copy.proceedToBlanks}
      </button>
    </main>
  );
}
