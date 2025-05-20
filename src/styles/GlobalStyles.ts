import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    /* Tamanhos de fonte */
    --font-size-xs: 0.75rem;    /* 12px */
    --font-size-sm: 0.875rem;   /* 14px */
    --font-size-md: 1rem;       /* 16px */
    --font-size-lg: 1.125rem;   /* 18px */
    --font-size-xl: 1.25rem;    /* 20px */
    --font-size-xxl: 1.5rem;    /* 24px */
    
    /* Espaçamentos */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    --spacing-xxl: 3rem;
    
    /* Bordas e sombras */
    --border-radius: 8px;
    --border-radius-sm: 4px;
    --border-radius-lg: 12px;
    
    --box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    --box-shadow-hover: 0 4px 12px rgba(0, 0, 0, 0.15);
    
    /* Transições */
    --transition-fast: 0.2s ease;
    --transition-normal: 0.3s ease;
    --transition-slow: 0.5s ease;
    
    /* Larguras máximas */
    --max-width-container: 1200px;
    --max-width-content: 900px;
  }
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html {
    font-size: 16px; /* Base font size */
    -webkit-text-size-adjust: 100%; /* Prevent font scaling in landscape */
  }
  
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: var(--background);
    color: var(--textPrimary);
    line-height: 1.5;
    transition: background-color var(--transition-normal), color var(--transition-normal);
    font-size: var(--font-size-md);
    overflow-x: hidden; /* Prevent horizontal scrolling */
    width: 100%;
    max-width: 100vw;
  }
  
  h1, h2, h3, h4, h5, h6 {
    line-height: 1.2;
    margin-bottom: 0.5em;
  }
  
  h1 { font-size: var(--font-size-xxl); }
  h2 { font-size: var(--font-size-xl); }
  h3 { font-size: var(--font-size-lg); }
  
  p {
    margin-bottom: 1rem;
  }
  
  a {
    color: var(--primary);
    text-decoration: none;
    transition: color var(--transition-fast);
    
    &:hover {
      color: var(--primaryDark);
    }
  }
  
  button {
    cursor: pointer;
    font-family: inherit;
    font-size: inherit;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
  
  /* Melhorias para acessibilidade de foco */
  :focus {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
  }
  
  /* Container principal com largura máxima */
  .container {
    width: 100%;
    max-width: var(--max-width-container);
    margin: 0 auto;
    padding: 0 var(--spacing-md);
  }
  
  /* Melhorias para dispositivos móveis */
  @media (max-width: 768px) {
    html {
      font-size: 15px;
    }
    
    :root {
      --spacing-md: 0.75rem;
      --spacing-lg: 1.25rem;
      --spacing-xl: 1.75rem;
    }
    
    h1 { font-size: 1.35rem; }
    h2 { font-size: 1.2rem; }
    h3 { font-size: 1.1rem; }
  }
  
  @media (max-width: 480px) {
    html {
      font-size: 14px;
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
  
  /* Ajustes específicos para telas muito pequenas */
  @media (max-width: 320px) {
    html {
      font-size: 13px;
    }
    
    h1 { font-size: 1.25rem; }
    h2 { font-size: 1.15rem; }
    h3 { font-size: 1.05rem; }
  }
  
  /* Suporte para preferências de movimento reduzido */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  
  /* Melhorias de contraste para tema escuro */
  .dark-theme {
    --box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    --box-shadow-hover: 0 4px 12px rgba(0, 0, 0, 0.4);
  }
  
  /* Melhorias específicas para legibilidade no tema escuro */
  .dark-theme p, .dark-theme label, .dark-theme span {
    font-weight: 400;
    letter-spacing: 0.01em;
  }
  
  /* Tema de alto contraste */
  .high-contrast-theme {
    --box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
    --box-shadow-hover: 0 4px 12px rgba(0, 0, 0, 0.7);
  }
  
  /* Transições suaves para mudanças de tema */
  .theme-transition * {
    transition: background-color var(--transition-normal), 
                color var(--transition-normal), 
                border-color var(--transition-normal), 
                box-shadow var(--transition-normal);
  }
  
  /* Animações para elementos da página */
  .page-enter {
    opacity: 0;
    transform: translateY(10px);
  }
  
  .page-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 300ms, transform 300ms;
  }
`;

export default GlobalStyles;
