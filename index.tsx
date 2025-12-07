
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Enregistrement du Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // On retire { scope: '/' } qui peut causer des erreurs si le fichier est dans /public/
    // On laisse le navigateur gérer la portée par défaut ou via le header Service-Worker-Allowed
    navigator.serviceWorker.register('/public/service-worker.js')
      .then(registration => {
        console.log('SW enregistré:', registration.scope);
      }).catch(err => {
        console.log('SW échec:', err);
      });
  });
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
