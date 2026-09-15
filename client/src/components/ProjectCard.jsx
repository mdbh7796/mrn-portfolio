import { Link } from 'react-router-dom';

function initials(title) {
  return (title || '?')
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function ProjectCard({ project }) {
  return (
    <article className="card">
      {project.imageUrl ? (
        <img src={project.imageUrl} alt={project.title} loading="lazy" />
      ) : (
        <div className="card-media-fallback" aria-hidden="true">
          {initials(project.title)}
        </div>
      )}
      <div className="card-body">
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <div className="stack">
          {(project.techStack || []).map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
        {project.outcome && <p className="outcome">{project.outcome}</p>}
      </div>
      <div className="card-actions">
        <Link to={`/projects/${project.slug}`} className="btn btn-text">
          View details
          <span className="msr" aria-hidden="true">
            arrow_forward
          </span>
        </Link>
        <span style={{ flex: 1 }} />
        {project.liveUrl && (
          <a className="icon-btn" href={project.liveUrl} target="_blank" rel="noreferrer" aria-label={`${project.title} live demo`}>
            <span className="msr" aria-hidden="true">
              open_in_new
            </span>
          </a>
        )}
        {project.repoUrl && (
          <a className="icon-btn" href={project.repoUrl} target="_blank" rel="noreferrer" aria-label={`${project.title} source code`}>
            <span className="msr" aria-hidden="true">
              code
            </span>
          </a>
        )}
      </div>
    </article>
  );
}

export function ProjectGrid({ projects }) {
  if (!projects.length) return <p className="body">No projects yet.</p>;
  return (
    <div className="grid">
      {projects.map((p) => (
        <ProjectCard key={p.slug} project={p} />
      ))}
    </div>
  );
}
