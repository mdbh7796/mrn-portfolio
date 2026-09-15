import { Link, useParams } from 'react-router-dom';
import { useProject } from '../hooks/useContent';

export default function ProjectDetail() {
  const { slug } = useParams();
  const { data, loading, error, retry } = useProject(slug);

  if (loading)
    return (
      <article aria-label="Loading project">
        <div className="skeleton skeleton-line" style={{ width: '40%', height: '2rem' }} />
        <div className="skeleton skeleton-line" style={{ width: '90%' }} />
        <div className="skeleton skeleton-line" style={{ width: '80%' }} />
        <div className="skeleton skeleton-media" style={{ marginTop: '1rem' }} />
      </article>
    );
  if (error)
    return (
      <div className="error" role="alert">
        <p style={{ margin: '0 0 0.5rem' }}>Couldn&apos;t load this project. Check your connection and try again.</p>
        <p className="hero-actions" style={{ margin: 0 }}>
          <button type="button" className="btn btn-tonal" onClick={retry}>
            <span className="msr" aria-hidden="true">
              refresh
            </span>
            Try again
          </button>
          <Link to="/projects" className="btn btn-text">
            <span className="msr" aria-hidden="true">
              arrow_back
            </span>
            All projects
          </Link>
        </p>
      </div>
    );
  if (!data)
    return (
      <div>
        <p className="error">Project not found — it may have been renamed or removed.</p>
        <p>
          <Link to="/projects" className="btn btn-filled">
            <span className="msr" aria-hidden="true">
              arrow_back
            </span>
            Browse all projects
          </Link>
        </p>
      </div>
    );

  return (
    <article>
      <p>
        <Link to="/projects" className="btn btn-text">
          <span className="msr" aria-hidden="true">
            arrow_back
          </span>
          All projects
        </Link>
      </p>
      <h1 className="display" style={{ fontSize: '2rem', lineHeight: '2.5rem' }}>
        {data.title}
      </h1>
      <p className="body">{data.summary}</p>
      {data.imageUrl && <img src={data.imageUrl} alt={data.title} className="detail-media" />}
      {data.problem && (
        <>
          <h3 className="title" style={{ marginTop: '1.5rem' }}>
            Problem
          </h3>
          <p className="body">{data.problem}</p>
        </>
      )}
      {data.solution && (
        <>
          <h3 className="title">Solution</h3>
          <p className="body">{data.solution}</p>
        </>
      )}
      {data.outcome && (
        <>
          <h3 className="title">Outcome</h3>
          <p className="outcome">{data.outcome}</p>
        </>
      )}
      <div className="stack" style={{ marginTop: '1rem' }}>
        {(data.techStack || []).map((t) => (
          <span key={t} className="chip">
            {t}
          </span>
        ))}
      </div>
      <p className="hero-actions">
        {data.liveUrl && (
          <a href={data.liveUrl} target="_blank" rel="noreferrer" className="btn btn-filled">
            <span className="msr" aria-hidden="true">
              open_in_new
            </span>
            Live demo
          </a>
        )}
        {data.repoUrl && (
          <a href={data.repoUrl} target="_blank" rel="noreferrer" className="btn btn-tonal">
            <span className="msr" aria-hidden="true">
              code
            </span>
            Source code
          </a>
        )}
      </p>
    </article>
  );
}
