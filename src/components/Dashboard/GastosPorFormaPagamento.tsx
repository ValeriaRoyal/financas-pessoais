import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FormaPagamento, ResumoPorFormaPagamento } from '../../types';

const ChartContainer = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--box-shadow);
`;

const ChartTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: var(--text-color);
`;

const DonutChartContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto;
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
  background-color: white;
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
`;

const DonutLabel = styled.div`
  font-size: 0.8rem;
  color: #666;
  text-align: center;
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
`;

const PaymentValue = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
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
  
  // Simular carregamento de dados
  useEffect(() => {
    // Em um cenário real, isso viria de uma API ou localStorage
    const dadosSimulados: ResumoPorFormaPagamento[] = [
      { formaPagamento: FormaPagamento.CREDITO, valor: 1200, percentual: 34.29 },
      { formaPagamento: FormaPagamento.DEBITO, valor: 800, percentual: 22.86 },
      { formaPagamento: FormaPagamento.PIX, valor: 700, percentual: 20 },
      { formaPagamento: FormaPagamento.DINHEIRO, valor: 500, percentual: 14.29 },
      { formaPagamento: FormaPagamento.BOLETO, valor: 300, percentual: 8.57 }
    ];
    
    setDados(dadosSimulados);
    setTotal(dadosSimulados.reduce((acc, item) => acc + item.valor, 0));
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
