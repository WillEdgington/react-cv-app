import { useCV } from "../../../CVContext.jsx";

export default function PersonalPage() {
  const { state, updateSection } = useCV();
  const personal = state.personal;

  const handleChange = (e) => {
    updateSection("personal", {
      ...personal,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="section">
      <h2>Personal Information</h2>

      <label>Full Name</label>
      <input className="input-medium" name="name" value={personal.name} onChange={handleChange} />
      
      <label>Email</label>
      <input className="input-medium" name="email" value={personal.email} onChange={handleChange} />

      <label>Phone</label>
      <input className="input-medium" name="phone" value={personal.phone} onChange={handleChange} />

      <label>Location</label>
      <input className="input-medium" name="location" value={personal.location} onChange={handleChange} />

      <label>LinkedIn</label>
      <input className="input-medium" name="linkedin" value={personal.linkedin} onChange={handleChange} />

      <label>GitHub</label>
      <input className="input-medium" name="github" value={personal.github} onChange={handleChange} />

      <label>Summary</label>
      <textarea
        name="summary"
        rows={4}
        value={personal.summary}
        onChange={handleChange}
      />
    </div>
  );
}