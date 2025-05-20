import React from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../styles/animations';
import { useTheme } from '../../contexts/ThemeContext';

interface ResumoCardProps {
  titulo: string;
  valor: number;
  icone: string;
  cor: string;
  tendencia?: 'up' | 'down' | 'neutral';
  percentual?: number;
}

const CardContainer = styled.div`
  background-color: var(--surface);
  border-radius: var(--border-radius);
  padding: var(--spacing-lg);
  box-shadow: var(--box-shadow);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  animation: ${fadeIn} 0.5s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--box-shadow-hover);
  }
  
  @media (max-width: 320px) {
    padding: var(--spacing-md);
  }
`;

const IconContainer = styled.div<{ $corIcone: string }>`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: ${props => `${props.$corIcone}15`}; /* Cor com 15% de opacidade */
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$corIcone};
  font-size: 1.5rem;
  margin-bottom: var(--spacing-md);
  transition: transform 0.3s;
  
  ${CardContainer}:hover & {
    transform: scale(1.1);
  }
  
  @media (max-width: 320px) {
    width: 40px;
    height: 40px;
    font-size: 1.25rem;
    border-radius: 8px;
  }
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  color: var(--textPrimary);
  font-weight: 600;
`;

const CardValue = styled.div`
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--textPrimary);
  margin: var(--spacing-sm) 0;
  
  @media (max-width: 320px) {
    font-size: 1.5rem;
    word-break: break-word;
  }
`;

const TendenciaContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: auto;
`;

const TendenciaValor = styled.span<{ $tendencia: 'up' | 'down' | 'neutral' }>`
  color: ${props => {
    switch (props.$tendencia) {
      case 'up': return '#2e7d32'; // Cor verde escura fixa para garantir contraste
      case 'down': return '#b71c1c'; // Cor vermelha escura fixa para garantir contraste
      default: return 'var(--textPrimary)';
    }
  }};
  font-weight: 700; // Aumentado para melhorar o contraste
  font-size: 0.9rem;
  display: flex;
  align-items: center;
`;

const TendenciaIcone = styled.span`
  margin-right: 0.25rem;
`;

const TendenciaTexto = styled.span`
  color: var(--textPrimary);
  font-size: 0.9rem;
  font-weight: 600;
`;

const formatarMoeda = (valor: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
};

const ResumoCard: React.FC<ResumoCardProps> = ({ 
  titulo, 
  valor, 
  icone, 
  cor, 
  tendencia, 
  percentual 
}) => {
  const { theme } = useTheme();
  
  return (
    <CardContainer>
      <IconContainer $corIcone={cor}>
        {/* Aqui você pode usar um componente de ícone ou emoji */}
        {icone === 'arrow-up-circle' && '↑'}
        {icone === 'arrow-down-circle' && '↓'}
        {icone === 'wallet' && '👛'}
        {icone === 'calendar' && '📅'}
        {icone === 'credit-card' && '💳'}
        {icone === 'shield' && '🛡️'}
        {icone === 'trending-up' && '📈'}
      </IconContainer>
      
      <CardTitle>{titulo}</CardTitle>
      <CardValue>{formatarMoeda(valor)}</CardValue>
      
      {tendencia && percentual !== undefined && (
        <TendenciaContainer>
          <TendenciaValor $tendencia={tendencia}>
            <TendenciaIcone>
              {tendencia === 'up' && '↑'}
              {tendencia === 'down' && '↓'}
              {tendencia === 'neutral' && '→'}
            </TendenciaIcone>
            {Math.abs(percentual).toFixed(1)}%
          </TendenciaValor>
          <TendenciaTexto>vs. mês anterior</TendenciaTexto>
        </TendenciaContainer>
      )}
    </CardContainer>
  );
};

export default ResumoCard;
