import React from 'react';
import styled from 'styled-components';

interface BalanceChartProps {
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

const ChartContainer = styled.div`
  background-color: var(--surface-color);
  border-radius: var(--border-radius);
  padding: var(--spacing-lg);
  box-shadow: var(--box-shadow);
  grid-column: 1 / -1;
`;

const ChartTitle = styled.h3`
  margin-top: 0;
  margin-bottom: var(--spacing-md);
  color: var(--text-color);
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
`;

const BarGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
`;

const Bar = styled.div<{ $height: string; $color: string }>`
  width: 80px;
  height: ${props => props.$height};
  background-color: ${props => props.$color};
  border-radius: 8px 8px 0 0;
  transition: height 0.5s ease;
  position: relative;
`;

const BarLabel = styled.div`
  margin-top: var(--spacing-sm);
  font-size: 0.9rem;
  color: var(--text-secondary);
  text-align: center;
`;

const BarValue = styled.div`
  font-size: 1rem;
  font-weight: 500;
  margin-top: var(--spacing-xs);
  color: var(--text-color);
`;

const SummaryContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background-color: rgba(0, 0, 0, 0.02);
  border-radius: var(--border-radius);
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SummaryLabel = styled.span`
  font-size: 0.9rem;
  color: var(--text-secondary);
`;

const SummaryValue = styled.span<{ $color?: string }>`
  font-size: 1.1rem;
  font-weight: 500;
  color: ${props => props.$color || 'var(--text-color)'};
`;

const SummaryDivider = styled.div`
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
  margin: var(--spacing-xs) 0;
`;

const BalanceChart: React.FC<BalanceChartProps> = ({ totalReceitas, totalDespesas, saldo }) => {
  // Calcular a altura máxima das barras
  const maxValue = Math.max(totalReceitas, totalDespesas);
  const receitasHeight = maxValue > 0 ? `${(totalReceitas / maxValue) * 100}%` : '0%';
  const despesasHeight = maxValue > 0 ? `${(totalDespesas / maxValue) * 100}%` : '0%';
  
  // Determinar a cor do saldo com base no valor
  const getSaldoColor = () => {
    if (saldo < 0) return 'var(--error-color)'; // Vermelho para saldo negativo
    if (saldo < totalReceitas * 0.2) return 'var(--warning-color)'; // Amarelo para saldo baixo (menos de 20% das receitas)
    return 'var(--success-color)'; // Verde para saldo saudável
  };
  
  // Formatar valores como moeda brasileira
  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };
  
  return (
    <ChartContainer>
      <ChartTitle>Balanço Financeiro</ChartTitle>
      
      <ChartContent>
        <ChartVisual>
          <BarContainer>
            <BarGroup>
              <Bar $height={receitasHeight} $color="var(--success-color)" />
              <BarLabel>Entradas</BarLabel>
              <BarValue>{formatarMoeda(totalReceitas)}</BarValue>
            </BarGroup>
            
            <BarGroup>
              <Bar $height={despesasHeight} $color="var(--error-color)" />
              <BarLabel>Saídas</BarLabel>
              <BarValue>{formatarMoeda(totalDespesas)}</BarValue>
            </BarGroup>
          </BarContainer>
        </ChartVisual>
        
        <SummaryContainer>
          <SummaryItem>
            <SummaryLabel>Total de Entradas</SummaryLabel>
            <SummaryValue $color="var(--success-color)">{formatarMoeda(totalReceitas)}</SummaryValue>
          </SummaryItem>
          
          <SummaryItem>
            <SummaryLabel>Total de Saídas</SummaryLabel>
            <SummaryValue $color="var(--error-color)">{formatarMoeda(totalDespesas)}</SummaryValue>
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
