import React from 'react';
import styled from 'styled-components';
import { cardHover } from '../../styles/animations';

interface CardProps {
  children: React.ReactNode;
  hoverable?: boolean;
  className?: string;
  onClick?: () => void;
}

const CardContainer = styled.div<{ $hoverable?: boolean }>`
  background-color: var(--surface);
  border-radius: var(--border-radius);
  padding: var(--spacing-md);
  box-shadow: var(--box-shadow);
  transition: transform 0.3s, box-shadow 0.3s;
  
  ${props => props.$hoverable && `
    cursor: pointer;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: var(--box-shadow-hover);
    }
  `}
`;

const AnimatedCard: React.FC<CardProps> = ({ children, hoverable, className, onClick }) => {
  return (
    <CardContainer 
      $hoverable={hoverable} 
      className={className}
      onClick={onClick}
    >
      {children}
    </CardContainer>
  );
};

export default AnimatedCard;
