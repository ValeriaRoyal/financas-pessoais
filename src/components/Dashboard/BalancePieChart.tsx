import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../contexts/ThemeContext';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

// Registrar os componentes necessários do Chart.js
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

interface BalancePieChartProps {
  totalReceitas: number;
  totalDespesas: number;
}

const PieChartContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ChartTitle = styled.h4`
  margin-top: 0;
  margin-bottom: var(--spacing-sm);
  color: var(--textPrimary);
  font-size: 0.9rem;
  font-weight: 500;
  text-align: center;
`;

const ChartWrapper = styled.div`
  width: 100%;
  max-width: 200px;
  height: 200px;
  position: relative;
`;

const BalancePieChart: React.FC<BalancePieChartProps> = ({ totalReceitas, totalDespesas }) => {
  const { theme } = useTheme();
  
  // Cores para o gráfico adaptadas ao tema
  const getEntradaColor = () => theme.name === 'dark' ? '#66cc66' : '#006400';
  const getSaidaColor = () => theme.name === 'dark' ? '#ff6666' : '#8B0000';
  
  // Dados para o gráfico de pizza
  const chartData = {
    labels: ['Entradas', 'Saídas'],
    datasets: [
      {
        data: [totalReceitas, totalDespesas],
        backgroundColor: [
          getEntradaColor(),
          getSaidaColor()
        ],
        borderColor: [
          theme.name === 'dark' ? '#333333' : '#ffffff',
          theme.name === 'dark' ? '#333333' : '#ffffff'
        ],
        borderWidth: 1,
      },
    ],
  };
  
  // Opções do gráfico
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: theme.name === 'dark' ? '#ffffff' : '#333333',
          font: {
            size: 12
          },
          padding: 10
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            
            return `${label}: ${new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(value)} (${percentage}%)`;
          }
        }
      }
    },
  };
  
  return (
    <PieChartContainer>
      <ChartTitle>Distribuição Financeira</ChartTitle>
      <ChartWrapper>
        <Pie data={chartData} options={chartOptions} />
      </ChartWrapper>
    </PieChartContainer>
  );
};

export default BalancePieChart;
