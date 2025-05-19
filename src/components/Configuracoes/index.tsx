import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface ConfiguracoesProps {
  onFontSizeChange: (size: 'small' | 'medium' | 'large') => void;
  onContrastChange: (highContrast: boolean) => void;
  fontSize: 'small' | 'medium' | 'large';
  highContrast: boolean;
}

const ConfigContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
`;

const SectionCard = styled.div`
  background-color: var(--surface-color);
  border-radius: var(--border-radius);
  padding: var(--spacing-lg);
  box-shadow: var(--box-shadow);
`;

const SectionTitle = styled.h2`
  margin-bottom: var(--spacing-md);
  color: var(--text-color);
  font-weight: 600;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &::before {
    content: '';
    display: block;
    width: 4px;
    height: 20px;
    background-color: var(--primary-color);
    border-radius: 2px;
  }
`;

const OptionGroup = styled.div`
  margin-bottom: var(--spacing-lg);
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const OptionTitle = styled.h3`
  font-size: 1rem;
  margin-bottom: var(--spacing-sm);
  color: var(--text-color);
`;

const OptionDescription = styled.p`
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-md);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const OptionButton = styled.button<{ active?: boolean }>`
  padding: 0.5rem 1rem;
  background-color: ${props => props.active ? 'var(--primary-color)' : '#f0f0f0'};
  color: ${props => props.active ? 'white' : 'var(--text-color)'};
  border: none;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.active ? 'var(--primary-light)' : '#e0e0e0'};
  }
  
  &:focus {
    outline: 2px solid var(--primary-light);
    outline-offset: 2px;
  }
`;

const SwitchContainer = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const SwitchInput = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
  position: absolute;
`;

const SwitchLabel = styled.span`
  margin-left: var(--spacing-md);
  font-size: 1rem;
  color: var(--text-color);
`;

const SwitchSlider = styled.span<{ checked: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${props => props.checked ? 'flex-end' : 'flex-start'};
  width: 48px;
  height: 24px;
  border-radius: 24px;
  background-color: ${props => props.checked ? 'var(--primary-color)' : '#ccc'};
  position: relative;
  transition: all 0.2s ease;
  
  &:before {
    content: '';
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: white;
    margin: 0 3px;
    transition: all 0.2s ease;
  }
`;

const Configuracoes: React.FC<ConfiguracoesProps> = ({ 
  onFontSizeChange, 
  onContrastChange,
  fontSize,
  highContrast
}) => {
  const handleFontSizeChange = (size: 'small' | 'medium' | 'large') => {
    onFontSizeChange(size);
    localStorage.setItem('accessibility_fontSize', size);
  };
  
  const handleContrastChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newContrast = event.target.checked;
    onContrastChange(newContrast);
    localStorage.setItem('accessibility_highContrast', String(newContrast));
  };
  
  return (
    <ConfigContainer>
      <SectionCard>
        <SectionTitle>Acessibilidade</SectionTitle>
        
        <OptionGroup>
          <OptionTitle>Tamanho da fonte</OptionTitle>
          <OptionDescription>
            Ajuste o tamanho da fonte para melhorar a legibilidade do conteúdo.
          </OptionDescription>
          <ButtonGroup>
            <OptionButton 
              onClick={() => handleFontSizeChange('small')}
              active={fontSize === 'small'}
              aria-pressed={fontSize === 'small'}
            >
              A-
            </OptionButton>
            <OptionButton 
              onClick={() => handleFontSizeChange('medium')}
              active={fontSize === 'medium'}
              aria-pressed={fontSize === 'medium'}
            >
              A
            </OptionButton>
            <OptionButton 
              onClick={() => handleFontSizeChange('large')}
              active={fontSize === 'large'}
              aria-pressed={fontSize === 'large'}
            >
              A+
            </OptionButton>
          </ButtonGroup>
        </OptionGroup>
        
        <OptionGroup>
          <OptionTitle>Alto contraste</OptionTitle>
          <OptionDescription>
            Ative o modo de alto contraste para melhorar a visibilidade dos elementos na tela.
          </OptionDescription>
          <SwitchContainer>
            <SwitchInput 
              type="checkbox" 
              checked={highContrast} 
              onChange={handleContrastChange}
              id="contrast-switch"
            />
            <SwitchSlider checked={highContrast} />
            <SwitchLabel>{highContrast ? 'Ativado' : 'Desativado'}</SwitchLabel>
          </SwitchContainer>
        </OptionGroup>
      </SectionCard>
      
      <SectionCard>
        <SectionTitle>Notificações</SectionTitle>
        
        <OptionGroup>
          <OptionTitle>Alertas por e-mail</OptionTitle>
          <OptionDescription>
            Receba alertas por e-mail sobre suas finanças.
          </OptionDescription>
          <SwitchContainer>
            <SwitchInput 
              type="checkbox" 
              id="email-alerts"
            />
            <SwitchSlider checked={false} />
            <SwitchLabel>Desativado</SwitchLabel>
          </SwitchContainer>
        </OptionGroup>
        
        <OptionGroup>
          <OptionTitle>Lembretes de contas</OptionTitle>
          <OptionDescription>
            Receba lembretes sobre contas próximas do vencimento.
          </OptionDescription>
          <SwitchContainer>
            <SwitchInput 
              type="checkbox" 
              id="bill-reminders"
              defaultChecked
            />
            <SwitchSlider checked={true} />
            <SwitchLabel>Ativado</SwitchLabel>
          </SwitchContainer>
        </OptionGroup>
      </SectionCard>
      
      <SectionCard>
        <SectionTitle>Segurança</SectionTitle>
        
        <OptionGroup>
          <OptionTitle>Autenticação de dois fatores</OptionTitle>
          <OptionDescription>
            Adicione uma camada extra de segurança à sua conta.
          </OptionDescription>
          <SwitchContainer>
            <SwitchInput 
              type="checkbox" 
              id="two-factor"
            />
            <SwitchSlider checked={false} />
            <SwitchLabel>Desativado</SwitchLabel>
          </SwitchContainer>
        </OptionGroup>
      </SectionCard>
    </ConfigContainer>
  );
};

export default Configuracoes;
