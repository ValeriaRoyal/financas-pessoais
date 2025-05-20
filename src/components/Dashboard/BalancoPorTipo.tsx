import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../contexts/ThemeContext';

interface BalancoPorTipoProps {
  totalReceitas: number;
  totalDespesas: number;
}

interface ItemBalanco {
  tipo: string;
  valor: number;
  percentual: number;
}

const ChartContainer = styled.div`
  background-color: var(--surface);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--box-shadow);
`;

const ChartTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: var(--textPrimary);
`;

const DonutChartContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto;
  
  @media (max-width: 320px) {
    width: 160px;
    height: 160px;
  }
`;

const DonutChart = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
`;

const DonutSegment = styled.div<{ 
  $rotacao: number; 
  $angulo: number; 
  $cor: string; 
}>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: rotate(${props => props.$rotacao}deg);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${props => props.$cor};
    transform-origin: center;
    transform: rotate(${props => props.$angulo}deg);
  }
`;

const DonutHole = styled.div`
  position: absolute;
  width: 60%;
  height: 60%;
  background-color: var(--surface);
  border-radius: 50%;
  top: 20%;
  left: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const DonutTotal = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  color: var(--textPrimary);
`;

const DonutLabel = styled.div`
  font-size: 0.8rem;
  color: var(--textSecondary);
  text-align: center;
  font-weight: 500;
`;

const ChartLegend = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1.5rem;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ColorIndicator = styled.div<{ $cor: string }>`
  width: 1rem;
  height: 1rem;
  border-radius: 3px;
  background-color: ${props => props.$cor};
`;

const LegendText = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ItemName = styled.span`
  font-size: 0.9rem;
  color: var(--textPrimary);
  font-weight: 500;
`;

const ItemValue = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--textPrimary);
`;

const BalancoPorTipo: React.FC<BalancoPorTipoProps> = ({ totalReceitas, totalDespesas }) => {
  const { theme } = useTheme();
  
  // Calcular o total e os percentuais
  const total = totalReceitas + totalDespesas;
  const percentualReceitas = total > 0 ? (totalReceitas / total) * 100 : 0;
  const percentualDespesas = total > 0 ? (totalDespesas / total) * 100 : 0;
  
  // Criar dados para o gráfico
  const dados: ItemBalanco[] = [
    { tipo: 'Entradas', valor: totalReceitas, percentual: percentualReceitas },
    { tipo: 'Saídas', valor: totalDespesas, percentual: percentualDespesas }
  ];
  
  // Cores para os tipos de transação
  const getEntradaColor = () => theme.name === 'dark' ? '#66cc66' : '#006400';
  const getSaidaColor = () => theme.name === 'dark' ? '#ff6666' : '#8B0000';
  
  const coresTipos: Record<string, string> = {
    'Entradas': getEntradaColor(),
    'Saídas': getSaidaColor()
  };
  
  // Formatar valor como moeda brasileira
  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };
  
  // Calcular ângulos para o gráfico de rosca
  const calcularSegmentos = () => {
    let rotacaoAtual = 0;
    
    return dados.map(item => {
      const angulo = 3.6 * item.percentual; // 3.6 = 360 / 100
      const segmento = {
        rotacao: rotacaoAtual,
        angulo: angulo,
        cor: coresTipos[item.tipo]
      };
      
      rotacaoAtual += angulo;
      return segmento;
    });
  };
  
  const segmentos = calcularSegmentos();
  
  return (
    <ChartContainer>
      <ChartTitle>Distribuição Financeira</ChartTitle>
      
      <DonutChartContainer>
        <DonutChart>
          {segmentos.map((segmento, index) => (
            <DonutSegment 
              key={index}
              $rotacao={segmento.rotacao}
              $angulo={segmento.angulo}
              $cor={segmento.cor}
            />
          ))}
        </DonutChart>
        <DonutHole>
          <DonutTotal>{formatarMoeda(total)}</DonutTotal>
          <DonutLabel>Total</DonutLabel>
        </DonutHole>
      </DonutChartContainer>
      
      <ChartLegend>
        {dados.map(item => (
          <LegendItem key={item.tipo}>
            <ColorIndicator $cor={coresTipos[item.tipo]} />
            <LegendText>
              <ItemName>{item.tipo}</ItemName>
              <ItemValue>{formatarMoeda(item.valor)} ({item.percentual.toFixed(1)}%)</ItemValue>
            </LegendText>
          </LegendItem>
        ))}
      </ChartLegend>
    </ChartContainer>
  );
};

export default BalancoPorTipo;
