export default function Toolbar({ active, onSelect, onButtonClick, buttonLabel }) {
  return (
    <div className="toolbar">
      <button onClick={() => onSelect("personal")}>Personal</button>
      <button onClick={() => onSelect("experience")}>Experience</button>
      <button onClick={() => onSelect("education")}>Education</button>
      <button onClick={() => onSelect("skills")}>Skills</button>
      
      <div className="hide-editor">
        <button onClick={onButtonClick}>{buttonLabel}</button>
      </div>
    </div>
  );
}