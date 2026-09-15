import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section style={{ textAlign: 'center', padding: '3rem 0' }}>
      <span className="msr" aria-hidden="true" style={{ fontSize: '64px', color: 'var(--md-sys-color-primary)' }}>
        search_off
      </span>
      <h1 className="display" style={{ fontSize: '2rem', lineHeight: '2.5rem' }}>
        Page not found
      </h1>
      <p className="body">That URL doesn&apos;t exist — but the projects do.</p>
      <p>
        <Link to="/projects" className="btn btn-filled">
          <span className="msr" aria-hidden="true">
            work
          </span>
          Browse projects
        </Link>
      </p>
    </section>
  );
}
