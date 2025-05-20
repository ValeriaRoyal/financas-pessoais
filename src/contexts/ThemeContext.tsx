import React, { createContext, useState, useEffect, useContext } from 'react';

// Definição dos temas
export const lightTheme = {
  name: 'light',
  colors: {
    background: '#f5f7fa',
    surface: '#ffffff',
    primary: '#6200ee',
    primaryLight: '#9e47ff',
    primaryDark: '#4b01d0',
    secondary: '#03dac6',
    textPrimary: '#333333',
    textSecondary: '#757575',
    error: '#b00020',
    success: '#4caf50',
    warning: '#ff9800',
    info: '#2196f3',
    border: '#e0e0e0'
  }
};

export const darkTheme = {
  name: 'dark',
  colors: {
    background: '#121212',
    surface: '#1e1e1e',
    primary: '#bb86fc',
    primaryLight: '#d4a4ff',
    primaryDark: '#9a67ea',
    secondary: '#03dac6',
    textPrimary: '#ffffff',
    textSecondary: '#e0e0e0', // Aumentado o contraste de #cccccc para #e0e0e0
    error: '#cf6679',
    success: '#81c784',
    warning: '#ffb74d',
    info: '#64b5f6',
    border: '#333333'
  }
};

export const highContrastTheme = {
  name: 'high-contrast',
  colors: {
    background: '#000000',
    surface: '#121212',
    primary: '#ffff00',
    primaryLight: '#ffffaa',
    primaryDark: '#cccc00',
    secondary: '#00ffff',
    textPrimary: '#ffffff',
    textSecondary: '#eeeeee',
    error: '#ff6666',
    success: '#66ff66',
    warning: '#ffbb66',
    info: '#66bbff',
    border: '#ffffff'
  }
};

export type Theme = typeof lightTheme;
export type ThemeName = 'light' | 'dark' | 'high-contrast' | 'system';

type ThemeContextType = {
  theme: Theme;
  themeName: ThemeName;
  toggleTheme: () => void;
  setTheme: (theme: ThemeName) => void;
  isTransitioning: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Verificar preferência do usuário ou tema salvo
  const getInitialTheme = (): { theme: Theme; name: ThemeName } => {
    const savedTheme = localStorage.getItem('theme') as ThemeName | null;
    
    if (savedTheme === 'dark') return { theme: darkTheme, name: 'dark' };
    if (savedTheme === 'high-contrast') return { theme: highContrastTheme, name: 'high-contrast' };
    if (savedTheme === 'system' || !savedTheme) {
      // Verificar preferência do sistema
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return { theme: darkTheme, name: 'system' };
      }
      return { theme: lightTheme, name: 'system' };
    }
    
    return { theme: lightTheme, name: 'light' };
  };
  
  const [themeState, setThemeState] = useState(getInitialTheme);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Monitorar mudanças na preferência do sistema
  useEffect(() => {
    if (themeState.name === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = (e: MediaQueryListEvent) => {
        setThemeState({
          theme: e.matches ? darkTheme : lightTheme,
          name: 'system'
        });
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [themeState.name]);
  
  // Alternar entre temas
  const toggleTheme = () => {
    setIsTransitioning(true);
    
    setThemeState(prevState => {
      let newTheme: Theme;
      let newName: ThemeName;
      
      if (prevState.theme.name === 'light') {
        newTheme = darkTheme;
        newName = 'dark';
      } else if (prevState.theme.name === 'dark') {
        newTheme = lightTheme;
        newName = 'light';
      } else {
        newTheme = lightTheme;
        newName = 'light';
      }
      
      localStorage.setItem('theme', newName);
      return { theme: newTheme, name: newName };
    });
    
    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };
  
  // Definir tema específico
  const setTheme = (themeName: ThemeName) => {
    setIsTransitioning(true);
    
    let newTheme: Theme;
    
    switch (themeName) {
      case 'dark':
        newTheme = darkTheme;
        break;
      case 'high-contrast':
        newTheme = highContrastTheme;
        break;
      case 'system':
        newTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
          ? darkTheme
          : lightTheme;
        break;
      default:
        newTheme = lightTheme;
    }
    
    localStorage.setItem('theme', themeName);
    setThemeState({ theme: newTheme, name: themeName });
    
    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };
  
  // Aplicar variáveis CSS com base no tema atual
  useEffect(() => {
    const root = document.documentElement;
    
    // Adicionar classe de transição antes de mudar as cores
    if (isTransitioning) {
      root.classList.add('theme-transition');
    }
    
    Object.entries(themeState.theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
    
    // Adicionar classe ao body para estilos específicos
    document.body.className = themeState.theme.name === 'dark' 
      ? 'dark-theme' 
      : themeState.theme.name === 'high-contrast'
        ? 'high-contrast-theme'
        : 'light-theme';
    
    // Remover classe de transição após a animação
    const transitionTimeout = setTimeout(() => {
      root.classList.remove('theme-transition');
    }, 300);
    
    return () => clearTimeout(transitionTimeout);
  }, [themeState.theme, isTransitioning]);
  
  return (
    <ThemeContext.Provider 
      value={{ 
        theme: themeState.theme, 
        themeName: themeState.name, 
        toggleTheme, 
        setTheme,
        isTransitioning
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personalizado para usar o tema
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
