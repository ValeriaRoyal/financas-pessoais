import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
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
  }
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: var(--background);
    color: var(--textPrimary);
    line-height: 1.5;
    transition: background-color var(--transition-normal), color var(--transition-normal);
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
  }
  
  /* Melhorias para acessibilidade de foco */
  :focus {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
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
  }
  
  @media (max-width: 320px) {
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
  
  /* Suporte para preferências de movimento reduzido */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  
  /* Estilos específicos para tema escuro */
  .dark-theme {
    --box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    --box-shadow-hover: 0 4px 12px rgba(0, 0, 0, 0.4);
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
