import { useAbout } from '../hooks/useContent';
import SkillsList from '../components/SkillsList';

export default function About() {
  const { about, skills, loading, error } = useAbout();
  if (loading) return <p>Loading…</p>;
  if (error) return <p className="error">{error} (is the API running?)</p>;
  return (
    <section>
      {about?.name && <h1 className="display" style={{ fontSize: '2rem', lineHeight: '2.5rem', marginBottom: 0 }}>{about.name}</h1>}
      {about?.headline && <p className="title" style={{ color: 'var(--md-sys-color-primary)', marginTop: '0.25rem' }}>{about.headline}</p>}
      <p className="body">{about?.bio}</p>
      {about?.location && (
        <p className="muted">
          <span className="msr" aria-hidden="true" style={{ fontSize: '18px' }}>
            location_on
          </span>{' '}
          {about.location}
        </p>
      )}
      <h2 className="headline">Skills</h2>
      <SkillsList skills={skills} />
      {!!about?.certifications?.length && (
        <>
          <h2 className="headline">Licenses & certifications</h2>
          <div className="skills">
            {about.certifications.map((c) => (
              <div key={c._id || c.name}>
                <h4>
                  <span className="msr" aria-hidden="true" style={{ fontSize: '18px', verticalAlign: 'text-bottom' }}>
                    verified
                  </span>{' '}
                  {c.name}
                </h4>
                {c.issuer && <p className="muted" style={{ margin: 0 }}>{c.issuer}</p>}
              </div>
            ))}
          </div>
        </>
      )}
      {about?.links && (
        <p className="hero-actions">
          {about.links.github && (
            <a href={about.links.github} target="_blank" rel="noreferrer" className="btn btn-tonal">
              <span className="msr" aria-hidden="true">
                code
              </span>
              GitHub
            </a>
          )}
          {about.links.linkedin && (
            <a href={about.links.linkedin} target="_blank" rel="noreferrer" className="btn btn-tonal">
              <span className="msr" aria-hidden="true">
                business_center
              </span>
              LinkedIn
            </a>
          )}
        </p>
      )}
    </section>
  );
}
