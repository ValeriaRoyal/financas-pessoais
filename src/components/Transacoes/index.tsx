import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Transacao, TipoTransacao, CategoriaTransacao, FormaPagamento, TipoDespesa } from '../../types';
import TransacaoForm from './TransacaoForm';
import TransacaoLista from './TransacaoLista';
import { TransacaoModel } from '../../models/TransacaoModel';

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
  background-color: ${props => props.primary ? 'var(--primary)' : '#f0f0f0'};
  color: ${props => props.primary ? 'white' : 'var(--textPrimary)'};
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    background-color: ${props => props.primary ? 'var(--primaryDark)' : '#e0e0e0'};
  }
  
  &:focus {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
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

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: var(--textSecondary);
`;

const ErrorContainer = styled.div`
  background-color: #ffebee;
  color: #c62828;
  padding: 1rem;
  border-radius: var(--border-radius);
  margin-bottom: 1rem;
`;

const SuccessMessage = styled.div`
  background-color: #e8f5e9;
  color: #2e7d32;
  padding: 1rem;
  border-radius: var(--border-radius);
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #2e7d32;
`;

const Transacoes: React.FC = () => {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [tipoFormulario, setTipoFormulario] = useState<TipoTransacao>(TipoTransacao.DESPESA);
  const [transacaoParaEditar, setTransacaoParaEditar] = useState<Transacao | undefined>(undefined);
  const [filtroTipo, setFiltroTipo] = useState<string>('todos');
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todas');
  const [filtroMes, setFiltroMes] = useState<string>(new Date().getMonth().toString());
  const [filtroAno, setFiltroAno] = useState<string>(new Date().getFullYear().toString());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // Carregar transações da API
  const carregarTransacoes = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await TransacaoModel.getAllTransacoes();
      setTransacoes(data);
    } catch (err) {
      console.error('Erro ao carregar transações:', err);
      setError('Não foi possível carregar as transações. Por favor, tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    carregarTransacoes();
  }, []);
  
  // Limpar mensagem de sucesso após 5 segundos
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [successMessage]);
  
  const handleNovaTransacao = (tipo: TipoTransacao) => {
    setTipoFormulario(tipo);
    setTransacaoParaEditar(undefined);
    setMostrarFormulario(true);
  };
  
  const handleEditarTransacao = (transacao: Transacao) => {
    setTipoFormulario(
      typeof transacao.tipo === 'string'
        ? (transacao.tipo === 'Receita' ? TipoTransacao.RECEITA : TipoTransacao.DESPESA)
        : transacao.tipo
    );
    setTransacaoParaEditar(transacao);
    setMostrarFormulario(true);
  };
  
  const handleSalvarTransacao = async (transacao: Transacao) => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (transacaoParaEditar) {
        // Atualizar transação existente
        await TransacaoModel.update(transacao.id, transacao);
        setSuccessMessage('Transação atualizada com sucesso!');
      } else {
        // Criar nova transação
        await TransacaoModel.create(transacao);
        setSuccessMessage('Transação criada com sucesso!');
      }
      
      // Recarregar todas as transações para garantir dados atualizados
      await carregarTransacoes();
      setMostrarFormulario(false);
      setTransacaoParaEditar(undefined);
    } catch (err) {
      console.error('Erro ao salvar transação:', err);
      setError('Não foi possível salvar a transação. Por favor, tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleExcluirTransacao = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Excluir transação da API
      await TransacaoModel.delete(id);
      
      // Recarregar todas as transações
      await carregarTransacoes();
      setSuccessMessage('Transação excluída com sucesso!');
    } catch (err) {
      console.error('Erro ao excluir transação:', err);
      setError('Não foi possível excluir a transação. Por favor, tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCancelar = () => {
    setMostrarFormulario(false);
    setTransacaoParaEditar(undefined);
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
      {error && <ErrorContainer>{error}</ErrorContainer>}
      
      {successMessage && (
        <SuccessMessage>
          {successMessage}
          <CloseButton onClick={() => setSuccessMessage(null)}>×</CloseButton>
        </SuccessMessage>
      )}
      
      <ButtonsContainer>
        <ActionButton 
          primary 
          onClick={() => handleNovaTransacao(TipoTransacao.RECEITA)}
          disabled={isLoading}
        >
          Nova Receita
        </ActionButton>
        <ActionButton 
          primary 
          onClick={() => handleNovaTransacao(TipoTransacao.DESPESA)}
          disabled={isLoading}
        >
          Nova Despesa
        </ActionButton>
      </ButtonsContainer>
      
      {mostrarFormulario ? (
        <TransacaoForm 
          tipo={tipoFormulario} 
          transacaoParaEditar={transacaoParaEditar}
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
          
          {isLoading ? (
            <LoadingContainer>Carregando transações...</LoadingContainer>
          ) : (
            <TransacaoLista 
              transacoes={transacoesFiltradas} 
              onEditar={handleEditarTransacao}
              onExcluir={handleExcluirTransacao}
            />
          )}
        </>
      )}
    </TransacoesContainer>
  );
};

export default Transacoes;
