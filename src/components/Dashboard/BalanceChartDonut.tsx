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
`;

const BalanceChartDonut: React.FC<BalanceChartDonutProps> = ({ totalReceitas, totalDespesas }) => {
  const { theme } = useTheme();
  
  // Cores para os tipos de transação
  const getEntradaColor = () => theme.name === 'dark' ? '#66cc66' : '#006400';
  const getSaidaColor = () => theme.name === 'dark' ? '#ff6666' : '#8B0000';
  
  // Criar segmentos para o gráfico
  const criarSegmentos = () => {
    const total = totalReceitas + totalDespesas;
    
    // Se não houver valores, retornar um círculo vazio
    if (total === 0) {
      return [{
        rotacao: 0,
        angulo: 360,
        cor: 'var(--border)'
      }];
    }
    
    // Calcular ângulos
    const anguloReceitas = (totalReceitas / total) * 360;
    const anguloSaidas = 360 - anguloReceitas;
    
    return [
      {
        rotacao: 0,
        angulo: anguloReceitas,
        cor: getEntradaColor()
      },
      {
        rotacao: anguloReceitas,
        angulo: anguloSaidas,
        cor: getSaidaColor()
      }
    ];
  };
  
  const segmentos = criarSegmentos();
  
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
        <DonutHole />
      </DonutChart>
    </DonutChartContainer>
  );
};

export default BalanceChartDonut;
