import React from 'react';
import styled from 'styled-components';

interface ResumoCardProps {
  titulo: string;
  valor: number;
  icone: string;
  cor: string;
}

const CardContainer = styled.div<{ corFundo: string }>`
  background-color: white;
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--box-shadow);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0.5rem;
    height: 100%;
    background-color: ${props => props.corFundo};
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  color: var(--text-color);
`;

const IconContainer = styled.div<{ corIcone: string }>`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: ${props => `${props.corIcone}20`}; /* Cor com 20% de opacidade */
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.corIcone};
`;

const CardValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--text-color);
`;

// Componente para simular ícones (em um projeto real, usaríamos uma biblioteca de ícones)
const Icon = ({ name }: { name: string }) => {
  // Aqui você usaria uma biblioteca como react-icons, feather-icons, etc.
  return <div aria-hidden="true">{name.charAt(0).toUpperCase()}</div>;
};

const ResumoCard: React.FC<ResumoCardProps> = ({ titulo, valor, icone, cor }) => {
  // Formatar o valor como moeda brasileira
  const valorFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
  
  return (
    <CardContainer corFundo={cor}>
      <CardHeader>
        <CardTitle>{titulo}</CardTitle>
        <IconContainer corIcone={cor}>
          <Icon name={icone} />
        </IconContainer>
      </CardHeader>
      <CardValue>{valorFormatado}</CardValue>
    </CardContainer>
  );
};

export default ResumoCard;
