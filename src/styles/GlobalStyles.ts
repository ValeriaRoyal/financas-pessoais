import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    /* Paleta de cores moderna */
    --primary-color: #6200ee;
    --primary-light: #9e47ff;
    --primary-dark: #0400ba;
    --secondary-color: #03dac6;
    --secondary-light: #66fff9;
    --secondary-dark: #00a896;
    
    /* Cores de texto e fundo */
    --text-color: #333333;
    --text-secondary: #757575;
    --background-color: #f5f7fa;
    --surface-color: #ffffff;
    
    /* Cores de feedback */
    --error-color: #b00020;
    --success-color: #00c853;
    --warning-color: #ff9800;
    --info-color: #2196f3;
    
    /* Elementos de UI */
    --border-radius: 12px;
    --border-radius-sm: 8px;
    --box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1);
    --box-shadow-hover: 0 10px 15px rgba(0, 0, 0, 0.07), 0 5px 8px rgba(0, 0, 0, 0.05);
    --transition-speed: 0.2s;
    
    /* Espaçamento */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    --spacing-xxl: 3rem;
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
    font-family: 'Inter', 'Roboto', 'Segoe UI', Arial, sans-serif;
    background-color: var(--background-color);
    color: var(--text-color);
    line-height: 1.6;
    overflow-x: hidden;
  }

  /* Foco visível para acessibilidade */
  :focus {
    outline: 3px solid var(--primary-light);
    outline-offset: 2px;
  }

  /* Mobile first - ajustes para telas maiores */
  @media (min-width: 768px) {
    html {
      font-size: 16px;
    }
  }
  
  @media (max-width: 320px) {
    html {
      font-size: 14px; /* Reduzir ligeiramente o tamanho da fonte base */
    }
    
    :root {
      --spacing-xs: 0.2rem;
      --spacing-sm: 0.4rem;
      --spacing-md: 0.75rem;
      --spacing-lg: 1.25rem;
      --spacing-xl: 1.5rem;
      --spacing-xxl: 2rem;
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

  /* Tipografia */
  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.3;
    margin-bottom: var(--spacing-md);
    color: var(--text-color);
  }
  
  h1 {
    font-size: 1.75rem;
    
    @media (min-width: 768px) {
      font-size: 2rem;
    }
  }
  
  h2 {
    font-size: 1.5rem;
    
    @media (min-width: 768px) {
      font-size: 1.75rem;
    }
  }
  
  h3 {
    font-size: 1.25rem;
    
    @media (min-width: 768px) {
      font-size: 1.5rem;
    }
  }
  
  p {
    margin-bottom: var(--spacing-md);
  }

  /* Estilos para botões acessíveis */
  button, 
  .button {
    cursor: pointer;
    padding: 0.75rem 1.5rem;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: var(--border-radius-sm);
    font-size: 1rem;
    font-weight: 500;
    transition: all var(--transition-speed) ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:hover {
      background-color: var(--primary-light);
      box-shadow: var(--box-shadow-hover);
      transform: translateY(-1px);
    }

    &:focus {
      outline: 3px solid var(--primary-light);
      outline-offset: 2px;
    }

    &:active {
      transform: translateY(1px);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
      background-color: #cccccc;
      transform: none;
      box-shadow: none;
    }
    
    &.secondary {
      background-color: var(--secondary-color);
      color: var(--text-color);
      
      &:hover {
        background-color: var(--secondary-light);
      }
    }
    
    &.text {
      background-color: transparent;
      color: var(--primary-color);
      box-shadow: none;
      
      &:hover {
        background-color: rgba(98, 0, 238, 0.05);
        box-shadow: none;
      }
    }
    
    &.outlined {
      background-color: transparent;
      color: var(--primary-color);
      border: 1px solid var(--primary-color);
      box-shadow: none;
      
      &:hover {
        background-color: rgba(98, 0, 238, 0.05);
      }
    }
  }

  /* Estilos para formulários acessíveis */
  input, 
  select, 
  textarea {
    width: 100%;
    padding: 0.75rem 1rem;
    margin-bottom: 1rem;
    border: 1px solid #e0e0e0;
    border-radius: var(--border-radius-sm);
    font-size: 1rem;
    transition: border-color var(--transition-speed) ease, box-shadow var(--transition-speed) ease;

    &:focus {
      border-color: var(--primary-color);
      box-shadow: 0 0 0 3px rgba(98, 0, 238, 0.15);
    }
    
    &:hover:not(:focus) {
      border-color: #bdbdbd;
    }
    
    &::placeholder {
      color: #9e9e9e;
    }
    
    &:disabled {
      background-color: #f5f5f5;
      cursor: not-allowed;
    }
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: var(--text-color);
  }
  
  /* Cards modernos */
  .card {
    background-color: var(--surface-color);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    padding: var(--spacing-lg);
    transition: box-shadow var(--transition-speed) ease, transform var(--transition-speed) ease;
    
    &:hover {
      box-shadow: var(--box-shadow-hover);
    }
  }
  
  /* Links estilizados */
  a {
    color: var(--primary-color);
    text-decoration: none;
    transition: color var(--transition-speed) ease;
    
    &:hover {
      color: var(--primary-light);
      text-decoration: underline;
    }
    
    &:focus {
      outline: 3px solid var(--primary-light);
      outline-offset: 2px;
    }
  }
  
  /* Badges */
  .badge {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    border-radius: 1rem;
    font-size: 0.75rem;
    font-weight: 500;
    background-color: var(--primary-color);
    color: white;
  }
  
  /* Alertas */
  .alert {
    padding: var(--spacing-md);
    border-radius: var(--border-radius-sm);
    margin-bottom: var(--spacing-md);
    
    &.alert-error {
      background-color: rgba(176, 0, 32, 0.1);
      color: var(--error-color);
      border-left: 4px solid var(--error-color);
    }
    
    &.alert-success {
      background-color: rgba(0, 200, 83, 0.1);
      color: var(--success-color);
      border-left: 4px solid var(--success-color);
    }
    
    &.alert-warning {
      background-color: rgba(255, 152, 0, 0.1);
      color: var(--warning-color);
      border-left: 4px solid var(--warning-color);
    }
    
    &.alert-info {
      background-color: rgba(33, 150, 243, 0.1);
      color: var(--info-color);
      border-left: 4px solid var(--info-color);
    }
  }
`;

export default GlobalStyles;
