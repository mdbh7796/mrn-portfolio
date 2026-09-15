import { useProjects } from '../hooks/useContent';
import { ProjectGrid } from '../components/ProjectCard';

export default function Projects() {
  const { data, loading, error } = useProjects();
  if (loading) return <p>Loading…</p>;
  if (error) return <p className="error">{error} (is the API running?)</p>;
  return (
    <section>
      <h1 className="display" style={{ fontSize: '2rem', lineHeight: '2.5rem' }}>Projects</h1>
      <ProjectGrid projects={data} />
    </section>
  );
}
