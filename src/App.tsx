import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Transacoes from './components/Transacoes';
import CartaoCredito from './components/CartaoCredito';
import Configuracoes from './components/Configuracoes';
import Notificacoes from './components/Notificacoes';

// Temas para acessibilidade
const lightTheme = {
  primary: '#6200ee',
  secondary: '#03dac6',
  background: '#f5f7fa',
  surface: '#ffffff',
  text: '#333333',
  textSecondary: '#757575',
  error: '#b00020',
  success: '#00c853',
  border: '#e0e0e0',
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

// Página de Notificações
const NotificacoesPage = () => (
  <Layout title="Notificações">
    <Notificacoes />
  </Layout>
);

// Aplicação principal
const App: React.FC = () => {
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [highContrast, setHighContrast] = useState(false);
  const [theme, setTheme] = useState(lightTheme);
  
  // Carregar preferências salvas
  useEffect(() => {
    const savedFontSize = localStorage.getItem('accessibility_fontSize');
    const savedContrast = localStorage.getItem('accessibility_highContrast');
    
    if (savedFontSize) {
      setFontSize(savedFontSize as 'small' | 'medium' | 'large');
    }
    
    if (savedContrast) {
      setHighContrast(savedContrast === 'true');
    }
  }, []);
  
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
  
  // Página de Configurações
  const ConfiguracoesPage = () => (
    <Layout title="Configurações">
      <Configuracoes 
        onFontSizeChange={setFontSize}
        onContrastChange={setHighContrast}
        fontSize={fontSize}
        highContrast={highContrast}
      />
    </Layout>
  );
  
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/transacoes" element={<TransacoesPage />} />
          <Route path="/cartoes" element={<CartoesPage />} />
          <Route path="/configuracoes" element={<ConfiguracoesPage />} />
          <Route path="/notificacoes" element={<NotificacoesPage />} />
          {/* Adicione mais rotas conforme necessário */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
