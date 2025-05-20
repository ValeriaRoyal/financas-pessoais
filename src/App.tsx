import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Configuracoes from './views/Configuracoes';
import GlobalStyles from './styles/GlobalStyles';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={
            <Layout title="Dashboard">
              <Dashboard />
            </Layout>
          } />
          <Route path="/configuracoes" element={
            <Layout title="Configurações">
              <Configuracoes />
            </Layout>
          } />
          {/* Adicione mais rotas conforme necessário */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
