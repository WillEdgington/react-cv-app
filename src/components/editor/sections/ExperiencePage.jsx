import { useCV } from "../../../CVContext.jsx";
import { useState } from "react";

function ExperienceList({ experience, onDelete, onMove }) {
  function experienceBox(item, idx) {
    return (
      <div key={item.id} className="experience-box">
        <div className="experience-summary">
          <strong>{item.role}</strong>
          <div>{item.company} {item.location && `- ${item.location}`}</div>
          <div>{item.startYear} {item.isCurrent ? `- Current` : `- ${item.endYear}`}</div>
        </div>

        <div className="experience-actions">
          <button disabled={idx === 0} onClick={() => onMove(idx, -1)}>Up</button>
          <button disabled={idx === experience.length - 1} onClick={() => onMove(idx, 1)}>Down</button>
          <button onClick={() => onDelete(item.id)}>Delete</button>
        </div>
      </div>
    );
  }

  return (
    <div className="experience-list">
      {experience.map((item, idx) => experienceBox(item, idx))}
    </div>
  );
}

function ExperienceForm({ onAdd }) {
  const [form, setForm] = useState({
    company: "",
    role: "",
    location: "",
    startYear: "",
    endYear: "",
    isCurrent: false,
    description: ""
  })

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function handleCheckbox(e) {
    const { name, checked } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: checked,
      ...(checked && { endYear: "" })
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const start = Number(form.startYear);
    const end = form.endYear ? Number(form.endYear) : null;

    if (end !== null && start > end) {
      alert("Start year cannot be after end year");
      return;
    }

    onAdd({
      id: crypto.randomUUID(),
      ...form
    });

    setForm({
      company: "",
      role: "",
      location: "",
      startYear: "",
      endYear: "",
      isCurrent: false,
      description: ""
    });
  }

  return (
    <form onSubmit={handleSubmit} className="experience-form">
      <input 
        name="company" 
        placeholder="Company"
        value={form.company}
        onChange={handleChange}
        required 
      />

      <input 
        name="role" 
        placeholder="Role / Job title"
        value={form.role} 
        onChange={handleChange}
        required 
      />

      <input 
        name="location" 
        placeholder="Location (optional)"
        value={form.location} 
        onChange={handleChange}
      />

      <div className="date-row">
        <input 
          type="number" 
          name="startYear" 
          placeholder="Start year"
          value={form.startYear} 
          onChange={handleChange}
          min="1900"
          max={new Date().getFullYear()}
          required
        />

        {!form.isCurrent && (
          <input 
            type="number" 
            name="endYear"
            placeholder="End year"
            value={form.endYear}
            onChange={handleChange}
            min="1900"
            max={new Date().getFullYear()}
          />
        )}
      </div>
      
      <label>
        <input 
          type="checkbox"
          name="isCurrent"
          checked={form.isCurrent}
          onChange={handleCheckbox}
        />
        Currently working here?
      </label><br/>

      <textarea 
        name="description"
        placeholder="Key responsibilities and achievements"
        rows={4}
        value={form.description}
        onChange={handleChange}
      />

      <button type="submit">Add experience</button>
    </form>
  );
}

export default function ExperiencePage() {
  const { state, updateSection } = useCV();
  const experience = state.experience;

  function addExperience(entry) {
    updateSection("experience", [...experience, entry]);
  }

  function deleteExperience(id) {
    updateSection(
      "experience",
      experience.filter(experience => experience.id !== id)
    );
  }

  function moveExperience(idx, direction) {
    const target = idx + direction;
    if (target < 0 || target >= experience.length) return;

    const newOrder = [...experience];
    [newOrder[idx], newOrder[target]] = [newOrder[target], newOrder[idx]];
    updateSection("experience", newOrder);
  }

  return (
    <div className="section">
      <h2>Experience Information</h2>
      <ExperienceList 
        experience={experience}
        onDelete={deleteExperience}
        onMove={moveExperience}
      />

      <ExperienceForm 
        onAdd={addExperience}
      />
    </div>
  );
}