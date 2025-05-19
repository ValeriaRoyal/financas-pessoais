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
  width: 280px;
  background-color: var(--surface-color);
  color: var(--text-color);
  transform: translateX(${props => props.isOpen ? '0' : '-100%'});
  transition: transform 0.3s ease;
  z-index: 1000;
  box-shadow: ${props => props.isOpen ? 'var(--box-shadow)' : 'none'};
  border-right: 1px solid rgba(0, 0, 0, 0.05);
  
  @media (min-width: 768px) {
    transform: translateX(0);
    position: fixed;
    top: 0;
    height: 100vh;
  }
`;

const SidebarHeader = styled.div`
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
`;

const Logo = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--primary-color);
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const LogoIcon = styled.div`
  width: 32px;
  height: 32px;
  background-color: var(--primary-color);
  color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 1.5rem;
  cursor: pointer;
  display: block;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    color: var(--text-color);
  }
  
  @media (min-width: 768px) {
    display: none;
  }
  
  &:focus {
    outline: 2px solid var(--primary-light);
    outline-offset: 2px;
  }
`;

const SidebarContent = styled.div`
  padding: 1rem 0;
  height: calc(100% - 80px);
  overflow-y: auto;
`;

const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
`;

const NavSection = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h3`
  font-size: 0.75rem;
  text-transform: uppercase;
  color: var(--text-secondary);
  padding: 0 1.5rem;
  margin-bottom: 0.75rem;
  letter-spacing: 0.5px;
  font-weight: 600;
`;

const NavItem = styled(Link)<{ active: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  color: ${props => props.active ? 'var(--primary-color)' : 'var(--text-color)'};
  text-decoration: none;
  transition: all 0.2s;
  background-color: ${props => props.active ? 'rgba(98, 0, 238, 0.05)' : 'transparent'};
  border-left: 3px solid ${props => props.active ? 'var(--primary-color)' : 'transparent'};
  font-weight: ${props => props.active ? '500' : 'normal'};
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
    color: var(--primary-color);
  }
  
  &:focus {
    outline: 2px solid var(--primary-light);
    outline-offset: -2px;
  }
`;

const IconContainer = styled.span<{ active: boolean }>`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.75rem;
  font-size: 1.25rem;
  border-radius: 8px;
  background-color: ${props => props.active ? 'var(--primary-color)' : 'rgba(0, 0, 0, 0.03)'};
  color: ${props => props.active ? 'white' : 'var(--text-secondary)'};
  transition: all 0.2s;
  
  ${NavItem}:hover & {
    background-color: ${props => props.active ? 'var(--primary-color)' : 'rgba(98, 0, 238, 0.1)'};
    color: ${props => props.active ? 'white' : 'var(--primary-color)'};
  }
`;

const NavText = styled.span`
  font-size: 0.95rem;
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: opacity 0.3s, visibility 0.3s;
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const SidebarFooter = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: var(--surface-color);
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: var(--primary-light);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
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
          <Logo>
            <LogoIcon>💰</LogoIcon>
            <span>Finanças Pessoais</span>
          </Logo>
          <CloseButton onClick={toggleSidebar} aria-label="Fechar menu">
            &times;
          </CloseButton>
        </SidebarHeader>
        
        <SidebarContent>
          <SidebarNav>
            <NavSection>
              <SectionTitle>Principal</SectionTitle>
              <NavItem to="/" active={isActive('/')}>
                <IconContainer active={isActive('/')}>📊</IconContainer>
                <NavText>Dashboard</NavText>
              </NavItem>
              <NavItem to="/transacoes" active={isActive('/transacoes')}>
                <IconContainer active={isActive('/transacoes')}>💰</IconContainer>
                <NavText>Transações</NavText>
              </NavItem>
            </NavSection>
            
            <NavSection>
              <SectionTitle>Gerenciamento</SectionTitle>
              <NavItem to="/cartoes" active={isActive('/cartoes')}>
                <IconContainer active={isActive('/cartoes')}>💳</IconContainer>
                <NavText>Cartões de Crédito</NavText>
              </NavItem>
              <NavItem to="/investimentos" active={isActive('/investimentos')}>
                <IconContainer active={isActive('/investimentos')}>📈</IconContainer>
                <NavText>Investimentos</NavText>
              </NavItem>
              <NavItem to="/reservas" active={isActive('/reservas')}>
                <IconContainer active={isActive('/reservas')}>🛡️</IconContainer>
                <NavText>Reserva de Emergência</NavText>
              </NavItem>
            </NavSection>
            
            <NavSection>
              <SectionTitle>Análises</SectionTitle>
              <NavItem to="/relatorios" active={isActive('/relatorios')}>
                <IconContainer active={isActive('/relatorios')}>📝</IconContainer>
                <NavText>Relatórios</NavText>
              </NavItem>
              <NavItem to="/metas" active={isActive('/metas')}>
                <IconContainer active={isActive('/metas')}>🎯</IconContainer>
                <NavText>Metas Financeiras</NavText>
              </NavItem>
            </NavSection>
            
            <NavSection>
              <SectionTitle>Configurações</SectionTitle>
              <NavItem to="/categorias" active={isActive('/categorias')}>
                <IconContainer active={isActive('/categorias')}>🏷️</IconContainer>
                <NavText>Categorias</NavText>
              </NavItem>
              <NavItem to="/configuracoes" active={isActive('/configuracoes')}>
                <IconContainer active={isActive('/configuracoes')}>⚙️</IconContainer>
                <NavText>Configurações</NavText>
              </NavItem>
            </NavSection>
          </SidebarNav>
        </SidebarContent>
        
        <SidebarFooter>
          <UserInfo>
            <UserAvatar>VP</UserAvatar>
            <UserDetails>
              <UserName>Valeria</UserName>
              <UserRole>Usuário</UserRole>
            </UserDetails>
          </UserInfo>
        </SidebarFooter>
      </SidebarContainer>
      
      <Overlay isOpen={isOpen} onClick={toggleSidebar} />
    </>
  );
};

export default Sidebar;
