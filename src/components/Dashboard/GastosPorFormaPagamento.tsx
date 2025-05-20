import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FormaPagamento, ResumoPorFormaPagamento } from '../../types';
import TransacaoModel from '../../models/TransacaoModel';

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
  color: var(--textPrimary);
  text-align: center;
  font-weight: 600;
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

const PaymentName = styled.span`
  font-size: 0.9rem;
  color: var(--textPrimary);
  font-weight: 600;
`;

const PaymentValue = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--textPrimary);
`;

// Cores para as formas de pagamento
const coresFormasPagamento: Record<FormaPagamento, string> = {
  [FormaPagamento.CREDITO]: '#FF5722',
  [FormaPagamento.DEBITO]: '#2196F3',
  [FormaPagamento.DINHEIRO]: '#4CAF50',
  [FormaPagamento.PIX]: '#9C27B0',
  [FormaPagamento.TRANSFERENCIA]: '#FFC107',
  [FormaPagamento.BOLETO]: '#00BCD4',
  [FormaPagamento.OUTRO]: '#9E9E9E'
};

const GastosPorFormaPagamento: React.FC = () => {
  const [dados, setDados] = useState<ResumoPorFormaPagamento[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // Carregar dados de transações e calcular gastos por forma de pagamento
  useEffect(() => {
    const carregarDados = async () => {
      try {
        setIsLoading(true);
        const transacoes = await TransacaoModel.getAllTransacoes();
        
        // Filtrar apenas despesas
        const despesas = transacoes.filter(t => t.tipo === 'Despesa');
        
        // Calcular total de despesas
        const totalDespesas = despesas.reduce((acc, t) => acc + t.valor, 0);
        
        // Agrupar por forma de pagamento
        const formasPagamento = despesas.reduce((acc, t) => {
          const formaPagamento = t.formaPagamento;
          if (!acc[formaPagamento]) {
            acc[formaPagamento] = 0;
          }
          acc[formaPagamento] += t.valor;
          return acc;
        }, {} as Record<string, number>);
        
        // Converter para o formato esperado
        const dadosProcessados: ResumoPorFormaPagamento[] = Object.entries(formasPagamento).map(([formaPagamento, valor]) => ({
          formaPagamento: formaPagamento as FormaPagamento,
          valor,
          percentual: (valor / totalDespesas) * 100
        }));
        
        // Ordenar por valor (decrescente)
        dadosProcessados.sort((a, b) => b.valor - a.valor);
        
        setDados(dadosProcessados);
        setTotal(totalDespesas);
      } catch (error) {
        console.error('Erro ao carregar dados de formas de pagamento:', error);
        // Usar dados simulados em caso de erro
        const dadosSimulados: ResumoPorFormaPagamento[] = [
          { formaPagamento: FormaPagamento.CREDITO, valor: 1200, percentual: 34.29 },
          { formaPagamento: FormaPagamento.DEBITO, valor: 800, percentual: 22.86 },
          { formaPagamento: FormaPagamento.PIX, valor: 700, percentual: 20 },
          { formaPagamento: FormaPagamento.DINHEIRO, valor: 500, percentual: 14.29 },
          { formaPagamento: FormaPagamento.BOLETO, valor: 300, percentual: 8.57 }
        ];
        
        setDados(dadosSimulados);
        setTotal(dadosSimulados.reduce((acc, item) => acc + item.valor, 0));
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
  
  // Calcular ângulos para o gráfico de rosca
  const calcularSegmentos = () => {
    let rotacaoAtual = 0;
    
    return dados.map(item => {
      const angulo = 3.6 * item.percentual; // 3.6 = 360 / 100
      const segmento = {
        rotacao: rotacaoAtual,
        angulo: angulo,
        cor: coresFormasPagamento[item.formaPagamento]
      };
      
      rotacaoAtual += angulo;
      return segmento;
    });
  };
  
  const segmentos = calcularSegmentos();
  
  return (
    <ChartContainer>
      <ChartTitle>Gastos por Forma de Pagamento</ChartTitle>
      
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
          <LegendItem key={item.formaPagamento}>
            <ColorIndicator $cor={coresFormasPagamento[item.formaPagamento]} />
            <LegendText>
              <PaymentName>{item.formaPagamento}</PaymentName>
              <PaymentValue>{formatarMoeda(item.valor)}</PaymentValue>
            </LegendText>
          </LegendItem>
        ))}
      </ChartLegend>
    </ChartContainer>
  );
};

export default GastosPorFormaPagamento;
