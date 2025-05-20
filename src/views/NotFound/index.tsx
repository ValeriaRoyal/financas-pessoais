import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { fadeIn } from '../../styles/animations';
import AnimatedButton from '../../components/common/AnimatedButton';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: var(--spacing-lg);
  background-color: var(--background);
  color: var(--textPrimary);
  text-align: center;
  animation: ${fadeIn} 0.5s ease;
`;

const ErrorCode = styled.h1`
  font-size: 8rem;
  font-weight: 700;
  margin: 0;
  color: var(--primary);
  line-height: 1;
  
  @media (max-width: 768px) {
    font-size: 6rem;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  margin: var(--spacing-md) 0;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Description = styled.p`
  font-size: 1.1rem;
  max-width: 500px;
  margin-bottom: var(--spacing-xl);
  color: var(--textSecondary);
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: var(--spacing-md);
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const NotFound: React.FC = () => {
  return (
    <NotFoundContainer>
      <ErrorCode>404</ErrorCode>
      <Title>Página não encontrada</Title>
      <Description>
        A página que você está procurando não existe ou foi movida para outro endereço.
      </Description>
      <ButtonContainer>
        <Link to="/">
          <AnimatedButton $primary>
            Voltar para o Dashboard
          </AnimatedButton>
        </Link>
      </ButtonContainer>
    </NotFoundContainer>
  );
};

export default NotFound;
