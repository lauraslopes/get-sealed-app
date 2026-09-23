import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import StudyTabs from '../components/StudyTabs';
import { getUiCopy } from '../i18n';

const FALLBACK_VERSE = 'The revelation from Jesus Christ, which God gave him to show his servants what must soon take place.';

export default function ActivityWriteScreen({ completeVerse, language }) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const copy = getUiCopy(language);
  const verseId = state?.verseId || '1:1';
  const expected = state?.text || FALLBACK_VERSE;
  const [value, setValue] = useState('');
  const [verified, setVerified] = useState(false);

  const check = () => {
    if (value.trim().length >= 15) {
      completeVerse(verseId);
      setVerified(true);
    }
  };

  return (
    <main className="page card">
      <button type="button" onClick={() => navigate(-1)}>{copy.back}</button>
      <StudyTabs currentStage="write" language={language} />
      <h1>{copy.revelation} {verseId}</h1>
      <p className="muted">{copy.writeInstruction}</p>
      <textarea
        placeholder={copy.versePlaceholder}
        value={value}
        onChange={event => setValue(event.target.value)}
      />
      {verified && <p style={{ color: '#003c90' }}>{copy.verseMastered}</p>}
      <button
        className="primary-button"
        type="button"
        onClick={verified ? () => navigate(`/chapter/${verseId.split(':')[0]}`) : check}
      >
        {verified ? copy.completeAndReturn : copy.checkAnswer}
      </button>
      <button className="muted" type="button" onClick={() => setValue(expected)}>
        {copy.quickFill}
      </button>
    </main>
  );
}
