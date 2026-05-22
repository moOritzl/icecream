import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SurveyProvider } from './SurveyContext.jsx';
import App from './App.jsx';
import './styles/tokens.css';
import './styles/app.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <SurveyProvider>
        <App />
      </SurveyProvider>
    </BrowserRouter>
  </StrictMode>
);
