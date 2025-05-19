import React from 'react';
import styled from 'styled-components';

interface ResumoCardProps {
  titulo: string;
  valor: number;
  icone: string;
  cor: string;
  tendencia?: 'up' | 'down' | 'neutral';
  percentual?: number;
}

const CardContainer = styled.div`
  background-color: var(--surface-color);
  border-radius: var(--border-radius);
  padding: var(--spacing-lg);
  box-shadow: var(--box-shadow);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--box-shadow-hover);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  color: var(--text-secondary);
  font-weight: 500;
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
`;

const CardValue = styled.div`
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: var(--spacing-sm);
`;

const TrendContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
`;

const TrendIcon = styled.span<{ $tendencia: 'up' | 'down' | 'neutral' }>`
  color: ${props => 
    props.$tendencia === 'up' 
      ? '#006400' // Verde mais escuro para melhor contraste
      : props.$tendencia === 'down' 
        ? '#8B0000' // Vermelho mais escuro para melhor contraste
        : '#595959'
  };
`;

const TrendValue = styled.span<{ $tendencia: 'up' | 'down' | 'neutral' }>`
  color: ${props => 
    props.$tendencia === 'up' 
      ? '#006400' // Verde mais escuro para melhor contraste
      : props.$tendencia === 'down' 
        ? '#8B0000' // Vermelho mais escuro para melhor contraste
        : '#595959'
  };
  font-weight: 500;
`;

const TrendLabel = styled.span`
  color: #595959; // Cor mais escura para melhor contraste
`;

// Componente para simular ícones (em um projeto real, usaríamos uma biblioteca de ícones)
const Icon = ({ name }: { name: string }) => {
  // Aqui você usaria uma biblioteca como react-icons, feather-icons, etc.
  return <div aria-hidden="true">{name.charAt(0).toUpperCase()}</div>;
};

const ResumoCard: React.FC<ResumoCardProps> = ({ 
  titulo, 
  valor, 
  icone, 
  cor,
  tendencia = 'neutral',
  percentual = 0
}) => {
  // Formatar o valor como moeda brasileira
  const valorFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
  
  // Determinar o ícone de tendência
  const getTrendIcon = () => {
    switch (tendencia) {
      case 'up':
        return '↑';
      case 'down':
        return '↓';
      default:
        return '→';
    }
  };
  
  // Formatar o percentual
  const percentualFormatado = `${percentual > 0 ? '+' : ''}${percentual.toFixed(1)}%`;
  
  return (
    <CardContainer>
      <CardHeader>
        <CardTitle>{titulo}</CardTitle>
        <IconContainer $corIcone={cor}>
          <Icon name={icone} />
        </IconContainer>
      </CardHeader>
      <CardValue>{valorFormatado}</CardValue>
      {percentual !== 0 && (
        <TrendContainer>
          <TrendIcon $tendencia={tendencia}>{getTrendIcon()}</TrendIcon>
          <TrendValue $tendencia={tendencia}>{percentualFormatado}</TrendValue>
          <TrendLabel>desde o mês passado</TrendLabel>
        </TrendContainer>
      )}
    </CardContainer>
  );
};

export default ResumoCard;
