import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import keycloak from './keycloak';

keycloak
  .init({ onLoad: 'login-required', checkLoginIframe: false })
  .then(() => {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error("Erreur d'initialisation Keycloak", err);
  });

reportWebVitals();
