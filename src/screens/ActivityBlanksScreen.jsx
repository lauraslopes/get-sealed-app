import { useState } from 'react';
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
  const words = text.split(' ');
  const missingWordIndexes = words.reduce((indexes, word, index) => {
    if (index % 5 === 1) indexes.push(index);
    return indexes;
  }, []);
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const missingWords = missingWordIndexes.map((index) => ({ index, word: words[index] }));
  const wordOptions = missingWords
    .map(({ index, word }) => ({ index, word }))
    .sort((first, second) => first.word.localeCompare(second.word));
  const nextMissingIndex = missingWordIndexes[selectedIndexes.length];
  const isComplete = selectedIndexes.length === missingWordIndexes.length;

  function selectWord(index) {
    if (index !== nextMissingIndex) return;
    setSelectedIndexes((current) => [...current, index]);
  }

  return (
    <main className="page card">
      <button type="button" onClick={() => navigate('/study/')}>{copy.back}</button>
      <StudyTabs currentStage="blanks" language={language} />
      <h1>{copy.revelation} {verseId}</h1>
      <p className="muted">{copy.blanksInstruction}</p>
      <p className="scripture">
        {words.map((word, index) => {
          const isMissing = missingWordIndexes.includes(index);
          const isSelected = selectedIndexes.includes(index);
          return (
            <span className="verse-word" key={`${word}-${index}`}>
              {isMissing && !isSelected ? '____' : word}
            </span>
          );
        })}
      </p>
      <div className="word-bank" aria-label={copy.blanksInstruction}>
        {wordOptions.map(({ index, word }) => (
          <button
            className="word-option"
            type="button"
            key={`${word}-${index}`}
            disabled={selectedIndexes.includes(index)}
            onClick={() => selectWord(index)}
          >
            {word}
          </button>
        ))}
      </div>
      <div className="stack">
        <button
          className="primary-button"
          type="button"
          disabled={!isComplete}
          onClick={() => navigate('/activity/first-letter', { state: { verseId, text } })}
        >
          {copy.completeBlanks}
        </button>
      </div>
    </main>
  );
}
