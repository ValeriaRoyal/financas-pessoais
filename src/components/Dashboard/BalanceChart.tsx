import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../contexts/ThemeContext';

interface BalanceChartProps {
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

const ChartContainer = styled.div`
  background-color: var(--surface);
  border-radius: var(--border-radius);
  padding: var(--spacing-lg);
  box-shadow: var(--box-shadow);
  grid-column: 1 / -1;
`;

const ChartTitle = styled.h3`
  margin-top: 0;
  margin-bottom: var(--spacing-md);
  color: var(--textPrimary);
  font-size: 1.1rem;
  font-weight: 500;
`;

const ChartContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
  
  @media (max-width: 320px) {
    gap: var(--spacing-sm);
  }
`;

const ChartVisual = styled.div`
  flex: 1;
  height: 200px;
  position: relative;
  
  @media (min-width: 768px) {
    height: 250px;
  }
`;

const BarContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: flex-end;
  justify-content: center;
  gap: var(--spacing-lg);
  
  @media (max-width: 320px) {
    gap: var(--spacing-md);
  }
`;

const BarGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
  
  @media (max-width: 320px) {
    width: 60px;
  }
`;

const Bar = styled.div<{ $height: string; $color: string }>`
  width: 80px;
  height: ${props => props.$height};
  background-color: ${props => props.$color};
  border-radius: 8px 8px 0 0;
  transition: height 0.5s ease;
  position: relative;
  
  @media (max-width: 320px) {
    width: 60px;
  }
`;

const BarLabel = styled.div`
  margin-top: var(--spacing-sm);
  font-size: 0.9rem;
  color: var(--textPrimary);
  text-align: center;
  font-weight: 600;
  text-shadow: 0 0 2px rgba(0,0,0,0.3);
`;

const BarValue = styled.div`
  font-size: 1rem;
  font-weight: 500;
  margin-top: var(--spacing-xs);
  color: var(--textPrimary);
  
  @media (max-width: 320px) {
    font-size: 0.85rem;
    word-break: break-word;
  }
`;

const SummaryContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background-color: var(--surface);
  opacity: 0.9;
  border-radius: var(--border-radius);
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SummaryLabel = styled.span`
  font-size: 0.9rem;
  color: var(--textSecondary);
  font-weight: 500;
`;

const SummaryValue = styled.span<{ $color?: string }>`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.$color || 'var(--textPrimary)'};
`;

const SummaryDivider = styled.div`
  height: 1px;
  background-color: var(--border);
  margin: var(--spacing-xs) 0;
`;

const BalanceChart: React.FC<BalanceChartProps> = ({ totalReceitas, totalDespesas, saldo }) => {
  const { theme } = useTheme();
  
  // Calcular a altura máxima das barras
  const maxValue = Math.max(totalReceitas, totalDespesas);
  const receitasHeight = maxValue > 0 ? `${(totalReceitas / maxValue) * 100}%` : '0%';
  const despesasHeight = maxValue > 0 ? `${(totalDespesas / maxValue) * 100}%` : '0%';
  
  // Determinar a cor do saldo com base no valor e no tema
  const getSaldoColor = () => {
    if (theme.name === 'dark') {
      if (saldo < 0) return '#ff6666'; // Vermelho mais claro para tema escuro
      if (saldo < totalReceitas * 0.2) return '#ffcc66'; // Amarelo mais claro para tema escuro
      return '#66cc66'; // Verde mais claro para tema escuro
    } else {
      if (saldo < 0) return '#8B0000'; // Vermelho mais escuro para saldo negativo
      if (saldo < totalReceitas * 0.2) return '#B8860B'; // Amarelo mais escuro para saldo baixo
      return '#006400'; // Verde mais escuro para saldo saudável
    }
  };
  
  // Formatar valores como moeda brasileira
  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };
  
  // Cores para as barras adaptadas ao tema
  const getEntradaColor = () => theme.name === 'dark' ? '#66cc66' : '#006400';
  const getSaidaColor = () => theme.name === 'dark' ? '#ff6666' : '#8B0000';
  
  return (
    <ChartContainer>
      <ChartTitle>Balanço Financeiro</ChartTitle>
      
      <ChartContent>
        <ChartVisual>
          <BarContainer>
            <BarGroup>
              <Bar $height={receitasHeight} $color={getEntradaColor()} />
              <BarLabel>Entradas</BarLabel>
              <BarValue>{formatarMoeda(totalReceitas)}</BarValue>
            </BarGroup>
            
            <BarGroup>
              <Bar $height={despesasHeight} $color={getSaidaColor()} />
              <BarLabel>Saídas</BarLabel>
              <BarValue>{formatarMoeda(totalDespesas)}</BarValue>
            </BarGroup>
          </BarContainer>
        </ChartVisual>
        
        <SummaryContainer>
          <SummaryItem>
            <SummaryLabel>Total de Entradas</SummaryLabel>
            <SummaryValue $color={getEntradaColor()}>{formatarMoeda(totalReceitas)}</SummaryValue>
          </SummaryItem>
          
          <SummaryItem>
            <SummaryLabel>Total de Saídas</SummaryLabel>
            <SummaryValue $color={getSaidaColor()}>{formatarMoeda(totalDespesas)}</SummaryValue>
          </SummaryItem>
          
          <SummaryDivider />
          
          <SummaryItem>
            <SummaryLabel>Saldo</SummaryLabel>
            <SummaryValue $color={getSaldoColor()}>{formatarMoeda(saldo)}</SummaryValue>
          </SummaryItem>
          
          <SummaryItem>
            <SummaryLabel>Percentual de Gastos</SummaryLabel>
            <SummaryValue>
              {totalReceitas > 0 ? `${Math.round((totalDespesas / totalReceitas) * 100)}%` : '0%'}
            </SummaryValue>
          </SummaryItem>
        </SummaryContainer>
      </ChartContent>
    </ChartContainer>
  );
};

export default BalanceChart;
