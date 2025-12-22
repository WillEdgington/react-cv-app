import { useCV } from "../../CVContext.jsx";

export default function CVPreview() {
  const { state } = useCV();
  const p = state.personal;
  const topSkills = state.skills.slice(0, 5);

  return (
    <div className="cv-preview">
      <div className="personal-preview">
        <h1>{p.name}</h1>
        <p>{p.email}</p>
        <p>{p.phone}</p>
        <p>{p.location}</p>
      </div>

      {topSkills.length > 0 && (
        <div className="skills-preview">
          <h3>Skills</h3>
          <ul>
            {topSkills.map(skill => (
              <li key={skill.id}>
                {skill.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}