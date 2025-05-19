import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: #2e7d32;
    --secondary-color: #4caf50;
    --text-color: #333;
    --background-color: #f5f5f5;
    --error-color: #d32f2f;
    --success-color: #388e3c;
    --border-radius: 8px;
    --box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Roboto', 'Segoe UI', Arial, sans-serif;
    background-color: var(--background-color);
    color: var(--text-color);
    line-height: 1.6;
  }

  /* Foco visível para acessibilidade */
  :focus {
    outline: 3px solid var(--primary-color);
    outline-offset: 2px;
  }

  /* Mobile first - ajustes para telas maiores */
  @media (min-width: 768px) {
    html {
      font-size: 18px;
    }
  }

  /* Esconder elementos visualmente, mas mantê-los acessíveis para leitores de tela */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  /* Estilos para botões acessíveis */
  button, 
  .button {
    cursor: pointer;
    padding: 0.75rem 1.5rem;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: var(--border-radius);
    font-size: 1rem;
    font-weight: 500;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: var(--secondary-color);
    }

    &:focus {
      outline: 3px solid var(--primary-color);
      outline-offset: 2px;
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }

  /* Estilos para formulários acessíveis */
  input, 
  select, 
  textarea {
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: var(--border-radius);
    font-size: 1rem;

    &:focus {
      border-color: var(--primary-color);
    }
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
`;

export default GlobalStyles;
