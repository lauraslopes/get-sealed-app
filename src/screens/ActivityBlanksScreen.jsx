import { useLocation, useNavigate } from 'react-router-dom';
import StudyTabs from '../components/StudyTabs';
import { getUiCopy } from '../i18n';

const FALLBACK_VERSE = 'The revelation from Jesus Christ, which God gave him to show his servants what must soon take place.';

export default function ActivityBlanksScreen({ language }) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const copy = getUiCopy(language);
  const verseId = state?.verseId || '1:1';
  const text = state?.text || FALLBACK_VERSE;
  const missingWords = text.split(' ').map((word, index) => (
    index % 5 === 1 ? '____' : word
  ));

  return (
    <main className="page card">
      <button type="button" onClick={() => navigate(-1)}>{copy.back}</button>
      <StudyTabs currentStage="blanks" language={language} />
      <h1>{copy.revelation} {verseId}</h1>
      <p className="muted">{copy.blanksInstruction}</p>
      <p className="scripture">{missingWords.join(' ')}</p>
      <div className="stack">
        <button
          className="card"
          type="button"
          onClick={() => navigate('/activity/first-letter', { state: { verseId, text } })}
        >
          {copy.completeBlanks}
        </button>
      </div>
    </main>
  );
}
