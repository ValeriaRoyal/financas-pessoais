import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  
  /* Mobile first - ajustes para telas maiores */
  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const Header = styled.header`
  background-color: var(--primary-color);
  color: white;
  padding: 1rem;
  margin-bottom: 2rem;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Navigation = styled.nav`
  display: flex;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 4px;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  
  &:focus {
    outline: 2px solid white;
    outline-offset: 2px;
  }
`;

const Main = styled.main`
  background-color: white;
  padding: 1.5rem;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  min-height: 70vh;
`;

const Footer = styled.footer`
  text-align: center;
  margin-top: 2rem;
  padding: 1rem;
  color: #666;
  font-size: 0.9rem;
`;

const SkipLink = styled.a`
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--primary-color);
  color: white;
  padding: 8px;
  z-index: 100;
  
  &:focus {
    top: 0;
  }
`;

const Layout: React.FC<LayoutProps> = ({ children, title, description = 'Aplicativo de finanças pessoais' }) => {
  return (
    <>
      <Helmet>
        <title>{title} | Finanças Pessoais</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <html lang="pt-BR" />
      </Helmet>
      
      <SkipLink href="#main-content">Pular para o conteúdo principal</SkipLink>
      
      <Container>
        <Header>
          <HeaderContent>
            <h1>{title}</h1>
            <Navigation>
              <NavLink to="/">Dashboard</NavLink>
              <NavLink to="/transacoes">Transações</NavLink>
              <NavLink to="/cartoes">Cartões</NavLink>
            </Navigation>
          </HeaderContent>
        </Header>
        
        <Main id="main-content">
          {children}
        </Main>
        
        <Footer>
          <p>© {new Date().getFullYear()} Finanças Pessoais - Todos os direitos reservados</p>
        </Footer>
      </Container>
    </>
  );
};

export default Layout;
