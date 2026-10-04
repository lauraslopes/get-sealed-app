import { useState } from 'react';
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
  const [completedCount, setCompletedCount] = useState(0);
  const [value, setValue] = useState('');
  const nextWord = words[completedCount];
  const isComplete = completedCount === words.length;

  function handleChange(event) {
    const nextValue = event.target.value.slice(-1);

    if (nextValue.toLowerCase() === nextWord[0].toLowerCase()) {
      setCompletedCount(current => current + 1);
      setValue('');
      return;
    }

    setValue('');
  }

  function revealNextWord() {
    if (!isComplete) {
      setCompletedCount(current => current + 1);
      setValue('');
    }
  }

  return (
    <main className="page card">
      <button type="button" onClick={() => navigate('/study/')}>{copy.back}</button>
      <StudyTabs currentStage="first-letter" language={language} />
      <h1>{copy.revelation} {verseId}</h1>
      <p className="scripture first-letter-verse">
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className={index < completedCount ? 'revealed-word' : 'hidden-word'}
          >
            {index < completedCount ? word : '_'.repeat(word.length)}
          </span>
        ))}
      </p>
      {!isComplete && (
        <>
          <p className="muted">Type the first letter of the next word.</p>
          <input
            className="first-letter-input"
            type="text"
            inputMode="text"
            maxLength={1}
            autoFocus
            aria-label="First letter of the next word"
            value={value}
            onChange={handleChange}
          />
          <button className="tip-button" type="button" onClick={revealNextWord}>
            {copy.tip}
          </button>
        </>
      )}
      <button
        className="primary-button"
        type="button"
        disabled={!isComplete}
        onClick={() => navigate('/activity/write', { state: { verseId, text } })}
      >
        {copy.nextWriteStage}
      </button>
    </main>
  );
}
