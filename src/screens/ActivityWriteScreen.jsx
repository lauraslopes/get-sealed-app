import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import StudyTabs from '../components/StudyTabs';
import { getUiCopy } from '../i18n';

const FALLBACK_VERSE = 'The revelation from Jesus Christ, which God gave him to show his servants what must soon take place.';
const PASSING_SCORE = 0.8;

function normalizeVerse(value) {
  return value.trim().replace(/\s+/g, ' ').toLowerCase();
}

function getVerseAccuracy(value, expected) {
  const actual = normalizeVerse(value);
  const target = normalizeVerse(expected);
  const previousRow = Array.from({ length: target.length + 1 }, (_, index) => index);

  for (let row = 1; row <= actual.length; row += 1) {
    const currentRow = [row];
    for (let column = 1; column <= target.length; column += 1) {
      const cost = actual[row - 1] === target[column - 1] ? 0 : 1;
      currentRow[column] = Math.min(
        currentRow[column - 1] + 1,
        previousRow[column] + 1,
        previousRow[column - 1] + cost,
      );
    }
    previousRow.splice(0, previousRow.length, ...currentRow);
  }

  return 1 - previousRow[target.length] / Math.max(actual.length, target.length);
}

export default function ActivityWriteScreen({ completeVerse, language }) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const copy = getUiCopy(language);
  const verseId = state?.verseId || '1:1';
  const expected = state?.text || FALLBACK_VERSE;
  const [value, setValue] = useState('');
  const [verified, setVerified] = useState(false);
  const [accuracy, setAccuracy] = useState(null);

  const check = () => {
    const score = getVerseAccuracy(value, expected);
    setAccuracy(score);

    if (score >= PASSING_SCORE) {
      completeVerse(verseId);
      setVerified(true);
    }
  };

  return (
    <main className="page card">
      <button type="button" onClick={() => navigate('/study/')}>{copy.back}</button>
      <StudyTabs currentStage="write" language={language} />
      <h1>{copy.revelation} {verseId}</h1>
      <p className="muted">{copy.writeInstruction}</p>
      <textarea
        placeholder={copy.versePlaceholder}
        value={value}
        onChange={event => setValue(event.target.value)}
      />
      {verified && <p style={{ color: '#003c90' }}>{copy.verseMastered}</p>}
      {accuracy !== null && !verified && (
        <p className="write-error">{copy.verseTryAgain}</p>
      )}
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
