import { useLocation, useNavigate } from 'react-router-dom';
import StudyTabs from '../components/StudyTabs';
import { getUiCopy } from '../i18n';

const FALLBACK_VERSE = 'The revelation from Jesus Christ, which God gave him to show his servants what must soon take place.';

export default function ActivityFirstLetterScreen({ language }) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const copy = getUiCopy(language);
  const verseId = state?.verseId || '1:1';
  const text = state?.text || FALLBACK_VERSE;
  const words = text.split(' ');

  return (
    <main className="page card">
      <button type="button" onClick={() => navigate(-1)}>{copy.back}</button>
      <StudyTabs currentStage="first-letter" language={language} />
      <h1>{copy.revelation} {verseId}</h1>
      <p className="scripture">
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            style={{
              marginRight: '.4rem',
              color: index < 4 ? '#0f52ba' : '#737784',
            }}
          >
            {index < 4 ? word : `${word[0]}...`}
          </span>
        ))}
      </p>
      <button
        className="primary-button"
        type="button"
        onClick={() => navigate('/activity/write', { state: { verseId, text } })}
      >
        {copy.nextWriteStage}
      </button>
    </main>
  );
}
