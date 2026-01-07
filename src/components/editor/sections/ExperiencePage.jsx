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
  });
  const [errors, setErrors] = useState({});

  function validate(form) {
    const errs = {};

    const start = Number(form.startYear);
    const end = form.endYear ? Number(form.endYear) : null;

    if (!form.isCurrent && start > end) {
      errs.endYear = "End year cannot be before start year";
    }

    return errs;
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setForm(form => ({ ...form, [name]: value }));

    setErrors(form => ({
      ...form,
      [name]: undefined
    }));
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

    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

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
      <label>Company</label>
      <input 
        name="company" 
        placeholder="Enter Company..."
        value={form.company}
        onChange={handleChange}
        required
      />
      {errors.company && (
        <div className="field-error">{errors.company}</div>
      )}

      <label>Job title</label>
      <input 
        name="role" 
        placeholder="Enter Role / Job title..."
        value={form.role} 
        onChange={handleChange}
        required
      />
      {errors.role && (
        <div className="field-error">{errors.role}</div>
      )}

      <label>Location</label>
      <input 
        name="location" 
        placeholder="Enter Location (optional)..."
        value={form.location} 
        onChange={handleChange}
      />
      {errors.location && (
        <div className="field-error">{errors.location}</div>
      )}

      <label>Start year</label>
      <div className="date-row">
        <input 
          type="number" 
          name="startYear" 
          placeholder="YYYY"
          value={form.startYear} 
          onChange={handleChange}
          min="1900"
          max={new Date().getFullYear()}
          required
        />
        {errors.startYear && (
          <div className="field-error">{errors.startYear}</div>
        )}

        {!form.isCurrent && (
          <label>End year
            <input 
              type="number" 
              name="endYear"
              placeholder="YYYY"
              value={form.endYear}
              onChange={handleChange}
              min="1900"
              max={new Date().getFullYear()}
              required
            />
            {errors.endYear && (
              <div className="field-error">{errors.endYear}</div>
            )}
          </label>
        )}
      </div>
      
      <label>Currently working here?
        <input 
          type="checkbox"
          name="isCurrent"
          checked={form.isCurrent}
          onChange={handleCheckbox}
        />
      </label>
      
      <label>Key responsibilities and achievements</label><br />
      <textarea 
        name="description"
        placeholder="Enter key responsibilities and achievements..."
        rows={4}
        value={form.description}
        onChange={handleChange}
      /><br />
      {errors.description && (
        <div className="field-error">{errors.description}</div>
      )}

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