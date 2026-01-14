export default function Toolbar({ active, onSelect, onButtonClick, buttonLabel }) {
  return (
    // <div className="toolbar">
    //   <button onClick={() => onSelect("personal")}>Personal</button>
    //   <button onClick={() => onSelect("experience")}>Experience</button>
    //   <button onClick={() => onSelect("education")}>Education</button>
    //   <button onClick={() => onSelect("skills")}>Skills</button>
      
    //   <div className="hide-editor">
    //     <button onClick={onButtonClick}>{buttonLabel}</button>
    //   </div>
    // </div>
    <div className="toolbar">
      <div className="toolbar-left">
        <button
          className={active === "personal" ? "active": ""}
          onClick={() => onSelect("personal")}
        >
          Personal
        </button>
        <button
          className={active === "experience" ? "active": ""}
          onClick={() => onSelect("experience")}
        >
          Experience
        </button>
        <button
          className={active === "education" ? "active": ""}
          onClick={() => onSelect("education")}
        >
          Education
        </button>
        <button
          className={active === "skills" ? "active": ""}
          onClick={() => onSelect("skills")}
        >
          Skills
        </button>
      </div>

      <div className="toolbar-right">
        <button className="panel-toggle" onClick={onButtonClick}>
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}