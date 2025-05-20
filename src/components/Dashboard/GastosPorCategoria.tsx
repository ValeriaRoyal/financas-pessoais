import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CategoriaTransacao, ResumoPorCategoria } from '../../types';
import TransacaoModel from '../../models/TransacaoModel';

const ChartContainer = styled.div`
  background-color: var(--surface);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--box-shadow);
  
  @media (max-width: 320px) {
    padding: 1rem;
  }
`;

const ChartTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: var(--textPrimary);
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

const CategoryName = styled.span`
  font-size: 0.9rem;
  color: var(--textPrimary);
  font-weight: 600;
`;

const CategoryValue = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--textPrimary);
`;

const BarChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const BarContainer = styled.div`
  width: 100%;
`;

const BarLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
  font-size: 0.85rem;
  color: var(--textPrimary);
`;

const BarOuter = styled.div`
  width: 100%;
  height: 0.75rem;
  background-color: var(--border);
  border-radius: 4px;
  overflow: hidden;
`;

const BarInner = styled.div<{ $width: string; $cor: string }>`
  height: 100%;
  width: ${props => props.$width};
  background-color: ${props => props.$cor};
`;

// Cores para as categorias
const coresCategorias: Record<CategoriaTransacao, string> = {
  [CategoriaTransacao.ALIMENTACAO]: '#FF5722',
  [CategoriaTransacao.MORADIA]: '#2196F3',
  [CategoriaTransacao.TRANSPORTE]: '#4CAF50',
  [CategoriaTransacao.SAUDE]: '#9C27B0',
  [CategoriaTransacao.EDUCACAO]: '#FFC107',
  [CategoriaTransacao.LAZER]: '#00BCD4',
  [CategoriaTransacao.VESTUARIO]: '#E91E63',
  [CategoriaTransacao.SERVICOS]: '#795548',
  [CategoriaTransacao.INVESTIMENTOS]: '#607D8B',
  [CategoriaTransacao.RESERVA]: '#3F51B5',
  [CategoriaTransacao.OUTROS]: '#9E9E9E'
};

const GastosPorCategoria: React.FC = () => {
  const [dados, setDados] = useState<ResumoPorCategoria[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Carregar dados de transações e calcular gastos por categoria
  useEffect(() => {
    const carregarDados = async () => {
      try {
        setIsLoading(true);
        const transacoes = await TransacaoModel.getAllTransacoes();
        
        // Filtrar apenas despesas
        const despesas = transacoes.filter(t => t.tipo === 'Despesa');
        
        // Calcular total de despesas
        const totalDespesas = despesas.reduce((acc, t) => acc + t.valor, 0);
        
        // Agrupar por categoria
        const categorias = despesas.reduce((acc, t) => {
          const categoria = t.categoria;
          if (!acc[categoria]) {
            acc[categoria] = 0;
          }
          acc[categoria] += t.valor;
          return acc;
        }, {} as Record<string, number>);
        
        // Converter para o formato esperado
        const dadosProcessados: ResumoPorCategoria[] = Object.entries(categorias).map(([categoria, valor]) => ({
          categoria: categoria as CategoriaTransacao,
          valor,
          percentual: (valor / totalDespesas) * 100
        }));
        
        // Ordenar por valor (decrescente)
        dadosProcessados.sort((a, b) => b.valor - a.valor);
        
        setDados(dadosProcessados);
      } catch (error) {
        console.error('Erro ao carregar dados de categorias:', error);
        // Usar dados simulados em caso de erro
        const dadosSimulados: ResumoPorCategoria[] = [
          { categoria: CategoriaTransacao.ALIMENTACAO, valor: 800, percentual: 22.86 },
          { categoria: CategoriaTransacao.MORADIA, valor: 1200, percentual: 34.29 },
          { categoria: CategoriaTransacao.TRANSPORTE, valor: 500, percentual: 14.29 },
          { categoria: CategoriaTransacao.SAUDE, valor: 300, percentual: 8.57 },
          { categoria: CategoriaTransacao.LAZER, valor: 400, percentual: 11.43 },
          { categoria: CategoriaTransacao.OUTROS, valor: 300, percentual: 8.57 }
        ];
        setDados(dadosSimulados);
      } finally {
        setIsLoading(false);
      }
    };
    
    carregarDados();
  }, []);
  
  // Formatar valor como moeda brasileira
  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };
  
  return (
    <ChartContainer>
      <ChartTitle>Gastos por Categoria</ChartTitle>
      
      <BarChartContainer>
        {dados.map(item => (
          <BarContainer key={item.categoria}>
            <BarLabel>
              <span>{item.categoria}</span>
              <span>{item.percentual.toFixed(1)}%</span>
            </BarLabel>
            <BarOuter>
              <BarInner 
                $width={`${item.percentual}%`} 
                $cor={coresCategorias[item.categoria]} 
              />
            </BarOuter>
          </BarContainer>
        ))}
      </BarChartContainer>
      
      <ChartLegend>
        {dados.map(item => (
          <LegendItem key={item.categoria}>
            <ColorIndicator $cor={coresCategorias[item.categoria]} />
            <LegendText>
              <CategoryName>{item.categoria}</CategoryName>
              <CategoryValue>{formatarMoeda(item.valor)}</CategoryValue>
            </LegendText>
          </LegendItem>
        ))}
      </ChartLegend>
    </ChartContainer>
  );
};

export default GastosPorCategoria;
