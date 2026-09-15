import { useParams } from 'react-router-dom';
import { useProject } from '../hooks/useContent';

export default function ProjectDetail() {
  const { slug } = useParams();
  const { data, loading, error } = useProject(slug);

  if (loading) return <p>Loading…</p>;
  if (error) return <p className="error">{error}</p>;
  if (!data) return <p>Not found.</p>;

  return (
    <article>
      <h1>{data.title}</h1>
      <p>{data.summary}</p>
      {data.imageUrl && <img src={data.imageUrl} alt={data.title} className="detail-media" />}
      <h3>Problem</h3>
      <p>{data.problem}</p>
      <h3>Solution</h3>
      <p>{data.solution}</p>
      <h3>Outcome</h3>
      <p>{data.outcome}</p>
      <div className="stack">
        {(data.techStack || []).map((t) => (
          <span key={t} className="pill">
            {t}
          </span>
        ))}
      </div>
      <p>
        {data.liveUrl && (
          <a href={data.liveUrl} target="_blank" rel="noreferrer">
            Live
          </a>
        )}{' '}
        {data.repoUrl && (
          <a href={data.repoUrl} target="_blank" rel="noreferrer">
            Code
          </a>
        )}
      </p>
    </article>
  );
}
