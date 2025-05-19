import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ResumoFinanceiro } from '../../types';
import ResumoCard from './ResumoCard';
import GastosPorCategoria from './GastosPorCategoria';
import GastosPorFormaPagamento from './GastosPorFormaPagamento';

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ResumoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const SectionTitle = styled.h2`
  margin-bottom: 1rem;
  color: var(--primary-color);
  grid-column: 1 / -1;
`;

const GraficosContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-top: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Dashboard: React.FC = () => {
  const [resumo, setResumo] = useState<ResumoFinanceiro>({
    totalReceitas: 0,
    totalDespesas: 0,
    saldo: 0,
    totalDespesasFixas: 0,
    totalDespesasVariaveis: 0,
    totalCartaoCredito: 0,
    totalReserva: 0,
    totalInvestimentos: 0
  });
  
  // Simular carregamento de dados
  useEffect(() => {
    // Em um cenário real, isso viria de uma API ou localStorage
    const dadosSimulados: ResumoFinanceiro = {
      totalReceitas: 5000,
      totalDespesas: 3500,
      saldo: 1500,
      totalDespesasFixas: 2000,
      totalDespesasVariaveis: 1500,
      totalCartaoCredito: 1200,
      totalReserva: 10000,
      totalInvestimentos: 25000
    };
    
    setResumo(dadosSimulados);
  }, []);
  
  return (
    <div>
      <h1>Dashboard Financeiro</h1>
      
      <ResumoContainer>
        <SectionTitle>Resumo do Mês</SectionTitle>
        <ResumoCard 
          titulo="Entradas" 
          valor={resumo.totalReceitas} 
          icone="arrow-up-circle" 
          cor="#388e3c"
        />
        <ResumoCard 
          titulo="Saídas" 
          valor={resumo.totalDespesas} 
          icone="arrow-down-circle" 
          cor="#d32f2f"
        />
        <ResumoCard 
          titulo="Saldo" 
          valor={resumo.saldo} 
          icone="wallet" 
          cor="#1976d2"
        />
        <ResumoCard 
          titulo="Gastos Fixos" 
          valor={resumo.totalDespesasFixas} 
          icone="calendar" 
          cor="#7b1fa2"
        />
      </ResumoContainer>
      
      <DashboardContainer>
        <SectionTitle>Detalhamento Financeiro</SectionTitle>
        <ResumoCard 
          titulo="Cartões de Crédito" 
          valor={resumo.totalCartaoCredito} 
          icone="credit-card" 
          cor="#ff9800"
        />
        <ResumoCard 
          titulo="Reserva de Emergência" 
          valor={resumo.totalReserva} 
          icone="shield" 
          cor="#0097a7"
        />
        <ResumoCard 
          titulo="Investimentos" 
          valor={resumo.totalInvestimentos} 
          icone="trending-up" 
          cor="#00796b"
        />
      </DashboardContainer>
      
      <GraficosContainer>
        <GastosPorCategoria />
        <GastosPorFormaPagamento />
      </GraficosContainer>
    </div>
  );
};

export default Dashboard;
