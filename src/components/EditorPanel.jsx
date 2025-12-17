import PersonalForm from "./PersonalForm.jsx";

export default function EditorPanel({ onHide }) {
  return (
    <div>
      <div className="toolbar">
        <button onClick={onHide}>Hide Editor</button>
      </div>

      <PersonalForm />
    </div>
  );
}