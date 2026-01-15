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
          <button className="action-button" disabled={idx === 0} onClick={() => onMove(idx, -1)}>Up</button>
          <button className="action-button" disabled={idx === education.length - 1} onClick={() => onMove(idx, 1)}>Down</button>
          <button className="delete-button" onClick={() => onDelete(item.id)}>Delete</button>
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
  const [errors, setErrors] = useState({});

  function validate(form) {
    const errs = {};

    const start = Number(form.startYear);
    const end = form.endYear ? Number(form.endYear) : null;

    if (end !== null && start > end) {
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
      school: "",
      qualification: "",
      startYear: "",
      endYear: "",
      description: ""
    });
  }

  return (
    <form onSubmit={handleSubmit} className="education-form">
      <label>Institution</label>
      <input
        className="input-medium"
        name="school"
        placeholder="Enter Institution..."
        value={form.school}
        onChange={handleChange}
        required
      />
      {errors.school && (
        <div className="field-error">{errors.school}</div>
      )}

      <label>Qualification</label>
      <input
        className="input-medium"
        name="qualification"
        placeholder="Enter Qualification..."
        value={form.qualification}
        onChange={handleChange}
        required
      />
      {errors.qualification && (
        <div className="field-error">{errors.qualification}</div>
      )}

      <div className="date-row">
        <label>Start year
          <input
            className="input-small"
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
        </label>

        <label>End year
          <input
            className="input-small"
            type="number"
            name="endYear"
            placeholder="YYYY"
            value={form.endYear}
            onChange={handleChange}
            min="1900"
            max={new Date().getFullYear() + 10}
            required
          />
          {errors.endYear && (
            <div className="field-error">{errors.endYear}</div>
          )}
        </label>
      </div>

      <label>Description</label>
      <textarea
        name="description"
        placeholder="Enter Description (optional)..."
        rows={4}
        value={form.description}
        onChange={handleChange}
      />
      {errors.description && (
        <div className="field-error">{errors.description}</div>
      )}

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