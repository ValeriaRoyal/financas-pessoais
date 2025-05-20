import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../contexts/ThemeContext';
import { buttonPress } from '../../styles/animations';

const ToggleButton = styled.button`
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
  transition: background-color 0.3s, transform 0.2s;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    
    .dark-theme & {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
  
  &:active {
    animation: ${buttonPress} 0.2s ease;
  }
`;

const ThemeIcon = styled.span`
  font-size: 1.5rem;
  transition: transform 0.3s ease;
  
  ${ToggleButton}:hover & {
    transform: rotate(15deg);
  }
`;

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <ToggleButton 
      onClick={toggleTheme} 
      aria-label={theme.name === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
      className={className}
    >
      <ThemeIcon>
        {theme.name === 'light' ? '🌙' : '☀️'}
      </ThemeIcon>
    </ToggleButton>
  );
};

export default ThemeToggle;
