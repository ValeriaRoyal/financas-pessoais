import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../contexts/ThemeContext';

interface BalanceChartDonutProps {
  totalReceitas: number;
  totalDespesas: number;
}

interface ItemBalanco {
  tipo: string;
  valor: number;
  percentual: number;
}

const DonutChartContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DonutChart = styled.div`
  width: 100%;
  height: 100%;
  max-width: 200px;
  max-height: 200px;
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

const DonutValues = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
`;

const DonutValue = styled.div<{ $color: string }>`
  font-size: 0.9rem;
  font-weight: bold;
  text-align: center;
  color: ${props => props.$color};
`;

const DonutLabel = styled.div`
  font-size: 0.7rem;
  color: var(--textSecondary);
  text-align: center;
  font-weight: 500;
`;

const BalanceChartDonut: React.FC<BalanceChartDonutProps> = ({ totalReceitas, totalDespesas }) => {
  const { theme } = useTheme();
  
  // Calcular os percentuais
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
        <DonutHole>
          <DonutValues>
            <DonutValue $color={getEntradaColor()}>
              {formatarMoeda(totalReceitas)}
            </DonutValue>
            <DonutValue $color={getSaidaColor()}>
              {formatarMoeda(totalDespesas)}
            </DonutValue>
          </DonutValues>
        </DonutHole>
      </DonutChart>
    </DonutChartContainer>
  );
};

export default BalanceChartDonut;
