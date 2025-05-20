import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { slideInUp } from '../../styles/animations';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarContainer = styled.aside<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 280px;
  background-color: var(--surface);
  box-shadow: var(--box-shadow);
  z-index: 1000;
  transform: translateX(${props => props.$isOpen ? '0' : '-100%'});
  transition: transform 0.3s ease;
  overflow-y: auto;
  
  @media (min-width: 768px) {
    transform: translateX(0);
  }
`;

const SidebarHeader = styled.div`
  padding: var(--spacing-lg);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border);
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: var(--textSecondary);
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const NavMenu = styled.nav`
  padding: var(--spacing-md);
`;

const NavSection = styled.div`
  margin-bottom: var(--spacing-lg);
  animation: ${slideInUp} 0.5s ease;
`;

const NavSectionTitle = styled.h3`
  font-size: 0.8rem;
  text-transform: uppercase;
  color: var(--textSecondary);
  margin-bottom: var(--spacing-sm);
  padding: 0 var(--spacing-sm);
  letter-spacing: 0.05em;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin-bottom: 2px;
`;

const NavLink = styled(Link)<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.75rem var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  color: ${props => props.$active ? 'var(--primary)' : 'var(--textPrimary)'};
  text-decoration: none;
  transition: background-color 0.2s;
  font-weight: ${props => props.$active ? '500' : 'normal'};
  background-color: ${props => props.$active ? 'var(--primaryLight)15' : 'transparent'};
  
  &:hover {
    background-color: ${props => props.$active ? 'var(--primaryLight)25' : 'rgba(0, 0, 0, 0.05)'};
  }
  
  .dark-theme & {
    &:hover {
      background-color: ${props => props.$active ? 'var(--primaryLight)25' : 'rgba(255, 255, 255, 0.1)'};
    }
  }
`;

const NavIcon = styled.span`
  margin-right: var(--spacing-sm);
  font-size: 1.25rem;
  width: 24px;
  text-align: center;
`;

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: opacity 0.3s, visibility 0.3s;
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <>
      <SidebarContainer $isOpen={isOpen}>
        <SidebarHeader>
          <Logo>
            <span>💰</span>
            <span>Finanças</span>
          </Logo>
          <CloseButton onClick={toggleSidebar} aria-label="Fechar menu">
            &times;
          </CloseButton>
        </SidebarHeader>
        
        <NavMenu>
          <NavSection>
            <NavSectionTitle>Principal</NavSectionTitle>
            <NavList>
              <NavItem>
                <NavLink to="/" $active={isActive('/')}>
                  <NavIcon>📊</NavIcon>
                  Dashboard
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/transacoes" $active={isActive('/transacoes')}>
                  <NavIcon>📝</NavIcon>
                  Transações
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/cartoes" $active={isActive('/cartoes')}>
                  <NavIcon>💳</NavIcon>
                  Cartões
                </NavLink>
              </NavItem>
            </NavList>
          </NavSection>
          
          <NavSection>
            <NavSectionTitle>Planejamento</NavSectionTitle>
            <NavList>
              <NavItem>
                <NavLink to="/metas" $active={isActive('/metas')}>
                  <NavIcon>🎯</NavIcon>
                  Metas
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/orcamento" $active={isActive('/orcamento')}>
                  <NavIcon>📅</NavIcon>
                  Orçamento
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/investimentos" $active={isActive('/investimentos')}>
                  <NavIcon>📈</NavIcon>
                  Investimentos
                </NavLink>
              </NavItem>
            </NavList>
          </NavSection>
          
          <NavSection>
            <NavSectionTitle>Configurações</NavSectionTitle>
            <NavList>
              <NavItem>
                <NavLink to="/configuracoes" $active={isActive('/configuracoes')}>
                  <NavIcon>⚙️</NavIcon>
                  Configurações
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/perfil" $active={isActive('/perfil')}>
                  <NavIcon>👤</NavIcon>
                  Perfil
                </NavLink>
              </NavItem>
            </NavList>
          </NavSection>
        </NavMenu>
      </SidebarContainer>
      
      <Overlay $isOpen={isOpen} onClick={toggleSidebar} />
    </>
  );
};

export default Sidebar;
