import CVPreview from "./CVPreview.jsx";

export default function PreviewPanel({ onHide }) {
  return (
    <div>
      <div className="toolbar">
        <button onClick={onHide}>Hide Preview</button>
      </div>

      <CVPreview />
    </div>
  );
}