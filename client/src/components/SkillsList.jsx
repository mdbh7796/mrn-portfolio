export default function SkillsList({ skills }) {
  if (!skills?.length) return <p className="body">No skills listed yet.</p>;
  const groups = skills.reduce((acc, s) => {
    (acc[s.category || 'Tools'] ||= []).push(s);
    return acc;
  }, {});
  return (
    <div className="skills">
      {Object.entries(groups).map(([cat, list]) => (
        <div key={cat}>
          <h4>{cat}</h4>
          <ul>
            {list.map((s) => (
              <li key={s._id || s.name}>
                {s.name} <span className="muted">· {s.level}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
