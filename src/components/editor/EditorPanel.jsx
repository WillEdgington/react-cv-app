import { useState } from "react";
import Toolbar from "./Toolbar.jsx";

import PersonalPage from "./sections/PersonalPage.jsx";
import SkillsPage from "./sections/SkillsPage.jsx";
import EducationPage from "./sections/EducationPage.jsx";
import ExperiencePage from "./sections/ExperiencePage.jsx";

export default function EditorPanel({ buttonLabel, onButtonClick }) {
  const [active, setActive] = useState("personal");

  const renderSection = () => {
    switch (active) {
      case "personal": return <PersonalPage />;
      case "experience": return <ExperiencePage />;
      case "education": return <EducationPage />;
      case "skills": return <SkillsPage />;
      default: return null;
    }
  };

  return (
    <div className="editor-panel">
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