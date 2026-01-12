import { useCV } from "../../CVContext.jsx";

function PersonalPreview({ personal }) {
  return (
    <div className="personal-preview">
      <h1>{personal.name}</h1>

      <div className="contact-line">
        {personal.email && <span>{personal.email}</span>}
        {personal.phone && <span>{personal.phone}</span>}
        {personal.location && <span>{personal.location}</span>}
      </div>
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
        <div className="education-header">
          <span className="education-qualification">{item.qualification}</span>
          <span className="education-dates">
            {item.startYear} - {item.endYear}
          </span>
        </div>

        <div className="education-school">{item.school}</div>

        {item.description && (
          <div className="education-description">
            {item.description}
          </div>
        )}
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
        <div className="experience-header">
          <span className="experience-role">{item.role}</span>
          <span className="experience-dates">
            {item.startYear} - {item.isCurrent ? "Present" : item.endYear}
          </span>
        </div>

        <div className="experience-meta">
          <span className="experience-company">{item.company}</span>
          {item.location && (
            <span className="experience-location">• {item.location}</span>
          )}
        </div>

        {item.description && (
          <div className="experience-description">
            {item.description}
          </div>
        )}
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

      {state.experience.length > 0 && (
        <ExperiencePreview 
          experience={state.experience}
        />
      )}

      {state.education.length > 0 && (
        <EducationPreview 
          education={state.education}
        />
      )}

      {state.skills.length > 0 && (
        <SkillsPreview 
          skills={state.skills}
        />
      )}
    </div>
  );
}