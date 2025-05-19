import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CartaoCredito as CartaoCreditoType } from '../../types';
import CartaoForm from './CartaoForm';
import CartaoLista from './CartaoLista';

const CartaoCreditoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ActionButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    background-color: var(--secondary-color);
  }
  
  &:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
`;

const ResumoContainer = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--box-shadow);
  margin-bottom: 2rem;
`;

const ResumoTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 1rem;
`;

const ResumoInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoLabel = styled.span`
  font-size: 0.9rem;
  color: #666;
`;

const InfoValue = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
`;

const CartaoCredito: React.FC = () => {
  const [cartoes, setCartoes] = useState<CartaoCreditoType[]>([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [cartaoParaEditar, setCartaoParaEditar] = useState<CartaoCreditoType | undefined>(undefined);
  const [totalLimite, setTotalLimite] = useState(0);
  const [totalUtilizado, setTotalUtilizado] = useState(0);
  
  // Simular carregamento de dados
  useEffect(() => {
    // Em um cenário real, isso viria de uma API ou localStorage
    const cartoesSimulados: CartaoCreditoType[] = [
      {
        id: '1',
        nome: 'Nubank',
        bandeira: 'Mastercard',
        limite: 5000,
        fechamento: 10,
        vencimento: 17,
        cor: '#8A05BE'
      },
      {
        id: '2',
        nome: 'Itaú',
        bandeira: 'Visa',
        limite: 8000,
        fechamento: 15,
        vencimento: 22,
        cor: '#EC7000'
      }
    ];
    
    setCartoes(cartoesSimulados);
    
    // Calcular totais
    const limite = cartoesSimulados.reduce((acc, cartao) => acc + cartao.limite, 0);
    setTotalLimite(limite);
    
    // Simulando uso de 30% do limite total
    setTotalUtilizado(limite * 0.3);
  }, []);
  
  const handleNovoCartao = () => {
    setCartaoParaEditar(undefined);
    setMostrarFormulario(true);
  };
  
  const handleEditarCartao = (cartao: CartaoCreditoType) => {
    setCartaoParaEditar(cartao);
    setMostrarFormulario(true);
  };
  
  const handleSalvarCartao = (cartao: CartaoCreditoType) => {
    if (cartaoParaEditar) {
      // Atualizar cartão existente
      setCartoes(cartoes.map(c => c.id === cartao.id ? cartao : c));
    } else {
      // Adicionar novo cartão
      setCartoes([...cartoes, cartao]);
    }
    
    setMostrarFormulario(false);
    setCartaoParaEditar(undefined);
    
    // Recalcular totais
    const novoLimite = [...cartoes, cartao].reduce((acc, c) => acc + c.limite, 0);
    setTotalLimite(novoLimite);
  };
  
  const handleCancelar = () => {
    setMostrarFormulario(false);
    setCartaoParaEditar(undefined);
  };
  
  // Formatar valor como moeda brasileira
  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };
  
  // Calcular percentual utilizado
  const percentualUtilizado = totalLimite > 0 ? (totalUtilizado / totalLimite) * 100 : 0;
  
  return (
    <CartaoCreditoContainer>
      <h1>Cartões de Crédito</h1>
      
      <ResumoContainer>
        <ResumoTitle>Resumo dos Cartões</ResumoTitle>
        <ResumoInfo>
          <InfoItem>
            <InfoLabel>Limite Total</InfoLabel>
            <InfoValue>{formatarMoeda(totalLimite)}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Utilizado</InfoLabel>
            <InfoValue>{formatarMoeda(totalUtilizado)}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Disponível</InfoLabel>
            <InfoValue>{formatarMoeda(totalLimite - totalUtilizado)}</InfoValue>
          </InfoItem>
        </ResumoInfo>
        
        <div style={{ marginTop: '1rem' }}>
          <InfoLabel>Percentual Utilizado: {percentualUtilizado.toFixed(1)}%</InfoLabel>
          <div style={{ 
            height: '8px', 
            backgroundColor: '#f0f0f0', 
            borderRadius: '4px',
            marginTop: '0.5rem',
            overflow: 'hidden'
          }}>
            <div style={{ 
              height: '100%', 
              width: `${percentualUtilizado}%`,
              backgroundColor: percentualUtilizado > 70 ? 'var(--error-color)' : 'var(--primary-color)',
              borderRadius: '4px'
            }} />
          </div>
        </div>
      </ResumoContainer>
      
      <ButtonsContainer>
        <ActionButton onClick={handleNovoCartao}>
          Adicionar Novo Cartão
        </ActionButton>
      </ButtonsContainer>
      
      {mostrarFormulario ? (
        <CartaoForm 
          cartaoParaEditar={cartaoParaEditar}
          onSalvar={handleSalvarCartao}
          onCancelar={handleCancelar}
        />
      ) : (
        <CartaoLista 
          cartoes={cartoes} 
          onEditar={handleEditarCartao} 
        />
      )}
    </CartaoCreditoContainer>
  );
};

export default CartaoCredito;
