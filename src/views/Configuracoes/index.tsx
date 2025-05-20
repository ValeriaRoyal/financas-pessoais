import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTheme, ThemeName } from '../../contexts/ThemeContext';
import { fadeIn, slideInUp } from '../../styles/animations';
import AnimatedButton from '../../components/common/AnimatedButton';

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
  font-weight: 500; /* Adicionado para melhorar legibilidade */
`;

const ThemeSelector = styled.div`
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-sm);
  flex-wrap: wrap;
`;

const ThemeOption = styled.div<{ $active: boolean; $themeType: ThemeName }>`
  width: 100px;
  height: 70px;
  border-radius: var(--border-radius);
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: transform 0.3s, box-shadow 0.3s;
  
  background-color: ${props => {
    switch(props.$themeType) {
      case 'dark': return '#121212';
      case 'high-contrast': return '#000000';
      case 'system': return 'linear-gradient(to right, #f5f7fa 50%, #121212 50%)';
      default: return '#f5f7fa';
    }
  }};
  
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
    background-color: ${props => {
      switch(props.$themeType) {
        case 'dark': return '#bb86fc';
        case 'high-contrast': return '#ffff00';
        case 'system': return 'linear-gradient(to right, #6200ee 50%, #bb86fc 50%)';
        default: return '#6200ee';
      }
    }};
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 30px;
    left: 10px;
    width: 50%;
    height: 10px;
    border-radius: 5px;
    background-color: ${props => {
      switch(props.$themeType) {
        case 'dark': return '#ffffff';
        case 'high-contrast': return '#ffffff';
        case 'system': return 'linear-gradient(to right, #333333 50%, #ffffff 50%)';
        default: return '#333333';
      }
    }};
    opacity: 0.7;
  }
`;

const ThemeLabel = styled.div<{ $themeType: ThemeName }>`
  text-align: center;
  margin-top: var(--spacing-xs);
  font-size: 0.9rem;
  color: var(--textPrimary);
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

const Button = styled(AnimatedButton)`
  margin-top: var(--spacing-md);
`;

const SuccessMessage = styled.div`
  background-color: var(--success);
  color: white;
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
  margin-top: var(--spacing-md);
  animation: ${fadeIn} 0.3s ease;
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  margin-top: var(--spacing-sm);
`;

const RadioOption = styled.label`
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  cursor: pointer;
  padding: var(--spacing-xs) 0;
  
  &:hover {
    color: var(--primary);
  }
`;

const RadioInput = styled.input`
  margin: 0;
  cursor: pointer;
`;

const Configuracoes: React.FC = () => {
  const { themeName, setTheme } = useTheme();
  const [notificacoesAtivas, setNotificacoesAtivas] = useState(true);
  const [lembretesVencimento, setLembretesVencimento] = useState(3);
  const [modoAutomatico, setModoAutomatico] = useState(false);
  const [horaInicioEscuro, setHoraInicioEscuro] = useState('20:00');
  const [horaFimEscuro, setHoraFimEscuro] = useState('06:00');
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Carregar configurações salvas
  useEffect(() => {
    const savedNotificacoes = localStorage.getItem('notificacoesAtivas');
    if (savedNotificacoes) {
      setNotificacoesAtivas(JSON.parse(savedNotificacoes));
    }
    
    const savedLembretes = localStorage.getItem('lembretesVencimento');
    if (savedLembretes) {
      setLembretesVencimento(Number(savedLembretes));
    }
    
    const savedModoAutomatico = localStorage.getItem('modoAutomatico');
    if (savedModoAutomatico) {
      setModoAutomatico(JSON.parse(savedModoAutomatico));
    }
    
    const savedHoraInicio = localStorage.getItem('horaInicioEscuro');
    if (savedHoraInicio) {
      setHoraInicioEscuro(savedHoraInicio);
    }
    
    const savedHoraFim = localStorage.getItem('horaFimEscuro');
    if (savedHoraFim) {
      setHoraFimEscuro(savedHoraFim);
    }
  }, []);
  
  // Aplicar modo automático se estiver ativado
  useEffect(() => {
    if (modoAutomatico) {
      const checkTime = () => {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const currentTime = currentHour * 60 + currentMinute;
        
        const [startHour, startMinute] = horaInicioEscuro.split(':').map(Number);
        const [endHour, endMinute] = horaFimEscuro.split(':').map(Number);
        
        const startTime = startHour * 60 + startMinute;
        const endTime = endHour * 60 + endMinute;
        
        // Verificar se estamos no período noturno
        let isDarkTime;
        if (startTime > endTime) {
          // Período noturno cruza a meia-noite
          isDarkTime = currentTime >= startTime || currentTime <= endTime;
        } else {
          // Período noturno no mesmo dia
          isDarkTime = currentTime >= startTime && currentTime <= endTime;
        }
        
        // Aplicar tema apropriado
        if (isDarkTime && themeName !== 'dark') {
          setTheme('dark');
        } else if (!isDarkTime && themeName !== 'light') {
          setTheme('light');
        }
      };
      
      // Verificar imediatamente e depois a cada minuto
      checkTime();
      const interval = setInterval(checkTime, 60000);
      
      return () => clearInterval(interval);
    }
  }, [modoAutomatico, horaInicioEscuro, horaFimEscuro, themeName, setTheme]);
  
  const handleSaveSettings = () => {
    // Salvar configurações
    localStorage.setItem('notificacoesAtivas', JSON.stringify(notificacoesAtivas));
    localStorage.setItem('lembretesVencimento', lembretesVencimento.toString());
    localStorage.setItem('modoAutomatico', JSON.stringify(modoAutomatico));
    localStorage.setItem('horaInicioEscuro', horaInicioEscuro);
    localStorage.setItem('horaFimEscuro', horaFimEscuro);
    
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
            Escolha entre os temas disponíveis para a interface do aplicativo.
          </OptionDescription>
          
          <ThemeSelector>
            <div>
              <ThemeOption 
                $active={themeName === 'light'} 
                $themeType="light"
                onClick={() => setTheme('light')}
              />
              <ThemeLabel $themeType="light">Claro</ThemeLabel>
            </div>
            
            <div>
              <ThemeOption 
                $active={themeName === 'dark'} 
                $themeType="dark"
                onClick={() => setTheme('dark')}
              />
              <ThemeLabel $themeType="dark">Escuro</ThemeLabel>
            </div>
            
            <div>
              <ThemeOption 
                $active={themeName === 'high-contrast'} 
                $themeType="high-contrast"
                onClick={() => setTheme('high-contrast')}
              />
              <ThemeLabel $themeType="high-contrast">Alto Contraste</ThemeLabel>
            </div>
            
            <div>
              <ThemeOption 
                $active={themeName === 'system'} 
                $themeType="system"
                onClick={() => setTheme('system')}
              />
              <ThemeLabel $themeType="system">Sistema</ThemeLabel>
            </div>
          </ThemeSelector>
        </OptionGroup>
        
        <OptionGroup>
          <OptionLabel>Modo Automático</OptionLabel>
          <OptionDescription>
            Alternar automaticamente entre os temas claro e escuro com base no horário.
          </OptionDescription>
          
          <Switch>
            <SwitchInput 
              type="checkbox" 
              checked={modoAutomatico}
              onChange={(e) => setModoAutomatico(e.target.checked)}
            />
            <Slider />
          </Switch>
          
          {modoAutomatico && (
            <div style={{ marginTop: 'var(--spacing-md)' }}>
              <div style={{ display: 'flex', gap: 'var(--spacing-md)', flexWrap: 'wrap' }}>
                <div>
                  <OptionLabel htmlFor="horaInicioEscuro">Início do modo escuro</OptionLabel>
                  <input 
                    type="time" 
                    id="horaInicioEscuro" 
                    value={horaInicioEscuro}
                    onChange={(e) => setHoraInicioEscuro(e.target.value)}
                    style={{ 
                      padding: '0.5rem', 
                      borderRadius: 'var(--border-radius-sm)',
                      border: '1px solid var(--border)',
                      backgroundColor: 'var(--surface)',
                      color: 'var(--textPrimary)'
                    }}
                  />
                </div>
                
                <div>
                  <OptionLabel htmlFor="horaFimEscuro">Fim do modo escuro</OptionLabel>
                  <input 
                    type="time" 
                    id="horaFimEscuro" 
                    value={horaFimEscuro}
                    onChange={(e) => setHoraFimEscuro(e.target.value)}
                    style={{ 
                      padding: '0.5rem', 
                      borderRadius: 'var(--border-radius-sm)',
                      border: '1px solid var(--border)',
                      backgroundColor: 'var(--surface)',
                      color: 'var(--textPrimary)'
                    }}
                  />
                </div>
              </div>
              <OptionDescription style={{ marginTop: 'var(--spacing-xs)' }}>
                O modo escuro será ativado automaticamente entre {horaInicioEscuro} e {horaFimEscuro}.
              </OptionDescription>
            </div>
          )}
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
        
        {notificacoesAtivas && (
          <OptionGroup>
            <OptionLabel>Lembretes de vencimento</OptionLabel>
            <OptionDescription>
              Quantos dias antes você deseja ser lembrado sobre contas a vencer.
            </OptionDescription>
            
            <RadioGroup>
              <RadioOption>
                <RadioInput 
                  type="radio" 
                  name="lembretes" 
                  value={1} 
                  checked={lembretesVencimento === 1}
                  onChange={() => setLembretesVencimento(1)}
                />
                1 dia antes
              </RadioOption>
              
              <RadioOption>
                <RadioInput 
                  type="radio" 
                  name="lembretes" 
                  value={3} 
                  checked={lembretesVencimento === 3}
                  onChange={() => setLembretesVencimento(3)}
                />
                3 dias antes
              </RadioOption>
              
              <RadioOption>
                <RadioInput 
                  type="radio" 
                  name="lembretes" 
                  value={5} 
                  checked={lembretesVencimento === 5}
                  onChange={() => setLembretesVencimento(5)}
                />
                5 dias antes
              </RadioOption>
              
              <RadioOption>
                <RadioInput 
                  type="radio" 
                  name="lembretes" 
                  value={7} 
                  checked={lembretesVencimento === 7}
                  onChange={() => setLembretesVencimento(7)}
                />
                7 dias antes
              </RadioOption>
            </RadioGroup>
          </OptionGroup>
        )}
      </Section>
      
      <Button $primary onClick={handleSaveSettings}>
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
