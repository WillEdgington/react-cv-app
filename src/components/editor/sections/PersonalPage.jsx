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
      <input name="name" value={personal.name} onChange={handleChange} />
      
      <label>Email</label>
      <input name="email" value={personal.email} onChange={handleChange} />

      <label>Phone</label>
      <input name="phone" value={personal.phone} onChange={handleChange} />

      <label>Location</label>
      <input name="location" value={personal.location} onChange={handleChange} />
    </div>
  );
}