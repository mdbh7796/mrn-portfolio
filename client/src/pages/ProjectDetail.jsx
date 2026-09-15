import { Link, useParams } from 'react-router-dom';
import { useProject } from '../hooks/useContent';

export default function ProjectDetail() {
  const { slug } = useParams();
  const { data, loading, error } = useProject(slug);

  if (loading) return <p className="body">Loading…</p>;
  if (error) return <p className="error">{error}</p>;
  if (!data) return <p className="error">Project not found.</p>;

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
      <h3 className="title" style={{ marginTop: '1.5rem' }}>
        Problem
      </h3>
      <p className="body">{data.problem}</p>
      <h3 className="title">Solution</h3>
      <p className="body">{data.solution}</p>
      <h3 className="title">Outcome</h3>
      <p className="outcome">{data.outcome}</p>
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
