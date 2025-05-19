import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Transacao, TipoTransacao, CategoriaTransacao, FormaPagamento, TipoDespesa } from '../../types';
import TransacaoForm from './TransacaoForm';
import TransacaoLista from './TransacaoLista';

const TransacoesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const ActionButton = styled.button<{ primary?: boolean }>`
  background-color: ${props => props.primary ? 'var(--primary-color)' : '#f0f0f0'};
  color: ${props => props.primary ? 'white' : 'var(--text-color)'};
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    background-color: ${props => props.primary ? 'var(--secondary-color)' : '#e0e0e0'};
  }
  
  &:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FilterLabel = styled.label`
  font-weight: 500;
  font-size: 0.9rem;
`;

const FilterSelect = styled.select`
  padding: 0.5rem;
  border-radius: var(--border-radius);
  border: 1px solid #ccc;
  min-width: 150px;
`;

const Transacoes: React.FC = () => {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [tipoFormulario, setTipoFormulario] = useState<TipoTransacao>(TipoTransacao.DESPESA);
  const [filtroTipo, setFiltroTipo] = useState<string>('todos');
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todas');
  const [filtroMes, setFiltroMes] = useState<string>(new Date().getMonth().toString());
  const [filtroAno, setFiltroAno] = useState<string>(new Date().getFullYear().toString());
  
  // Simular carregamento de dados
  useEffect(() => {
    // Em um cenário real, isso viria de uma API ou localStorage
    const dadosSimulados: Transacao[] = [
      {
        id: '1',
        descricao: 'Salário',
        valor: 5000,
        data: '2025-05-05',
        tipo: TipoTransacao.RECEITA,
        categoria: CategoriaTransacao.OUTROS,
        formaPagamento: FormaPagamento.TRANSFERENCIA,
        recorrente: true,
        parcelado: false
      },
      {
        id: '2',
        descricao: 'Aluguel',
        valor: 1200,
        data: '2025-05-10',
        tipo: TipoTransacao.DESPESA,
        categoria: CategoriaTransacao.MORADIA,
        formaPagamento: FormaPagamento.TRANSFERENCIA,
        tipoDespesa: TipoDespesa.FIXA,
        recorrente: true,
        parcelado: false
      },
      {
        id: '3',
        descricao: 'Supermercado',
        valor: 500,
        data: '2025-05-12',
        tipo: TipoTransacao.DESPESA,
        categoria: CategoriaTransacao.ALIMENTACAO,
        formaPagamento: FormaPagamento.CREDITO,
        tipoDespesa: TipoDespesa.VARIAVEL,
        cartaoId: '1',
        recorrente: false,
        parcelado: false
      },
      {
        id: '4',
        descricao: 'Curso de Inglês',
        valor: 300,
        data: '2025-05-15',
        tipo: TipoTransacao.DESPESA,
        categoria: CategoriaTransacao.EDUCACAO,
        formaPagamento: FormaPagamento.CREDITO,
        tipoDespesa: TipoDespesa.FIXA,
        cartaoId: '1',
        recorrente: true,
        parcelado: false
      },
      {
        id: '5',
        descricao: 'Freelance',
        valor: 1200,
        data: '2025-05-18',
        tipo: TipoTransacao.RECEITA,
        categoria: CategoriaTransacao.OUTROS,
        formaPagamento: FormaPagamento.PIX,
        recorrente: false,
        parcelado: false
      }
    ];
    
    setTransacoes(dadosSimulados);
  }, []);
  
  const handleNovaTransacao = (tipo: TipoTransacao) => {
    setTipoFormulario(tipo);
    setMostrarFormulario(true);
  };
  
  const handleSalvarTransacao = (transacao: Transacao) => {
    // Em um cenário real, isso seria enviado para uma API
    setTransacoes([...transacoes, transacao]);
    setMostrarFormulario(false);
  };
  
  const handleCancelar = () => {
    setMostrarFormulario(false);
  };
  
  const transacoesFiltradas = transacoes.filter(transacao => {
    const data = new Date(transacao.data);
    const mes = data.getMonth().toString();
    const ano = data.getFullYear().toString();
    
    return (
      (filtroTipo === 'todos' || transacao.tipo === filtroTipo) &&
      (filtroCategoria === 'todas' || transacao.categoria === filtroCategoria) &&
      mes === filtroMes &&
      ano === filtroAno
    );
  });
  
  return (
    <TransacoesContainer>
      <h1>Transações</h1>
      
      <ButtonsContainer>
        <ActionButton 
          primary 
          onClick={() => handleNovaTransacao(TipoTransacao.RECEITA)}
        >
          Nova Receita
        </ActionButton>
        <ActionButton 
          primary 
          onClick={() => handleNovaTransacao(TipoTransacao.DESPESA)}
        >
          Nova Despesa
        </ActionButton>
      </ButtonsContainer>
      
      {mostrarFormulario ? (
        <TransacaoForm 
          tipo={tipoFormulario} 
          onSalvar={handleSalvarTransacao}
          onCancelar={handleCancelar}
        />
      ) : (
        <>
          <FilterContainer>
            <FilterGroup>
              <FilterLabel htmlFor="filtro-tipo">Tipo</FilterLabel>
              <FilterSelect 
                id="filtro-tipo"
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
              >
                <option value="todos">Todos</option>
                <option value={TipoTransacao.RECEITA}>Receitas</option>
                <option value={TipoTransacao.DESPESA}>Despesas</option>
              </FilterSelect>
            </FilterGroup>
            
            <FilterGroup>
              <FilterLabel htmlFor="filtro-categoria">Categoria</FilterLabel>
              <FilterSelect 
                id="filtro-categoria"
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
              >
                <option value="todas">Todas</option>
                {Object.values(CategoriaTransacao).map(categoria => (
                  <option key={categoria} value={categoria}>{categoria}</option>
                ))}
              </FilterSelect>
            </FilterGroup>
            
            <FilterGroup>
              <FilterLabel htmlFor="filtro-mes">Mês</FilterLabel>
              <FilterSelect 
                id="filtro-mes"
                value={filtroMes}
                onChange={(e) => setFiltroMes(e.target.value)}
              >
                <option value="0">Janeiro</option>
                <option value="1">Fevereiro</option>
                <option value="2">Março</option>
                <option value="3">Abril</option>
                <option value="4">Maio</option>
                <option value="5">Junho</option>
                <option value="6">Julho</option>
                <option value="7">Agosto</option>
                <option value="8">Setembro</option>
                <option value="9">Outubro</option>
                <option value="10">Novembro</option>
                <option value="11">Dezembro</option>
              </FilterSelect>
            </FilterGroup>
            
            <FilterGroup>
              <FilterLabel htmlFor="filtro-ano">Ano</FilterLabel>
              <FilterSelect 
                id="filtro-ano"
                value={filtroAno}
                onChange={(e) => setFiltroAno(e.target.value)}
              >
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
              </FilterSelect>
            </FilterGroup>
          </FilterContainer>
          
          <TransacaoLista transacoes={transacoesFiltradas} />
        </>
      )}
    </TransacoesContainer>
  );
};

export default Transacoes;
