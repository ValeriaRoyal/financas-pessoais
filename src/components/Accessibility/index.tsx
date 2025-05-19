import React, { useEffect } from 'react';
import styled from 'styled-components';

interface AccessibilityBarProps {
  onFontSizeChange: (size: 'small' | 'medium' | 'large') => void;
  onContrastChange: (highContrast: boolean) => void;
}

const AccessibilityContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background-color: #f0f0f0;
  border-radius: var(--border-radius);
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

const AccessibilityLabel = styled.span`
  font-weight: bold;
  margin-right: 0.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const AccessibilityButton = styled.button<{ active?: boolean }>`
  padding: 0.5rem;
  background-color: ${props => props.active ? 'var(--primary-color)' : '#ddd'};
  color: ${props => props.active ? 'white' : 'black'};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  
  &:hover {
    background-color: ${props => props.active ? 'var(--primary-color)' : '#ccc'};
  }
  
  &:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
`;

const AccessibilityBar: React.FC<AccessibilityBarProps> = ({ 
  onFontSizeChange, 
  onContrastChange 
}) => {
  const [fontSize, setFontSize] = React.useState<'small' | 'medium' | 'large'>('medium');
  const [highContrast, setHighContrast] = React.useState(false);
  
  useEffect(() => {
    // Recuperar preferências salvas
    const savedFontSize = localStorage.getItem('accessibility_fontSize');
    const savedContrast = localStorage.getItem('accessibility_highContrast');
    
    if (savedFontSize) {
      setFontSize(savedFontSize as 'small' | 'medium' | 'large');
      onFontSizeChange(savedFontSize as 'small' | 'medium' | 'large');
    }
    
    if (savedContrast) {
      const contrast = savedContrast === 'true';
      setHighContrast(contrast);
      onContrastChange(contrast);
    }
  }, [onFontSizeChange, onContrastChange]);
  
  const handleFontSizeChange = (size: 'small' | 'medium' | 'large') => {
    setFontSize(size);
    localStorage.setItem('accessibility_fontSize', size);
    onFontSizeChange(size);
  };
  
  const handleContrastChange = () => {
    const newContrast = !highContrast;
    setHighContrast(newContrast);
    localStorage.setItem('accessibility_highContrast', String(newContrast));
    onContrastChange(newContrast);
  };
  
  return (
    <AccessibilityContainer role="region" aria-label="Opções de acessibilidade">
      <div>
        <AccessibilityLabel id="font-size-label">Tamanho da fonte:</AccessibilityLabel>
        <ButtonGroup role="group" aria-labelledby="font-size-label">
          <AccessibilityButton 
            onClick={() => handleFontSizeChange('small')}
            active={fontSize === 'small'}
            aria-pressed={fontSize === 'small'}
          >
            A-
          </AccessibilityButton>
          <AccessibilityButton 
            onClick={() => handleFontSizeChange('medium')}
            active={fontSize === 'medium'}
            aria-pressed={fontSize === 'medium'}
          >
            A
          </AccessibilityButton>
          <AccessibilityButton 
            onClick={() => handleFontSizeChange('large')}
            active={fontSize === 'large'}
            aria-pressed={fontSize === 'large'}
          >
            A+
          </AccessibilityButton>
        </ButtonGroup>
      </div>
      
      <div>
        <AccessibilityButton
          onClick={handleContrastChange}
          active={highContrast}
          aria-pressed={highContrast}
        >
          {highContrast ? 'Desativar Alto Contraste' : 'Ativar Alto Contraste'}
        </AccessibilityButton>
      </div>
    </AccessibilityContainer>
  );
};

export default AccessibilityBar;
