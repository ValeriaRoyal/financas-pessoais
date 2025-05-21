import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import TransacoesView from './views/Transacoes';
import Configuracoes from './views/Configuracoes';
import GlobalStyles from './styles/GlobalStyles';
import NotFound from './views/NotFound/index';

const App: React.FC = () => {
  return (
    <HelmetProvider>
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
          <Route path="/transacoes" element={
            <Layout title="Transações">
              <TransacoesView />
            </Layout>
          } />
          <Route path="/cartoes" element={
            <Layout title="Cartões">
              <div>Página de Cartões em desenvolvimento</div>
            </Layout>
          } />
          <Route path="/metas" element={
            <Layout title="Metas">
              <div>Página de Metas em desenvolvimento</div>
            </Layout>
          } />
          <Route path="/orcamento" element={
            <Layout title="Orçamento">
              <div>Página de Orçamento em desenvolvimento</div>
            </Layout>
          } />
          <Route path="/investimentos" element={
            <Layout title="Investimentos">
              <div>Página de Investimentos em desenvolvimento</div>
            </Layout>
          } />
          <Route path="/perfil" element={
            <Layout title="Perfil">
              <div>Página de Perfil em desenvolvimento</div>
            </Layout>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
