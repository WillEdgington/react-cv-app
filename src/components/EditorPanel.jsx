import PersonalForm from "./PersonalForm.jsx";

export default function EditorPanel({ buttonLabel, onButtonClick }) {
  return (
    <div className="panel">
      <div className="toolbar">
        <button onClick={onButtonClick}>{buttonLabel}</button>
      </div>

      <PersonalForm />
    </div>
  );
}