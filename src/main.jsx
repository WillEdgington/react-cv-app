import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { CVProvider } from './CVContext.jsx';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CVProvider>
      <App />
    </CVProvider>
  </StrictMode>
)