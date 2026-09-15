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
        Mohamed Bougarch
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
      <div>Mohamed Bougarch · {new Date().getFullYear()} · Tinghir, Morocco</div>
      <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.25rem', justifyContent: 'center' }}>
        <a
          className="btn btn-text"
          href="https://github.com/mdbh7796"
          target="_blank"
          rel="noreferrer"
          aria-label="Mohamed Bougarch on GitHub"
        >
          <span className="msr" aria-hidden="true">
            code
          </span>
          GitHub
        </a>
        <a
          className="btn btn-text"
          href="https://www.linkedin.com/in/mdbh7/"
          target="_blank"
          rel="noreferrer"
          aria-label="Mohamed Bougarch on LinkedIn"
        >
          <span className="msr" aria-hidden="true">
            business_center
          </span>
          LinkedIn
        </a>
      </div>
      <div className="muted" style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>
        Python · Django · C# & .NET · React + MERN · Material 3
      </div>
    </footer>
  );
}
