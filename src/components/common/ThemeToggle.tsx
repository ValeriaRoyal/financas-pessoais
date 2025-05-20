import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useTheme } from '../../contexts/ThemeContext';
import { buttonPress } from '../../styles/animations';

interface ThemeToggleProps {
  className?: string;
}

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

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
  position: relative;
  overflow: hidden;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    
    .dark-theme & {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
  
  &:active {
    animation: ${buttonPress} 0.2s ease;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--primary);
    border-radius: 50%;
    opacity: 0;
    transform: scale(0);
    transition: transform 0.3s, opacity 0.3s;
  }
  
  &:focus::after {
    opacity: 0.1;
    transform: scale(1);
  }
`;

const ThemeIcon = styled.span<{ $isTransitioning: boolean }>`
  font-size: 1.5rem;
  transition: transform 0.3s ease;
  z-index: 1;
  
  ${props => props.$isTransitioning && `
    animation: ${spin} 0.5s ease-in-out, ${pulse} 0.5s ease-in-out;
  `}
  
  ${ToggleButton}:hover & {
    transform: rotate(15deg);
  }
`;

const ThemeLabel = styled.span`
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.75rem;
  color: var(--textSecondary);
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s, bottom 0.3s;
  
  ${ToggleButton}:hover & {
    opacity: 1;
    bottom: -24px;
  }
`;

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const { theme, toggleTheme, isTransitioning, themeName } = useTheme();
  
  const getThemeIcon = () => {
    switch (theme.name) {
      case 'dark':
        return '☀️';
      case 'high-contrast':
        return '🔆';
      default:
        return '🌙';
    }
  };
  
  const getThemeLabel = () => {
    switch (theme.name) {
      case 'dark':
        return 'Modo claro';
      case 'high-contrast':
        return 'Modo claro';
      default:
        return 'Modo escuro';
    }
  };
  
  return (
    <ToggleButton 
      onClick={toggleTheme} 
      aria-label={`Alternar para ${getThemeLabel()}`}
      className={className}
      title={getThemeLabel()}
    >
      <ThemeIcon $isTransitioning={isTransitioning}>
        {getThemeIcon()}
      </ThemeIcon>
      <ThemeLabel>{getThemeLabel()}</ThemeLabel>
    </ToggleButton>
  );
};

export default ThemeToggle;
