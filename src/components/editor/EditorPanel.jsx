import { useState } from "react";
import PersonalForm from "./sections/PersonalForm.jsx";
import Toolbar from "./Toolbar.jsx";

export default function EditorPanel({ buttonLabel, onButtonClick }) {
  const [active, setActive] = useState("personal");

  const renderSection = () => {
    switch (active) {
      case "personal": return <PersonalForm />;
      case "experience": return null;
      case "education": return null;
      case "skills": return null;
      default: return null;
    }
  };

  return (
    <div className="panel">
      <Toolbar
        active={active}
        onSelect={setActive}
        buttonLabel={buttonLabel}
        onButtonClick={onButtonClick}
      />

      {renderSection()}
    </div>
  );
}