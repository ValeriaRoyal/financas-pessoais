import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Importação condicional do axe-core para acessibilidade em desenvolvimento
if (process.env.NODE_ENV !== 'production' && process.env.REACT_APP_ENABLE_AXE === 'true') {
  const axe = require('@axe-core/react');
  axe(React, ReactDOM, 1000);
  console.log('Axe-core para testes de acessibilidade está ativo');
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Medir performance
reportWebVitals();
