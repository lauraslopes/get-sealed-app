import { Link, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const { pathname } = useLocation();
  return <nav className="bottom-nav">
    <Link className={pathname.startsWith('/study') || pathname.startsWith('/chapter') ? 'active' : ''} to="/study"><span className="material-symbols-outlined">menu_book</span>Study</Link>
    <Link className={pathname === '/profile' ? 'active' : ''} to="/profile"><span className="material-symbols-outlined">person</span>Profile</Link>
  </nav>;
}
