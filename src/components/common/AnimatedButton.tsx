import React from 'react';
import styled from 'styled-components';
import { buttonPress } from '../../styles/animations';

interface ButtonProps {
  $primary?: boolean;
  $danger?: boolean;
  $small?: boolean;
  $fullWidth?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.$small ? '0.5rem 1rem' : '0.75rem 1.5rem'};
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  border: none;
  border-radius: var(--border-radius);
  font-weight: 500;
  font-size: ${props => props.$small ? '0.875rem' : '1rem'};
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s, box-shadow 0.3s;
  
  /* Cores baseadas no tema */
  background-color: ${props => {
    if (props.disabled) return 'var(--border)';
    if (props.$danger) return 'var(--error)';
    if (props.$primary) return 'var(--primary)';
    return 'var(--surface)';
  }};
  
  color: ${props => {
    if (props.disabled) return 'var(--textSecondary)';
    if (props.$danger || props.$primary) return 'white';
    return 'var(--textPrimary)';
  }};
  
  border: ${props => {
    if (!props.$primary && !props.$danger && !props.disabled) {
      return '1px solid var(--border)';
    }
    return 'none';
  }};
  
  &:hover {
    background-color: ${props => {
      if (props.disabled) return 'var(--border)';
      if (props.$danger) return 'var(--error)';
      if (props.$primary) return 'var(--primaryDark)';
      return 'var(--background)';
    }};
    
    box-shadow: ${props => {
      if (props.disabled) return 'none';
      return 'var(--box-shadow)';
    }};
  }
  
  &:active {
    animation: ${buttonPress} 0.2s ease;
  }
  
  &:disabled {
    cursor: not-allowed;
  }
  
  /* Espaçamento para ícones */
  svg, img {
    margin-right: ${props => props.children ? '0.5rem' : '0'};
  }
`;

const AnimatedButton: React.FC<ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ 
  $primary, 
  $danger, 
  $small, 
  $fullWidth, 
  children, 
  ...props 
}) => {
  return (
    <StyledButton 
      $primary={$primary} 
      $danger={$danger} 
      $small={$small} 
      $fullWidth={$fullWidth} 
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default AnimatedButton;
