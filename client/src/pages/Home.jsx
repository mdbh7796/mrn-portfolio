import { Link } from 'react-router-dom';
import { useProjects } from '../hooks/useContent';
import { ProjectGrid } from '../components/ProjectCard';

export default function Home() {
  const { data, loading, error, retry } = useProjects();
  const featured = data.filter((p) => p.featured).slice(0, 3);

  return (
    <section>
      <div className="hero">
        <div className="hero-copy">
          <p className="eyebrow muted">
            <span className="msr" aria-hidden="true" style={{ fontSize: '18px', verticalAlign: 'text-bottom' }}>
              location_on
            </span>{' '}
            Tinghir, Morocco · Open to junior roles
          </p>
          <h1 className="display">Mohamed Bougarch</h1>
          <p className="title" style={{ margin: '0.25rem 0 0.5rem' }}>
            I build practical software that feels polished and works for real people.
          </p>
          <p className="body">
            I design and develop web and desktop applications using Python, Django, C#, .NET, and React. From
            package managers and POS tools to forum platforms and product dashboards, I focus on clean architecture,
            fast iteration, and user-friendly experiences.
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

        <div className="hero-panel" aria-label="Developer strengths">
          <p className="panel-label">What I bring</p>
          <ul className="value-points">
            <li>Business-focused product thinking</li>
            <li>Clean backend logic with maintainable code</li>
            <li>Accessible, modern interfaces that people enjoy using</li>
          </ul>
        </div>
      </div>

      <div className="stats-grid" aria-label="Developer summary">
        <div className="stat-card">
          <span className="msr" aria-hidden="true">
            insights
          </span>
          <strong>4+</strong>
          <span>Product-focused projects</span>
        </div>
        <div className="stat-card">
          <span className="msr" aria-hidden="true">
            code
          </span>
          <strong>Python + C# + React</strong>
          <span>Full-stack toolkit</span>
        </div>
        <div className="stat-card">
          <span className="msr" aria-hidden="true">
            rocket_launch
          </span>
          <strong>From concept</strong>
          <span>to working software</span>
        </div>
      </div>

      <div className="section-panel">
        <div>
          <p className="panel-label">Why I stand out</p>
          <h2 className="headline" style={{ marginTop: 0 }}>Clear thinking, buildable solutions, and a strong product mindset.</h2>
        </div>
        <p className="body" style={{ margin: 0 }}>
          I enjoy turning messy requirements into organized systems, designing interfaces that stay intuitive, and
          shipping software that solves the right problem rather than just looking impressive.
        </p>
      </div>

      <div className="services-section">
        <div className="section-heading-row">
          <p className="panel-label">What I can help with</p>
          <h2 className="headline" style={{ margin: 0 }}>Practical software for everyday workflows and business problems.</h2>
        </div>
        <div className="services-grid">
          <article className="service-card">
            <span className="msr" aria-hidden="true">dashboard</span>
            <h3>Web apps & dashboards</h3>
            <p>Modern interfaces for internal tools, product dashboards, and client-facing experiences.</p>
          </article>
          <article className="service-card">
            <span className="msr" aria-hidden="true">storage</span>
            <h3>Backend systems</h3>
            <p>Reliable APIs, data models, and business logic built with Python, Django, and .NET.</p>
          </article>
          <article className="service-card">
            <span className="msr" aria-hidden="true">desktop_windows</span>
            <h3>Desktop tools</h3>
            <p>Powerful local applications for operations, inventory, POS, and productivity workflows.</p>
          </article>
        </div>
      </div>

      <div className="cta-banner">
        <div>
          <p className="panel-label">Let&apos;s build</p>
          <h2 className="headline" style={{ margin: 0 }}>Need a developer who can turn ideas into working software?</h2>
        </div>
        <Link to="/contact" className="btn btn-filled">
          <span className="msr" aria-hidden="true">mail</span>
          Start a conversation
        </Link>
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
