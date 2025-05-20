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
    textSecondary: '#b0b0b0',
    error: '#cf6679',
    success: '#81c784',
    warning: '#ffb74d',
    info: '#64b5f6',
    border: '#333333'
  }
};

export type Theme = typeof lightTheme;

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Verificar preferência do usuário ou tema salvo
  const getInitialTheme = (): Theme => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') return darkTheme;
    
    // Verificar preferência do sistema
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return darkTheme;
    }
    
    return lightTheme;
  };
  
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  
  // Alternar entre temas
  const toggleTheme = () => {
    setThemeState(prevTheme => {
      const newTheme = prevTheme.name === 'light' ? darkTheme : lightTheme;
      localStorage.setItem('theme', newTheme.name);
      return newTheme;
    });
  };
  
  // Definir tema específico
  const setTheme = (themeName: 'light' | 'dark') => {
    const newTheme = themeName === 'light' ? lightTheme : darkTheme;
    localStorage.setItem('theme', newTheme.name);
    setThemeState(newTheme);
  };
  
  // Aplicar variáveis CSS com base no tema atual
  useEffect(() => {
    const root = document.documentElement;
    
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
    
    // Adicionar classe ao body para estilos específicos
    document.body.className = theme.name === 'dark' ? 'dark-theme' : 'light-theme';
  }, [theme]);
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
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
