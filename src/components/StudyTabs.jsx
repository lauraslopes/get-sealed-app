import { Link } from 'react-router-dom';
import { getUiCopy } from '../i18n';

export default function StudyTabs({ currentStage, language }) {
  const copy = getUiCopy(language);
  const tabs = [
    ['read', copy.readTab],
    ['blanks', copy.blanksTab],
    ['first-letter', copy.firstLetterTab],
    ['write', copy.writeTab],
  ];

  return (
    <nav className="study-tabs">
      {tabs.map(([id, label]) => (
        <Link className={id === currentStage ? 'active' : ''} key={id} to={`/activity/${id}`}>
          {label}
        </Link>
      ))}
    </nav>
  );
}
