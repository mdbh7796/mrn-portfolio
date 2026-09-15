import { useProjects } from '../hooks/useContent';
import { ProjectGrid } from '../components/ProjectCard';

export default function Projects() {
  const { data, loading, error, retry } = useProjects();
  if (loading)
    return (
      <section>
        <h1 className="display" style={{ fontSize: '2rem', lineHeight: '2.5rem' }}>Projects</h1>
        <div className="grid" aria-label="Loading projects">
          {[0, 1, 2, 3].map((i) => (
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
      </section>
    );
  if (error)
    return (
      <section>
        <h1 className="display" style={{ fontSize: '2rem', lineHeight: '2.5rem' }}>Projects</h1>
        <div className="error" role="alert">
          <p style={{ margin: '0 0 0.5rem' }}>Couldn&apos;t load projects. Check your connection and try again.</p>
          <button type="button" className="btn btn-tonal" onClick={retry}>
            <span className="msr" aria-hidden="true">
              refresh
            </span>
            Try again
          </button>
        </div>
      </section>
    );
  return (
    <section>
      <h1 className="display" style={{ fontSize: '2rem', lineHeight: '2.5rem' }}>Projects</h1>
      <p className="body" style={{ marginTop: 0 }}>
        A mix of product thinking, clean architecture, and practical problem-solving — from desktop workflows to web apps that people actually use.
      </p>
      <ProjectGrid projects={data} />
    </section>
  );
}
