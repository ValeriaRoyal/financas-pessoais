import React from 'react';
import styled from 'styled-components';
import { Transacao, TipoTransacao } from '../../types';

interface TransacaoListaProps {
  transacoes: Transacao[];
}

const ListaContainer = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;
`;

const ListaHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 1rem;
  background-color: #f5f5f5;
  font-weight: 500;
  border-bottom: 1px solid #e0e0e0;
  
  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  }
`;

const ListaItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 1rem;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: #f9f9f9;
  }
  
  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  }
`;

const MobileLabel = styled.span`
  display: block;
  font-size: 0.75rem;
  color: #666;
  margin-bottom: 0.25rem;
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const Descricao = styled.div`
  font-weight: 500;
`;

const Valor = styled.div<{ tipo: TipoTransacao }>`
  color: ${props => props.tipo === TipoTransacao.RECEITA ? 'var(--success-color)' : 'var(--error-color)'};
  font-weight: 500;
`;

const Data = styled.div`
  color: #666;
`;

const Categoria = styled.div`
  display: none;
  
  @media (min-width: 768px) {
    display: block;
  }
`;

const EmptyState = styled.div`
  padding: 2rem;
  text-align: center;
  color: #666;
`;

const TransacaoLista: React.FC<TransacaoListaProps> = ({ transacoes }) => {
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
        <div>Descrição</div>
        <div>Valor</div>
        <div>Data</div>
        <div className="desktop-only">Categoria</div>
      </ListaHeader>
      
      {transacoes.map(transacao => (
        <ListaItem key={transacao.id}>
          <Descricao>
            <MobileLabel>Descrição</MobileLabel>
            {transacao.descricao}
          </Descricao>
          
          <Valor tipo={transacao.tipo}>
            <MobileLabel>Valor</MobileLabel>
            {transacao.tipo === TipoTransacao.DESPESA ? '- ' : '+ '}
            {formatarMoeda(transacao.valor)}
          </Valor>
          
          <Data>
            <MobileLabel>Data</MobileLabel>
            {formatarData(transacao.data)}
          </Data>
          
          <Categoria>
            <MobileLabel>Categoria</MobileLabel>
            {transacao.categoria}
          </Categoria>
        </ListaItem>
      ))}
    </ListaContainer>
  );
};

export default TransacaoLista;
