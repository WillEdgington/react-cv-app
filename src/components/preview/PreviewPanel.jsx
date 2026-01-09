import CVPreview from "./CVPreview.jsx";

export default function PreviewPanel({ buttonLabel, onButtonClick }) {
  const editorHidden = buttonLabel === "Show Editor";

  function handlePrint() {
    window.print();
  }

  return (
    <div className="cv-panel">
      <div className="toolbar">
        <button onClick={onButtonClick}>{buttonLabel}</button>
      </div>

      <div
        className={`cv-preview-wrapper ${
          editorHidden ? "full-preview" : ""
        }`}
      >
        <CVPreview />
      </div>

      <button
        className="print-button" 
        onClick={handlePrint}
      >
        Export PDF
      </button>
    </div>
  );
}