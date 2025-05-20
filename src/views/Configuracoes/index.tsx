import React, { useState } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../contexts/ThemeContext';
import { fadeIn, slideInUp } from '../../styles/animations';

const ConfigContainer = styled.div`
  animation: ${fadeIn} 0.5s ease;
`;

const Section = styled.section`
  background-color: var(--surface);
  border-radius: var(--border-radius);
  padding: var(--spacing-lg);
  box-shadow: var(--box-shadow);
  margin-bottom: var(--spacing-lg);
  animation: ${slideInUp} 0.5s ease;
`;

const SectionTitle = styled.h2`
  margin-bottom: var(--spacing-md);
  color: var(--textPrimary);
  font-weight: 600;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  
  &::before {
    content: '';
    display: block;
    width: 4px;
    height: 20px;
    background-color: var(--primary);
    border-radius: 2px;
    margin-right: var(--spacing-sm);
  }
`;

const OptionGroup = styled.div`
  margin-bottom: var(--spacing-md);
`;

const OptionLabel = styled.label`
  display: block;
  margin-bottom: var(--spacing-xs);
  color: var(--textPrimary);
  font-weight: 500;
`;

const OptionDescription = styled.p`
  color: var(--textSecondary);
  font-size: 0.9rem;
  margin-bottom: var(--spacing-sm);
`;

const ThemeSelector = styled.div`
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-sm);
`;

const ThemeOption = styled.div<{ $active: boolean; $themeType: 'light' | 'dark' }>`
  width: 100px;
  height: 70px;
  border-radius: var(--border-radius);
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: transform 0.3s, box-shadow 0.3s;
  
  background-color: ${props => props.$themeType === 'light' ? '#f5f7fa' : '#121212'};
  border: 2px solid ${props => props.$active ? 'var(--primary)' : 'var(--border)'};
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--box-shadow-hover);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: ${props => props.$themeType === 'light' ? '#6200ee' : '#bb86fc'};
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 30px;
    left: 10px;
    width: 50%;
    height: 10px;
    border-radius: 5px;
    background-color: ${props => props.$themeType === 'light' ? '#333333' : '#ffffff'};
    opacity: 0.7;
  }
`;

const ThemeLabel = styled.div<{ $themeType: 'light' | 'dark' }>`
  text-align: center;
  margin-top: var(--spacing-xs);
  font-size: 0.9rem;
  color: ${props => props.$themeType === 'light' ? 'var(--textPrimary)' : '#ffffff'};
`;

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  
  &:checked + span {
    background-color: var(--primary);
  }
  
  &:checked + span:before {
    transform: translateX(26px);
  }
  
  &:focus + span {
    box-shadow: 0 0 1px var(--primary);
  }
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--border);
  transition: 0.4s;
  border-radius: 34px;
  
  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const Button = styled.button`
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  
  &:hover {
    background-color: var(--primaryDark);
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

const SuccessMessage = styled.div`
  background-color: var(--success);
  color: white;
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
  margin-top: var(--spacing-md);
  animation: ${fadeIn} 0.3s ease;
`;

const Configuracoes: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [notificacoesAtivas, setNotificacoesAtivas] = useState(true);
  const [lembretesVencimento, setLembretesVencimento] = useState(3);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
  };
  
  const handleSaveSettings = () => {
    // Aqui você salvaria as configurações em uma API ou localStorage
    localStorage.setItem('notificacoesAtivas', JSON.stringify(notificacoesAtivas));
    localStorage.setItem('lembretesVencimento', lembretesVencimento.toString());
    
    // Mostrar mensagem de sucesso
    setShowSuccess(true);
    
    // Esconder mensagem após 3 segundos
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };
  
  return (
    <ConfigContainer>
      <Section>
        <SectionTitle>Aparência</SectionTitle>
        
        <OptionGroup>
          <OptionLabel>Tema</OptionLabel>
          <OptionDescription>
            Escolha entre o tema claro e escuro para a interface do aplicativo.
          </OptionDescription>
          
          <ThemeSelector>
            <div>
              <ThemeOption 
                $active={theme.name === 'light'} 
                $themeType="light"
                onClick={() => handleThemeChange('light')}
              />
              <ThemeLabel $themeType="light">Claro</ThemeLabel>
            </div>
            
            <div>
              <ThemeOption 
                $active={theme.name === 'dark'} 
                $themeType="dark"
                onClick={() => handleThemeChange('dark')}
              />
              <ThemeLabel $themeType="dark">Escuro</ThemeLabel>
            </div>
          </ThemeSelector>
        </OptionGroup>
      </Section>
      
      <Section>
        <SectionTitle>Notificações</SectionTitle>
        
        <OptionGroup>
          <OptionLabel>Ativar notificações</OptionLabel>
          <OptionDescription>
            Receba alertas sobre vencimentos, metas e dicas financeiras.
          </OptionDescription>
          
          <Switch>
            <SwitchInput 
              type="checkbox" 
              checked={notificacoesAtivas}
              onChange={(e) => setNotificacoesAtivas(e.target.checked)}
            />
            <Slider />
          </Switch>
        </OptionGroup>
        
        <OptionGroup>
          <OptionLabel htmlFor="lembretesVencimento">
            Lembretes de vencimento (dias antes)
          </OptionLabel>
          <OptionDescription>
            Quantos dias antes você deseja ser lembrado sobre contas a vencer.
          </OptionDescription>
          
          <select 
            id="lembretesVencimento"
            value={lembretesVencimento}
            onChange={(e) => setLembretesVencimento(Number(e.target.value))}
            style={{ 
              padding: '0.5rem', 
              borderRadius: 'var(--border-radius-sm)',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--surface)',
              color: 'var(--textPrimary)'
            }}
          >
            <option value={1}>1 dia antes</option>
            <option value={3}>3 dias antes</option>
            <option value={5}>5 dias antes</option>
            <option value={7}>7 dias antes</option>
          </select>
        </OptionGroup>
      </Section>
      
      <Button onClick={handleSaveSettings}>
        Salvar Configurações
      </Button>
      
      {showSuccess && (
        <SuccessMessage>
          Configurações salvas com sucesso!
        </SuccessMessage>
      )}
    </ConfigContainer>
  );
};

export default Configuracoes;
