import React, { useState } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import Sidebar from '../Sidebar';
import Header from './Header';
import { fadeIn, slideInUp } from '../../styles/animations';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const Container = styled.div`
  padding: var(--spacing-md);
  transition: margin-left 0.3s ease;
  animation: ${fadeIn} 0.5s ease;
  
  @media (min-width: 768px) {
    margin-left: 280px;
    padding: var(--spacing-xl);
  }
  
  @media (max-width: 320px) {
    padding: var(--spacing-sm);
  }
`;

const Main = styled.main`
  background-color: var(--surface);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  min-height: calc(100vh - 180px);
  animation: ${slideInUp} 0.5s ease;
  
  @media (min-width: 768px) {
    min-height: calc(100vh - 200px);
  }
  
  @media (max-width: 320px) {
    padding: var(--spacing-md);
    min-height: calc(100vh - 160px);
  }
`;

const Footer = styled.footer`
  text-align: center;
  margin-top: var(--spacing-lg);
  padding: var(--spacing-md);
  color: var(--textSecondary);
  font-size: 0.9rem;
  transition: color 0.3s ease;
`;

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title = 'Dashboard', 
  description = 'Gerencie suas finanças pessoais de forma simples e eficiente.' 
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <>
      <Helmet>
        <title>{title} | Finanças Pessoais</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Helmet>
      
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <Container>
        <Header title={title} toggleSidebar={toggleSidebar} />
        
        <Main id="main-content" aria-label="Conteúdo principal">
          {children}
        </Main>
        
        <Footer aria-label="Rodapé">
          <p>© {new Date().getFullYear()} Finanças Pessoais - Todos os direitos reservados</p>
        </Footer>
      </Container>
    </>
  );
};

export default Layout;
