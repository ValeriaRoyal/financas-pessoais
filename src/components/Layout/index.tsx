import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

const Container = styled.div`
  padding: var(--spacing-md);
  transition: margin-left 0.3s ease;
  
  @media (min-width: 768px) {
    margin-left: 280px;
    padding: var(--spacing-xl);
  }
`;

const Header = styled.header`
  background-color: var(--surface-color);
  color: var(--text-color);
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: var(--spacing-md);
  z-index: 10;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  @media (min-width: 768px) {
    display: none;
  }
  
  &:focus {
    outline: 2px solid var(--primary-light);
    outline-offset: 2px;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const PageTitle = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-color);
  
  @media (min-width: 768px) {
    font-size: 1.75rem;
  }
`;

const Navigation = styled.nav`
  display: none;
  
  @media (min-width: 768px) {
    display: flex;
    gap: 1rem;
  }
`;

const NavLink = styled(Link)`
  color: var(--text-color);
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;
  font-weight: 500;
  
  &:hover {
    background-color: rgba(98, 0, 238, 0.05);
    color: var(--primary-color);
  }
  
  &:focus {
    outline: 2px solid var(--primary-light);
    outline-offset: 2px;
  }
`;

const Main = styled.main`
  background-color: var(--surface-color);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  min-height: calc(100vh - 180px);
  
  @media (min-width: 768px) {
    min-height: calc(100vh - 200px);
  }
`;

const Footer = styled.footer`
  text-align: center;
  margin-top: var(--spacing-lg);
  padding: var(--spacing-md);
  color: var(--text-secondary);
  font-size: 0.9rem;
`;

const SkipLink = styled.a`
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--primary-color);
  color: white;
  padding: 8px;
  z-index: 100;
  
  &:focus {
    top: 0;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 1.25rem;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    color: var(--text-color);
  }
  
  &:focus {
    outline: 2px solid var(--primary-light);
    outline-offset: 2px;
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 8px;
  height: 8px;
  background-color: var(--error-color);
  border-radius: 50%;
`;

const Layout: React.FC<LayoutProps> = ({ children, title, description = 'Aplicativo de finanças pessoais' }) => {
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
        <html lang="pt-BR" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Helmet>
      
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <SkipLink href="#main-content">Pular para o conteúdo principal</SkipLink>
      
      <Container>
        <Header>
          <MenuButton onClick={toggleSidebar} aria-label="Abrir menu">
            ☰
          </MenuButton>
          <HeaderContent>
            <PageTitle>{title}</PageTitle>
            <HeaderActions>
              <ActionButton aria-label="Pesquisar">
                🔍
              </ActionButton>
              <ActionButton aria-label="Notificações" style={{ position: 'relative' }}>
                🔔
                <NotificationBadge />
              </ActionButton>
              <Navigation>
                <NavLink to="/">Dashboard</NavLink>
                <NavLink to="/transacoes">Transações</NavLink>
                <NavLink to="/cartoes">Cartões</NavLink>
              </Navigation>
            </HeaderActions>
          </HeaderContent>
        </Header>
        
        <Main id="main-content">
          {children}
        </Main>
        
        <Footer>
          <p>© {new Date().getFullYear()} Finanças Pessoais - Todos os direitos reservados</p>
        </Footer>
      </Container>
    </>
  );
};

export default Layout;
