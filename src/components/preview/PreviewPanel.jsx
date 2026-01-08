import CVPreview from "./CVPreview.jsx";

export default function PreviewPanel({ buttonLabel, onButtonClick }) {
  const editorHidden = buttonLabel === "Show Editor";
  return (
    <div className="cv-panel">
      <div className="toolbar">
        <button onClick={onButtonClick}>{buttonLabel}</button>

        <button onClick={() => window.print()}>Export PDF</button>
      </div>

      <div className={`cv-preview-wrapper ${
        editorHidden ? "full-preview" : ""
      }`}
      >
        <CVPreview />
      </div>
    </div>
  );
}