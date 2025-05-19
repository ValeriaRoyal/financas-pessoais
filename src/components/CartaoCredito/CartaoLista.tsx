import React from 'react';
import styled from 'styled-components';
import { CartaoCredito } from '../../types';

interface CartaoListaProps {
  cartoes: CartaoCredito[];
  onEditar: (cartao: CartaoCredito) => void;
}

const ListaContainer = styled.div`
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

const CartaoCard = styled.div<{ corBorda: string }>`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0.5rem;
    height: 100%;
    background-color: ${props => props.corBorda};
  }
`;

const CartaoHeader = styled.div`
  padding: 1.5rem;
  padding-left: 2rem;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartaoNome = styled.h3`
  margin: 0;
  font-size: 1.2rem;
`;

const CartaoBandeira = styled.span`
  font-size: 0.9rem;
  color: #666;
  background-color: #f5f5f5;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
`;

const CartaoBody = styled.div`
  padding: 1.5rem;
  padding-left: 2rem;
`;

const CartaoInfo = styled.div`
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoLabel = styled.div`
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 0.25rem;
`;

const InfoValue = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
`;

const CartaoFooter = styled.div`
  padding: 1rem 1.5rem;
  padding-left: 2rem;
  background-color: #f9f9f9;
  display: flex;
  justify-content: flex-end;
`;

const EditarButton = styled.button`
  background-color: transparent;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    background-color: rgba(46, 125, 50, 0.1);
  }
  
  &:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
`;

const EmptyState = styled.div`
  grid-column: 1 / -1;
  padding: 2rem;
  text-align: center;
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
`;

const CartaoLista: React.FC<CartaoListaProps> = ({ cartoes, onEditar }) => {
  // Formatar valor como moeda brasileira
  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };
  
  if (cartoes.length === 0) {
    return (
      <EmptyState>
        <h3>Nenhum cartão cadastrado</h3>
        <p>Adicione seu primeiro cartão de crédito para começar a controlar seus gastos.</p>
      </EmptyState>
    );
  }
  
  return (
    <ListaContainer>
      {cartoes.map(cartao => (
        <CartaoCard key={cartao.id} corBorda={cartao.cor || '#2e7d32'}>
          <CartaoHeader>
            <CartaoNome>{cartao.nome}</CartaoNome>
            <CartaoBandeira>{cartao.bandeira}</CartaoBandeira>
          </CartaoHeader>
          
          <CartaoBody>
            <CartaoInfo>
              <InfoLabel>Limite</InfoLabel>
              <InfoValue>{formatarMoeda(cartao.limite)}</InfoValue>
            </CartaoInfo>
            
            <CartaoInfo>
              <InfoLabel>Fechamento</InfoLabel>
              <InfoValue>Dia {cartao.fechamento}</InfoValue>
            </CartaoInfo>
            
            <CartaoInfo>
              <InfoLabel>Vencimento</InfoLabel>
              <InfoValue>Dia {cartao.vencimento}</InfoValue>
            </CartaoInfo>
          </CartaoBody>
          
          <CartaoFooter>
            <EditarButton onClick={() => onEditar(cartao)}>
              Editar
            </EditarButton>
          </CartaoFooter>
        </CartaoCard>
      ))}
    </ListaContainer>
  );
};

export default CartaoLista;
