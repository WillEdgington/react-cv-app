import { useCV } from "../../CVContext.jsx";

function PersonalPreview({ personal }) {
  return (
    <div className="personal-preview">
      <h1>{personal.name}</h1>
      <p>{personal.email}</p>
      <p>{personal.phone}</p>
      <p>{personal.location}</p>
    </div>
  );
}

function SkillsPreview({ skills, topN=5 }) {
  const topSkills = skills.slice(0, topN);
  
  return (
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
  );
}

function EducationPreview({ education, topN=5 }) {
  function educationItem(item) {
    return (
      <div className="education-item">
        <strong>{item.qualification}</strong>
        <div>{item.school}</div>
        <div>{item.startYear} {item.endYear && `- ${item.endYear}`}</div>
        <div>{item.description}</div>
      </div>
    );
  }

  const topItems = education.slice(0, topN);

  return (
    <div className="education-preview">
      <h3>Education</h3>
      <ul>
        {topItems.map(item => (
          <li key={item.id}>
            {educationItem(item)}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ExperiencePreview({ experience, topN=5 }) {
  function experienceItem(item) {
    return (
      <div className="experience-item">
        <strong>{item.role}</strong>
        <div>{item.company} {item.location && `- ${item.location}`}</div>
        <div>{item.startYear} {item.isCurrent ? `- Current` : `- ${item.endYear}`}</div>
        <div>{item.description}</div>
      </div>
    );
  }
  
  const topItems = experience.slice(0, topN);
  
  return (
    <div className="experience-preview">
      <h3>Experience</h3>
      <ul>
        {topItems.map(item => (
          <li key={item.id}>
            {experienceItem(item)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function CVPreview() {
  const { state } = useCV();

  return (
    <div id="cv-print" className="cv-preview">
      <PersonalPreview 
        personal={state.personal}
      />

      {state.skills.length > 0 && (
        <SkillsPreview 
          skills={state.skills}
        />
      )}

      {state.education.length > 0 && (
        <EducationPreview 
          education={state.education}
        />
      )}

      {state.experience.length > 0 && (
        <ExperiencePreview 
          experience={state.experience}
        />
      )}
    </div>
  );
}