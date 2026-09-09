import { Link } from 'react-router-dom';

export default function StudyTabs({ currentStage }) {
  const tabs = [['read', 'READ'], ['blanks', 'BLANKS'], ['first-letter', '1ST LTR'], ['write', 'WRITE']];
  return <nav className="study-tabs">{tabs.map(([id, label]) => <Link className={id === currentStage ? 'active' : ''} key={id} to={`/activity/${id}`}>{label}</Link>)}</nav>;
}
