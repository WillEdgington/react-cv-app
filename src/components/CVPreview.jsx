import { useCV } from "../CVContext.jsx";

export default function CVPreview() {
  const { state } = useCV();
  const p = state.personal;

  return (
    <div className="section">
      <h1>{p.name}</h1>
      <p>{p.email}</p>
      <p>{p.phone}</p>
      <p>{p.location}</p>
    </div>
  );
}