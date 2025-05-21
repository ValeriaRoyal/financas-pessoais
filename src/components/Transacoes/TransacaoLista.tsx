import React from 'react';
import styled from 'styled-components';
import { Transacao, TipoTransacao } from '../../types';

interface TransacaoListaProps {
  transacoes: Transacao[];
  onEditar: (transacao: Transacao) => void;
  onExcluir: (id: string) => void;
}

const ListaContainer = styled.div`
  background-color: var(--surface);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;
`;

const ListaHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr auto;
  padding: 1rem;
  background-color: #f0f0f0;
  font-weight: 600;
  border-bottom: 1px solid #d0d0d0;
  align-items: center;
  
  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr auto;
  }
`;

const HeaderItem = styled.div`
  text-align: left;
  padding: 0 0.5rem;
  color: #333333;
  font-weight: 700;
  
  &.valor {
    text-align: right;
  }
  
  &.acoes {
    text-align: center;
  }
  
  &.data {
    text-align: center;
  }
  
  &.categoria, &.forma-pagto {
    text-align: left;
  }
`;

const ListaItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr auto;
  padding: 1rem;
  border-bottom: 1px solid #f0f0f0;
  align-items: center;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: #f9f9f9;
  }
  
  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr auto;
  }
`;

const MobileLabel = styled.span`
  display: block;
  font-size: 0.75rem;
  color: #333333;
  font-weight: 600;
  margin-bottom: 0.25rem;
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const CelulaItem = styled.div`
  padding: 0 0.5rem;
  
  &.valor {
    text-align: right;
  }
  
  &.acoes {
    text-align: center;
  }
  
  &.data {
    text-align: center;
  }
  
  &.categoria, &.forma-pagto {
    text-align: left;
  }
`;

const Descricao = styled(CelulaItem)`
  font-weight: 500;
`;

// Modificado para aceitar string ou enum
const Valor = styled(CelulaItem)<{ $tipo: TipoTransacao | string }>`
  color: ${props => {
    // Converter string para enum se necessário
    const tipoEnum = typeof props.$tipo === 'string' 
      ? (props.$tipo === 'Receita' ? TipoTransacao.RECEITA : TipoTransacao.DESPESA)
      : props.$tipo;
    
    return tipoEnum === TipoTransacao.RECEITA 
      ? 'var(--success)' 
      : 'var(--error)';
  }};
  font-weight: 500;
  text-align: right;
`;

const Data = styled(CelulaItem)`
  color: #333333;
  text-align: center;
`;

const Categoria = styled(CelulaItem)`
  display: none;
  
  @media (min-width: 768px) {
    display: block;
  }
`;

const AcoesContainer = styled(CelulaItem)`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  text-align: center;
`;

const BotaoAcao = styled.button`
  padding: 0.5rem 0.75rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &.editar {
    background-color: #0d47a1;
    color: white;
    
    &:hover {
      background-color: #1565c0;
    }
  }
  
  &.excluir {
    background-color: #b71c1c;
    color: white;
    
    &:hover {
      background-color: #c62828;
    }
  }
`;

const EmptyState = styled.div`
  padding: 2rem;
  text-align: center;
  color: #333333;
  font-weight: 500;
`;

const TransacaoLista: React.FC<TransacaoListaProps> = ({ 
  transacoes,
  onEditar,
  onExcluir
}) => {
  // Formatar valor como moeda brasileira
  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };
  
  // Formatar data para o formato brasileiro
  const formatarData = (dataString: string) => {
    const data = new Date(dataString);
    return new Intl.DateTimeFormat('pt-BR').format(data);
  };
  
  if (transacoes.length === 0) {
    return (
      <ListaContainer>
        <EmptyState>
          Nenhuma transação encontrada para o período selecionado.
        </EmptyState>
      </ListaContainer>
    );
  }
  
  return (
    <ListaContainer>
      <ListaHeader>
        <HeaderItem>Descrição</HeaderItem>
        <HeaderItem className="valor">Valor</HeaderItem>
        <HeaderItem className="data">Data</HeaderItem>
        <HeaderItem className="categoria desktop-only">Categoria</HeaderItem>
        <HeaderItem className="forma-pagto desktop-only">Forma Pagto</HeaderItem>
        <HeaderItem className="acoes">Ações</HeaderItem>
      </ListaHeader>
      
      {transacoes.map(transacao => (
        <ListaItem key={transacao.id}>
          <Descricao>
            <MobileLabel>Descrição</MobileLabel>
            {transacao.descricao}
          </Descricao>
          
          <Valor $tipo={transacao.tipo} className="valor">
            <MobileLabel>Valor</MobileLabel>
            {typeof transacao.tipo === 'string' 
              ? (transacao.tipo === 'Despesa' ? '- ' : '+ ')
              : (transacao.tipo === TipoTransacao.DESPESA ? '- ' : '+ ')}
            {formatarMoeda(transacao.valor)}
          </Valor>
          
          <Data className="data">
            <MobileLabel>Data</MobileLabel>
            {formatarData(transacao.data)}
          </Data>
          
          <Categoria className="categoria">
            <MobileLabel>Categoria</MobileLabel>
            {transacao.categoria}
          </Categoria>
          
          <Categoria className="forma-pagto">
            <MobileLabel>Forma Pagto</MobileLabel>
            {transacao.formaPagamento}
          </Categoria>
          
          <AcoesContainer className="acoes">
            <BotaoAcao 
              className="editar"
              onClick={() => onEditar(transacao)}
              aria-label="Editar transação"
            >
              Editar
            </BotaoAcao>
            <BotaoAcao 
              className="excluir"
              onClick={() => {
                if (window.confirm('Tem certeza que deseja excluir esta transação?')) {
                  onExcluir(transacao.id);
                }
              }}
              aria-label="Excluir transação"
            >
              Excluir
            </BotaoAcao>
          </AcoesContainer>
        </ListaItem>
      ))}
    </ListaContainer>
  );
};

export default TransacaoLista;
