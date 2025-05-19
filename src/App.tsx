import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Layout from './components/Layout';
import AccessibilityBar from './components/Accessibility';
import Dashboard from './components/Dashboard';
import Transacoes from './components/Transacoes';
import CartaoCredito from './components/CartaoCredito';

// Temas para acessibilidade
const lightTheme = {
  primary: '#2e7d32',
  secondary: '#4caf50',
  background: '#f5f5f5',
  surface: '#ffffff',
  text: '#333333',
  textSecondary: '#666666',
  error: '#d32f2f',
  success: '#388e3c',
  border: '#dddddd',
};

// Tema de alto contraste para acessibilidade
const highContrastTheme = {
  primary: '#ffff00',
  secondary: '#00ffff',
  background: '#000000',
  surface: '#000000',
  text: '#ffffff',
  textSecondary: '#ffffff',
  error: '#ff0000',
  success: '#00ff00',
  border: '#ffffff',
};

// Página inicial com Dashboard
const HomePage = () => (
  <Layout title="Dashboard">
    <Dashboard />
  </Layout>
);

// Página de Transações
const TransacoesPage = () => (
  <Layout title="Transações">
    <Transacoes />
  </Layout>
);

// Página de Cartões de Crédito
const CartoesPage = () => (
  <Layout title="Cartões de Crédito">
    <CartaoCredito />
  </Layout>
);

// Aplicação principal
const App: React.FC = () => {
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [highContrast, setHighContrast] = useState(false);
  const [theme, setTheme] = useState(lightTheme);
  
  // Aplicar tamanho da fonte
  useEffect(() => {
    const htmlElement = document.documentElement;
    
    switch (fontSize) {
      case 'small':
        htmlElement.style.fontSize = '14px';
        break;
      case 'medium':
        htmlElement.style.fontSize = '16px';
        break;
      case 'large':
        htmlElement.style.fontSize = '20px';
        break;
      default:
        htmlElement.style.fontSize = '16px';
    }
  }, [fontSize]);
  
  // Aplicar tema de contraste
  useEffect(() => {
    if (highContrast) {
      setTheme(highContrastTheme);
    } else {
      setTheme(lightTheme);
    }
  }, [highContrast]);
  
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <AccessibilityBar 
          onFontSizeChange={setFontSize}
          onContrastChange={setHighContrast}
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/transacoes" element={<TransacoesPage />} />
          <Route path="/cartoes" element={<CartoesPage />} />
          {/* Adicione mais rotas conforme necessário */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
