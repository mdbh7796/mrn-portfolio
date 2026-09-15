import { Link } from 'react-router-dom';
import { useProjects } from '../hooks/useContent';
import { ProjectGrid } from '../components/ProjectCard';

export default function Home() {
  const { data, loading, error, retry } = useProjects();
  const featured = data.filter((p) => p.featured).slice(0, 3);

  return (
    <section>
      <div className="hero">
        <p className="muted" style={{ margin: 0, fontWeight: 500 }}>
          <span className="msr" aria-hidden="true" style={{ fontSize: '18px', verticalAlign: 'text-bottom' }}>
            location_on
          </span>{' '}
          Tinghir, Morocco · Open to junior roles
        </p>
        <h1 className="display">Mohamed Bougarch</h1>
        <p className="title" style={{ margin: '0.25rem 0 0.5rem' }}>
          Full-stack developer — Python, Django, C# & .NET, with React + MERN
        </p>
        <p className="body">
          I build desktop and web apps: WinUI package-manager GUI, PyQt point-of-sale, Django forums, and React
          front-ends. Trained at Web4Jobs / Tinghir Coding Center.
        </p>
        <div className="hero-actions">
          <Link to="/projects" className="btn btn-filled">
            <span className="msr" aria-hidden="true">
              work
            </span>
            View projects
          </Link>
          <Link to="/contact" className="btn btn-tonal">
            <span className="msr" aria-hidden="true">
              mail
            </span>
            Get in touch
          </Link>
          <a
            href="https://github.com/mdbh7796"
            target="_blank"
            rel="noreferrer"
            className="btn btn-tonal"
            aria-label="Mohamed Bougarch on GitHub"
          >
            <span className="msr" aria-hidden="true">
              code
            </span>
            GitHub
          </a>
          <a href="/resume.pdf" className="btn btn-tonal" aria-label="Download Mohamed Bougarch CV">
            <span className="msr" aria-hidden="true">
              download
            </span>
            Download CV
          </a>
        </div>
      </div>
      <h2 className="headline">Featured projects</h2>
      {loading && (
        <div className="grid" aria-label="Loading projects">
          {[0, 1, 2].map((i) => (
            <div key={i} className="card">
              <div className="skeleton skeleton-media" />
              <div className="card-body">
                <div className="skeleton skeleton-line" style={{ width: '60%' }} />
                <div className="skeleton skeleton-line" style={{ width: '90%' }} />
                <div className="skeleton skeleton-line" style={{ width: '40%' }} />
              </div>
            </div>
          ))}
        </div>
      )}
      {error && !loading && (
        <div className="error" role="alert">
          <p style={{ margin: '0 0 0.5rem' }}>Couldn&apos;t load projects. Check your connection and try again.</p>
          <button type="button" className="btn btn-tonal" onClick={retry}>
            <span className="msr" aria-hidden="true">
              refresh
            </span>
            Try again
          </button>
        </div>
      )}
      {!loading && !error && <ProjectGrid projects={featured.length ? featured : data.slice(0, 3)} />}
    </section>
  );
}
