import { Link, useLocation } from 'react-router-dom';
import { getUiCopy } from '../i18n';

export default function BottomNav({language}) {
  const { pathname } = useLocation();
  const copy = getUiCopy(language);
  return <nav className="bottom-nav">
    <Link className={pathname.startsWith('/study') || pathname.startsWith('/chapter') ? 'active' : ''} to="/study"><span className="material-symbols-outlined">menu_book</span>{copy.study}</Link>
    <Link className={pathname === '/profile' ? 'active' : ''} to="/profile"><span className="material-symbols-outlined">person</span>{copy.profile}</Link>
  </nav>;
}
