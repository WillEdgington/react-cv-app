import { useCV } from "../../../CVContext.jsx";
import { useState } from "react";

function SkillsList({ skills, onDelete, onMove }) {
  function skillsBox(skill, idx) {
    return (
      <div key={skill.id} className="skill-box">
      <strong>{skill.name}</strong>

        <div className="skill-actions">
          <button disabled={idx === 0} onClick={() => onMove(idx, -1)}>Up</button>
          <button disabled={idx === skills.length - 1} onClick={() => onMove(idx, 1)}>Down</button>
          <button onClick={() => onDelete(skill.id)}>Delete</button>
        </div>
      </div>
    );
  }
  return (
    <div className="skills-list">
      {skills.map((skill, idx) => skillsBox(skill, idx))}
    </div>
  );
}

function SkillsForm({ onAdd }) {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    
    onAdd({ 
      id: crypto.randomUUID(),
      name
    });

    setName("");
  }

  return (
    <form onSubmit={handleSubmit} className="skills-form">
      <input
        placeholder="Skill"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button type="submit">Add Skill</button>
    </form>
  );
}

export default function SkillsPage() {
  const { state, updateSection } = useCV();
  const skills = state.skills;
  
  function addSkill(skill) {
    updateSection("skills", [...skills, skill]);
  }

  function deleteSkill(id) {
    updateSection(
      "skills",
      skills.filter(skill => skill.id !== id)
    );
  }

  function moveSkill(idx, direction) {
    const target = idx + direction;
    if (target < 0 || target >= skills.length) return;

    const newOrder = [...skills];
    [newOrder[idx], newOrder[target]] = [newOrder[target], newOrder[idx]];
    updateSection("skills", newOrder);
  }

  return (
    <div className="section">
      <SkillsList
        skills={skills}
        onDelete={deleteSkill}
        onMove={moveSkill} 
      />

      <SkillsForm onAdd={addSkill} />
    </div>
  );
}