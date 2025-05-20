import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../contexts/ThemeContext';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
  Scale,
  Tick
} from 'chart.js';

// Registrar os componentes necessários do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface BalanceLineChartProps {
  totalReceitas: number;
  totalDespesas: number;
}

const ChartContainer = styled.div`
  width: 100%;
  height: 250px;
  margin-top: var(--spacing-lg);
  padding: var(--spacing-md);
  background-color: var(--surface);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
`;

const ChartTitle = styled.h4`
  margin-top: 0;
  margin-bottom: var(--spacing-md);
  color: var(--textPrimary);
  font-size: 1rem;
  font-weight: 500;
`;

// Função para gerar dados de exemplo para o gráfico
const generateChartData = (theme: any, totalReceitas: number, totalDespesas: number) => {
  // Criar dados simulados baseados nos totais atuais
  const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
  
  // Gerar valores aleatórios que somam aproximadamente o total
  const gerarValoresMensais = (total: number) => {
    const valores = [];
    let valorRestante = total;
    
    for (let i = 0; i < 5; i++) {
      // Gerar um valor entre 70% e 130% da média mensal
      const media = valorRestante / (6 - i);
      const min = media * 0.7;
      const max = media * 1.3;
      const valor = Math.round(min + Math.random() * (max - min));
      
      valores.push(valor);
      valorRestante -= valor;
    }
    
    // O último mês é o restante para garantir que a soma seja igual ao total
    valores.push(Math.max(0, Math.round(valorRestante)));
    
    return valores;
  };
  
  const receitasMensais = gerarValoresMensais(totalReceitas);
  const despesasMensais = gerarValoresMensais(totalDespesas);
  
  return {
    labels: meses,
    datasets: [
      {
        label: 'Entradas',
        data: receitasMensais,
        borderColor: theme.name === 'dark' ? '#66cc66' : '#006400',
        backgroundColor: theme.name === 'dark' ? 'rgba(102, 204, 102, 0.2)' : 'rgba(0, 100, 0, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Saídas',
        data: despesasMensais,
        borderColor: theme.name === 'dark' ? '#ff6666' : '#8B0000',
        backgroundColor: theme.name === 'dark' ? 'rgba(255, 102, 102, 0.2)' : 'rgba(139, 0, 0, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };
};

// Opções do gráfico
const getChartOptions = (theme: any): ChartOptions<'line'> => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: theme.name === 'dark' ? '#ffffff' : '#333333',
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: theme.name === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          color: theme.name === 'dark' ? '#cccccc' : '#333333'
        }
      },
      y: {
        grid: {
          color: theme.name === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          color: theme.name === 'dark' ? '#cccccc' : '#333333',
          callback: function(this: Scale<any>, tickValue: number | string) {
            if (typeof tickValue === 'number') {
              return new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                notation: 'compact'
              }).format(tickValue);
            }
            return tickValue;
          }
        }
      }
    }
  };
};

const BalanceLineChart: React.FC<BalanceLineChartProps> = ({ totalReceitas, totalDespesas }) => {
  const { theme } = useTheme();
  const [chartData, setChartData] = useState<any>(null);
  
  useEffect(() => {
    setChartData(generateChartData(theme, totalReceitas, totalDespesas));
  }, [theme, totalReceitas, totalDespesas]);
  
  if (!chartData) return null;
  
  return (
    <ChartContainer>
      <ChartTitle>Evolução Financeira (Últimos 6 meses)</ChartTitle>
      <div style={{ height: '200px' }}>
        <Line data={chartData} options={getChartOptions(theme)} />
      </div>
    </ChartContainer>
  );
};

export default BalanceLineChart;
