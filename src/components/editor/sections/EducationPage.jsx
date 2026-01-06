import { useCV } from "../../../CVContext.jsx";
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
          <button onClick={() => onDelete(item.id)}>Delete</button>
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
    endYear: null,
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
      school: "",
      qualification: "",
      startYear: "",
      endYear: "",
      description: ""
    });
  }

  return (
    <form onSubmit={handleSubmit} className="education-form">
      <label>Institution</label><br/>
      <input 
        name="school"
        placeholder="Institution"
        value={form.school}
        onChange={handleChange}
        required
      />

      <label>Qualification</label><br/>
      <input 
        name="qualification"
        placeholder="Qualification"
        value={form.qualification}
        onChange={handleChange}
        required
      />

      <label>Start year</label><br/>
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

      <label>End year</label><br/>
      <input
        type="number"
        name="endYear"
        placeholder="End year"
        value={form.endYear}
        onChange={handleChange}
        min="1900"
        max={new Date().getFullYear() + 10}
      />

      <label>Description</label><br/>
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
      <h2>Education Information</h2>
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