import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ResumoFinanceiro } from '../../types';
import ResumoCard from './ResumoCard';
import GastosPorCategoria from './GastosPorCategoria';
import GastosPorFormaPagamento from './GastosPorFormaPagamento';
import BalanceChart from './BalanceChart';
import { fadeIn, slideInUp } from '../../styles/animations';
import AnimatedCard from '../common/AnimatedCard';

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-lg);
  animation: ${fadeIn} 0.5s ease;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
  
  @media (max-width: 320px) {
    gap: var(--spacing-md);
  }
`;

const SectionTitle = styled.h2`
  margin-bottom: var(--spacing-md);
  color: var(--textPrimary);
  font-weight: 600;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &::before {
    content: '';
    display: block;
    width: 4px;
    height: 20px;
    background-color: var(--primary);
    border-radius: 2px;
  }
  
  @media (max-width: 320px) {
    font-size: 1.1rem;
    
    &::before {
      height: 16px;
    }
  }
`;

const GraficosContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-lg);
  margin-top: var(--spacing-xl);
  animation: ${slideInUp} 0.5s ease;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 320px) {
    gap: var(--spacing-md);
    margin-top: var(--spacing-lg);
  }
`;

const Section = styled.section`
  margin-bottom: var(--spacing-xl);
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
  flex-wrap: wrap;
  gap: var(--spacing-md);
  
  @media (max-width: 320px) {
    margin-bottom: var(--spacing-md);
  }
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
`;

const FilterLabel = styled.label`
  font-size: 0.9rem;
  color: var(--textSecondary);
`;

const FilterSelect = styled.select`
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--border);
  background-color: var(--surface);
  font-size: 0.9rem;
  color: var(--textPrimary);
  
  &:focus {
    border-color: var(--primary);
    outline: none;
    box-shadow: 0 0 0 2px rgba(98, 0, 238, 0.1);
  }
  
  @media (max-width: 320px) {
    padding: 0.4rem 0.75rem;
    font-size: 0.85rem;
  }
`;

const ExpandButton = styled.button`
  background: none;
  border: none;
  color: var(--primary);
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-top: var(--spacing-md);
  
  &:hover {
    text-decoration: underline;
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
  
  const [periodoSelecionado, setPeriodoSelecionado] = useState('mes-atual');
  const [showDetails, setShowDetails] = useState(false);
  
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
      <FilterContainer>
        <SectionTitle>Visão Geral</SectionTitle>
        
        <FilterGroup>
          <FilterLabel htmlFor="periodo">Período:</FilterLabel>
          <FilterSelect 
            id="periodo" 
            value={periodoSelecionado}
            onChange={(e) => setPeriodoSelecionado(e.target.value)}
          >
            <option value="mes-atual">Mês Atual</option>
            <option value="mes-anterior">Mês Anterior</option>
            <option value="trimestre">Último Trimestre</option>
            <option value="ano">Ano Atual</option>
          </FilterSelect>
        </FilterGroup>
      </FilterContainer>
      
      <Section>
        <AnimatedCard>
          <BalanceChart 
            totalReceitas={resumo.totalReceitas}
            totalDespesas={resumo.totalDespesas}
            saldo={resumo.saldo}
          />
        </AnimatedCard>
      </Section>
      
      <Section>
        <SectionTitle>Resumo Financeiro</SectionTitle>
        <DashboardContainer>
          <ResumoCard 
            titulo="Entradas" 
            valor={resumo.totalReceitas} 
            icone="arrow-up-circle" 
            cor="#6200ee"
            tendencia="up"
            percentual={5.2}
          />
          <ResumoCard 
            titulo="Saídas" 
            valor={resumo.totalDespesas} 
            icone="arrow-down-circle" 
            cor="#b00020"
            tendencia="down"
            percentual={-2.8}
          />
          <ResumoCard 
            titulo="Saldo" 
            valor={resumo.saldo} 
            icone="wallet" 
            cor="#03dac6"
            tendencia="up"
            percentual={12.5}
          />
          <ResumoCard 
            titulo="Gastos Fixos" 
            valor={resumo.totalDespesasFixas} 
            icone="calendar" 
            cor="#ff9800"
          />
        </DashboardContainer>
        
        <ExpandButton onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'Mostrar menos ▲' : 'Mostrar mais ▼'}
        </ExpandButton>
        
        {showDetails && (
          <DashboardContainer style={{ marginTop: 'var(--spacing-md)' }}>
            <ResumoCard 
              titulo="Cartões de Crédito" 
              valor={resumo.totalCartaoCredito} 
              icone="credit-card" 
              cor="#ff9800"
              tendencia="up"
              percentual={3.7}
            />
            <ResumoCard 
              titulo="Reserva de Emergência" 
              valor={resumo.totalReserva} 
              icone="shield" 
              cor="#0097a7"
              tendencia="up"
              percentual={1.2}
            />
            <ResumoCard 
              titulo="Investimentos" 
              valor={resumo.totalInvestimentos} 
              icone="trending-up" 
              cor="#00796b"
              tendencia="up"
              percentual={8.4}
            />
          </DashboardContainer>
        )}
      </Section>
      
      <Section>
        <SectionTitle>Análise de Gastos</SectionTitle>
        <GraficosContainer>
          <AnimatedCard>
            <GastosPorCategoria />
          </AnimatedCard>
          <AnimatedCard>
            <GastosPorFormaPagamento />
          </AnimatedCard>
        </GraficosContainer>
      </Section>
    </div>
  );
};

export default Dashboard;
