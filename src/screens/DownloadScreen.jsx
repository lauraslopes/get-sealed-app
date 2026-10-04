import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TRANSLATIONS } from '../data';
import { fetchRevelation } from '../api';
import { saveCachedTranslation } from '../storage';
import { getUiCopy } from '../i18n';

export default function DownloadScreen({ language, chapter = 1, onReady }) {
  const translation = TRANSLATIONS.find(item => item.code === language);
  const copy = getUiCopy(language);
  const [progress, setProgress] = useState({ completed: 0, total: 0 });
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!translation || !navigator.onLine) {
      setError(translation ? copy.needInternet : 'Choose a language to continue.');
      return undefined;
    }
    const controller = new AbortController();
    let live = true;
    setError('');
    fetchRevelation({ bibleId: translation.bibleId, chapter, signal: controller.signal, onProgress: setProgress })
      .then(async result => {
        const cached = await saveCachedTranslation(language, result);
        if (live) onReady(language, cached);
      })
      .catch(err => { if (live && err.name !== 'AbortError') setError(err.message || copy.downloadFailed); });
    return () => { live = false; controller.abort(); };
  }, [translation, language, chapter, attempt]);

  return <main className="page"><section className="card" aria-live="polite">
    <h1>{error ? copy.downloadProblem : copy.downloadingTitle}</h1>
    {progress.total > 0 && <><p>{copy.downloadingProgress} {progress.completed} / {progress.total}</p><progress max={progress.total} value={progress.completed} style={{ width: '100%' }} /></>}
    {!error && <p className="muted">{copy.downloadingHelp}</p>}
    {error && <p role="alert" className="muted">{error}</p>}
    {error && navigator.onLine && translation && <button className="primary-button" type="button" onClick={() => { setProgress({ completed: 0, total: 0 }); setAttempt(value => value + 1); }}>{copy.retry}</button>}
    {error && !navigator.onLine && <p className="muted">{copy.connectToDownload}</p>}
    {error && !language && <Link to="/welcome">{copy.back}</Link>}
  </section></main>;
}
