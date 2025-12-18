import CVPreview from "./CVPreview.jsx";

export default function PreviewPanel({ buttonLabel, onButtonClick }) {
  return (
    <div className="panel">
      <div className="toolbar">
        <button onClick={onButtonClick}>{buttonLabel}</button>
      </div>

      <CVPreview />
    </div>
  );
}