import { useCV } from "../../../CVContext.jsx"
import { useState } from "react";

function EducationList({ education, onDelete, onMove }) {
  function educationBox(item, idx) {
    return (
      <div key={item.id} className="education-box">
        <div className="education-summary">
          <strong>{item.qualification}</strong>
          <div>{item.school}</div>
          <div>{item.startYear} {item.endYear && `- ${item.endYear}`}</div>
        </div>

        <div className="education-actions">
          <button disabled={idx === 0} onClick={() => onMove(idx, -1)}>Up</button>
          <button disabled={idx === education.length - 1} onClick={() => onMove(idx, 1)}>Down</button>
          <button onClick={() => onDelete(education.id)}>Delete</button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="education-list">
      {education.map((item, idx) => educationBox(item, idx))}
    </div>
  );
}

function EducationForm({ onAdd }) {
  const [form, setForm] = useState({
    school: "",
    qualification: "",
    startYear: "",
    endYear: "",
    description: ""
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAdd({
      id: crypto.randomUUID(),
      ...form
    });

    setForm({
      school: "",
      qualification: "",
      startYear: "",
      endYear: "",
      description: ""
    });
  }

  return (
    <form onSubmit={handleSubmit} className="education-form">
      <input 
        name="school"
        placeholder="Institution"
        value={form.school}
        onChange={handleChange}
        required
      />

      <input 
        name="qualification"
        placeholder="Qualification"
        value={form.qualification}
        onChange={handleChange}
        required
      />

      <input 
        name="startYear"
        placeholder="Start year"
        value={form.startYear}
        onChange={handleChange}
        required
      />

      <input
        name="endYear"
        placeholder="End year"
        value={form.endYear}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description (optional)"
        value={form.description}
        onChange={handleChange}
      />

      <button type="submit">Add education</button>
    </form>
  );
}

export default function EducationPage() {
  const { state, updateSection } = useCV();
  const education = state.education;

  function addEducation(entry) {
    updateSection("education", [...education, entry]);
  }

  function deleteEducation(id) {
    updateSection(
      "education",
      education.filter(education => education.id !== id)
    );
  }

  function moveEducation(idx, direction) {
    const target = idx + direction;
    if (target < 0 || target >= education.length) return;

    const newOrder = [...education];
    [newOrder[idx], newOrder[target]] = [newOrder[target], newOrder[idx]];
    updateSection("education", newOrder);
  }

  return (
    <div className="section">
      <EducationList 
        education={education}
        onDelete={deleteEducation}
        onMove={moveEducation}       
      />

      <EducationForm 
        onAdd={addEducation}
      />
    </div>
  );
}