import { useState } from 'react';
import EditorPanel from "./components/EditorPanel.jsx";
import PreviewPanel from "./components/PreviewPanel.jsx";
// import "./App.css";
import "./styles.css";

function App() {
  const [showEditor, setShowEditor] = useState(true);
  const [showPreview, setShowPreview] = useState(true);

  const editorHidden = !showEditor && showPreview;
  const previewHidden = !showPreview && showEditor;

  return (
    <div className="app-container">
      {showEditor && (
        <div className={`panel editor-panel ${previewHidden ? "full" : ""}`}>
          <EditorPanel onHide={() => setShowEditor(false)} onShowPreview={() => setShowPreview(true)} />
        </div>
      )}
 
      {showPreview && (
        <div className={`panel preview-panel ${editorHidden ? "full" : ""}`}>
          <PreviewPanel onHide={() => setShowPreview(false)} onShowEditor={() => setShowEditor(true)} />
        </div>
      )}
    </div>
  );
}

export default App;
