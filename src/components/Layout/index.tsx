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
  
  @media (max-width: 320px) {
    padding: var(--spacing-sm);
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
  
  .skip-link-container {
    position: absolute;
    left: 0;
    top: 0;
  }
  
  @media (max-width: 320px) {
    padding: var(--spacing-sm);
    margin-bottom: var(--spacing-md);
    flex-wrap: wrap;
  }
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
  
  @media (max-width: 320px) {
    flex-wrap: wrap;
  }
`;

const PageTitle = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-color);
  
  @media (min-width: 768px) {
    font-size: 1.75rem;
  }
  
  @media (max-width: 320px) {
    font-size: 1.25rem;
    width: 100%;
    margin-bottom: 0.5rem;
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
  
  @media (max-width: 320px) {
    padding: var(--spacing-md);
    min-height: calc(100vh - 160px);
  }
`;

const Footer = styled.footer`
  text-align: center;
  margin-top: var(--spacing-lg);
  padding: var(--spacing-md);
  color: #333333; // Cor mais escura para melhor contraste
  font-size: 0.9rem;
`;

const SkipLink = styled.a`
  position: absolute;
  top: 0;
  left: -9999px;
  background: #4B0082; /* Cor mais escura para melhor contraste */
  color: white;
  padding: 8px;
  z-index: 100;
  
  &:focus {
    left: 8px;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 320px) {
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
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
  
  @media (max-width: 320px) {
    width: 32px;
    height: 32px;
    font-size: 1rem;
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

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-left: 0.5rem;
  padding-left: 0.5rem;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #8534DB; /* Cor mais escura para melhorar o contraste */
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  
  @media (max-width: 320px) {
    width: 32px;
    height: 32px;
    font-size: 0.9rem;
  }
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.span`
  font-weight: 500;
  font-size: 0.9rem;
`;

const UserRole = styled.span`
  font-size: 0.75rem;
  color: var(--text-secondary);
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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Helmet>
      
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <Container>
        <Header aria-label="Cabeçalho principal">
          <div className="skip-link-container" aria-label="Pular navegação">
            <SkipLink href="#main-content">Pular para o conteúdo principal</SkipLink>
          </div>
          <MenuButton onClick={toggleSidebar} aria-label="Abrir menu">
            ☰
          </MenuButton>
          <HeaderContent>
            <PageTitle>{title}</PageTitle>
            <HeaderActions>
              <ActionButton aria-label="Pesquisar">
                🔍
              </ActionButton>
              <Link to="/notificacoes" style={{ color: 'inherit', textDecoration: 'none' }}>
                <ActionButton aria-label="Notificações" style={{ position: 'relative' }}>
                  🔔
                  <NotificationBadge />
                </ActionButton>
              </Link>
              <Navigation>
                <NavLink to="/">Dashboard</NavLink>
                <NavLink to="/transacoes">Transações</NavLink>
                <NavLink to="/cartoes">Cartões</NavLink>
                <NavLink to="/configuracoes">Configurações</NavLink>
              </Navigation>
              <UserInfo>
                <UserAvatar>VP</UserAvatar>
                <UserDetails>
                  <UserName>Valeria</UserName>
                  <UserRole>Usuário</UserRole>
                </UserDetails>
              </UserInfo>
            </HeaderActions>
          </HeaderContent>
        </Header>
        
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
