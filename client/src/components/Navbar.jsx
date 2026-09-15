import { Link, NavLink } from 'react-router-dom';

const TABS = [
  { to: '/projects', icon: 'work', label: 'Projects' },
  { to: '/about', icon: 'person', label: 'About' },
  { to: '/contact', icon: 'mail', label: 'Contact' }
];

export default function Navbar({ theme, onToggleTheme }) {
  return (
    <nav className="nav">
      <Link to="/" className="brand">
        MRN Portfolio
      </Link>
      <div className="links">
        {TABS.map((t) => (
          <NavLink key={t.to} to={t.to} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            <span className="msr" aria-hidden="true">
              {t.icon}
            </span>
            <span>{t.label}</span>
          </NavLink>
        ))}
        <button
          type="button"
          className="icon-btn"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          title={theme === 'dark' ? 'Light theme' : 'Dark theme'}
        >
          <span className="msr" aria-hidden="true">
            {theme === 'dark' ? 'light_mode' : 'dark_mode'}
          </span>
        </button>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      Mohamed Bougarch · {new Date().getFullYear()} · React + Express + MongoDB · Material 3
    </footer>
  );
}
