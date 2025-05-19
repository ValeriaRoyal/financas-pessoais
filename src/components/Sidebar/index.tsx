import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarContainer = styled.aside<{ isOpen: boolean }>`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 250px;
  background-color: var(--primary-color);
  color: white;
  transform: translateX(${props => props.isOpen ? '0' : '-100%'});
  transition: transform 0.3s ease;
  z-index: 1000;
  box-shadow: ${props => props.isOpen ? '0 0 10px rgba(0, 0, 0, 0.3)' : 'none'};
  
  @media (min-width: 768px) {
    transform: translateX(0);
    position: sticky;
    top: 0;
    height: 100vh;
  }
`;

const SidebarHeader = styled.div`
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  display: block;
  
  @media (min-width: 768px) {
    display: none;
  }
  
  &:focus {
    outline: 2px solid white;
    outline-offset: 2px;
  }
`;

const SidebarContent = styled.div`
  padding: 1rem 0;
`;

const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
`;

const NavSection = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h3`
  font-size: 0.8rem;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
  padding: 0 1.5rem;
  margin-bottom: 0.5rem;
`;

const NavItem = styled(Link)<{ active: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  color: white;
  text-decoration: none;
  transition: background-color 0.2s;
  background-color: ${props => props.active ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  border-left: 4px solid ${props => props.active ? 'white' : 'transparent'};
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  &:focus {
    outline: 2px solid white;
    outline-offset: -2px;
  }
`;

const IconPlaceholder = styled.span`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.75rem;
  font-size: 1.2rem;
`;

const NavText = styled.span`
  font-size: 1rem;
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: ${props => props.isOpen ? 'block' : 'none'};
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  
  // Função para verificar se o link está ativo
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <>
      <SidebarContainer isOpen={isOpen}>
        <SidebarHeader>
          <Logo>Finanças Pessoais</Logo>
          <CloseButton onClick={toggleSidebar} aria-label="Fechar menu">
            &times;
          </CloseButton>
        </SidebarHeader>
        
        <SidebarContent>
          <SidebarNav>
            <NavSection>
              <SectionTitle>Principal</SectionTitle>
              <NavItem to="/" active={isActive('/')}>
                <IconPlaceholder>📊</IconPlaceholder>
                <NavText>Dashboard</NavText>
              </NavItem>
              <NavItem to="/transacoes" active={isActive('/transacoes')}>
                <IconPlaceholder>💰</IconPlaceholder>
                <NavText>Transações</NavText>
              </NavItem>
            </NavSection>
            
            <NavSection>
              <SectionTitle>Gerenciamento</SectionTitle>
              <NavItem to="/cartoes" active={isActive('/cartoes')}>
                <IconPlaceholder>💳</IconPlaceholder>
                <NavText>Cartões de Crédito</NavText>
              </NavItem>
              <NavItem to="/investimentos" active={isActive('/investimentos')}>
                <IconPlaceholder>📈</IconPlaceholder>
                <NavText>Investimentos</NavText>
              </NavItem>
              <NavItem to="/reservas" active={isActive('/reservas')}>
                <IconPlaceholder>🛡️</IconPlaceholder>
                <NavText>Reserva de Emergência</NavText>
              </NavItem>
            </NavSection>
            
            <NavSection>
              <SectionTitle>Análises</SectionTitle>
              <NavItem to="/relatorios" active={isActive('/relatorios')}>
                <IconPlaceholder>📝</IconPlaceholder>
                <NavText>Relatórios</NavText>
              </NavItem>
              <NavItem to="/metas" active={isActive('/metas')}>
                <IconPlaceholder>🎯</IconPlaceholder>
                <NavText>Metas Financeiras</NavText>
              </NavItem>
            </NavSection>
            
            <NavSection>
              <SectionTitle>Configurações</SectionTitle>
              <NavItem to="/categorias" active={isActive('/categorias')}>
                <IconPlaceholder>🏷️</IconPlaceholder>
                <NavText>Categorias</NavText>
              </NavItem>
              <NavItem to="/configuracoes" active={isActive('/configuracoes')}>
                <IconPlaceholder>⚙️</IconPlaceholder>
                <NavText>Configurações</NavText>
              </NavItem>
            </NavSection>
          </SidebarNav>
        </SidebarContent>
      </SidebarContainer>
      
      <Overlay isOpen={isOpen} onClick={toggleSidebar} />
    </>
  );
};

export default Sidebar;
