import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ThemeToggle from '../common/ThemeToggle';
import { fadeIn } from '../../styles/animations';

const HeaderContainer = styled.header`
  background-color: var(--surface);
  color: var(--textPrimary);
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
  animation: ${fadeIn} 0.5s ease;
  
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
  color: var(--textPrimary);
  font-size: 1.5rem;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
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
  color: var(--textPrimary);
  
  @media (min-width: 768px) {
    font-size: 1.75rem;
  }
  
  @media (max-width: 320px) {
    font-size: 1.25rem;
    width: 100%;
    margin-bottom: 0.5rem;
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
  color: var(--textSecondary);
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
    color: var(--textPrimary);
    
    .dark-theme & {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
  
  &:focus {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
  }
  
  @media (max-width: 320px) {
    width: 32px;
    height: 32px;
    font-size: 1rem;
  }
`;

const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #8534DB;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.1);
  }
  
  @media (max-width: 320px) {
    width: 32px;
    height: 32px;
    font-size: 0.9rem;
  }
`;

interface HeaderProps {
  title: string;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, toggleSidebar }) => {
  return (
    <HeaderContainer aria-label="Cabeçalho principal">
      <div className="skip-link-container" aria-label="Pular navegação">
        <a 
          href="#main-content" 
          style={{ 
            position: 'absolute',
            top: 0,
            left: '-9999px',
            background: '#4B0082',
            color: 'white',
            padding: '8px',
            zIndex: 100
          }}
          onFocus={(e) => {
            e.currentTarget.style.left = '8px';
          }}
          onBlur={(e) => {
            e.currentTarget.style.left = '-9999px';
          }}
        >
          Pular para o conteúdo principal
        </a>
      </div>
      
      <MenuButton onClick={toggleSidebar} aria-label="Abrir menu">
        ☰
      </MenuButton>
      
      <HeaderContent>
        <PageTitle>{title}</PageTitle>
        
        <HeaderActions>
          <ThemeToggle />
          
          <ActionButton aria-label="Notificações">
            🔔
          </ActionButton>
          
          <Link to="/configuracoes">
            <ActionButton aria-label="Configurações">
              ⚙️
            </ActionButton>
          </Link>
          
          <UserAvatar>VP</UserAvatar>
        </HeaderActions>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
