import { useState } from 'react';
import EditorPanel from "./components/EditorPanel.jsx";
import PreviewPanel from "./components/PreviewPanel.jsx";
import "./styles.css";

function App() {
  const [visiblePanels, setVisiblePanels] = useState("both");

  function togglePanels(target) {
    setVisiblePanels((current) => {
      if (current === "both") {
        return target === "editor" ? "preview" : "editor";
      }

      return "both"
    });
  }

  const showEditor = visiblePanels === "both" || visiblePanels === "editor";
  const showPreview = visiblePanels === "both" || visiblePanels === "preview";

  return (
    <div className="app-container">
      {showEditor && (
        <EditorPanel 
          buttonLabel={showPreview ? "Hide Editor" : "Show Preview"}
          onButtonClick={() => togglePanels("editor")}
        />
      )}
 
      {showPreview && (
        <PreviewPanel 
          buttonLabel={showEditor ? "Hide Preview" : "Show Editor"}
          onButtonClick={() => togglePanels("preview")}
        />
      )}
    </div>
  );
}

export default App;
