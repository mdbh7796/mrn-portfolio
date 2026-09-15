import { Link } from 'react-router-dom';
import { useProjects } from '../hooks/useContent';
import { ProjectGrid } from '../components/ProjectCard';

export default function Home() {
  const { data, loading, error } = useProjects();
  const featured = data.filter((p) => p.featured).slice(0, 3);

  return (
    <section>
      <div className="hero">
        <h1 className="display">Full-stack developer (MERN)</h1>
        <p className="body">Lean portfolio: projects, skills, contact. No fluff.</p>
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
        </div>
      </div>
      <h2 className="headline">Featured projects</h2>
      {loading && <p className="body">Loading…</p>}
      {error && <p className="error">{error} (is the API running?)</p>}
      {!loading && !error && <ProjectGrid projects={featured.length ? featured : data.slice(0, 3)} />}
    </section>
  );
}
