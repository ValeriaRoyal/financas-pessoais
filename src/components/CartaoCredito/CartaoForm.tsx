import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CartaoCredito } from '../../types';

interface CartaoFormProps {
  cartaoParaEditar?: CartaoCredito;
  onSalvar: (cartao: CartaoCredito) => void;
  onCancelar: () => void;
}

const FormContainer = styled.form`
  background-color: white;
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--box-shadow);
`;

const FormTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 1.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: var(--border-radius);
  font-size: 1rem;
  
  &:focus {
    border-color: var(--primary-color);
    outline: none;
    box-shadow: 0 0 0 2px rgba(46, 125, 50, 0.2);
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: var(--border-radius);
  font-size: 1rem;
  
  &:focus {
    border-color: var(--primary-color);
    outline: none;
    box-shadow: 0 0 0 2px rgba(46, 125, 50, 0.2);
  }
`;

const ColorPreview = styled.div<{ cor: string }>`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: ${props => props.cor};
  margin-left: 1rem;
`;

const ColorContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button<{ primary?: boolean }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  background-color: ${props => props.primary ? 'var(--primary-color)' : '#f0f0f0'};
  color: ${props => props.primary ? 'white' : 'var(--text-color)'};
  
  &:hover {
    background-color: ${props => props.primary ? 'var(--secondary-color)' : '#e0e0e0'};
  }
  
  &:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
`;

const CartaoForm: React.FC<CartaoFormProps> = ({ 
  cartaoParaEditar, 
  onSalvar, 
  onCancelar 
}) => {
  const [nome, setNome] = useState('');
  const [bandeira, setBandeira] = useState('');
  const [limite, setLimite] = useState('');
  const [fechamento, setFechamento] = useState('');
  const [vencimento, setVencimento] = useState('');
  const [cor, setCor] = useState('#2e7d32');
  
  // Preencher formulário se estiver editando
  useEffect(() => {
    if (cartaoParaEditar) {
      setNome(cartaoParaEditar.nome);
      setBandeira(cartaoParaEditar.bandeira);
      setLimite(cartaoParaEditar.limite.toString());
      setFechamento(cartaoParaEditar.fechamento.toString());
      setVencimento(cartaoParaEditar.vencimento.toString());
      if (cartaoParaEditar.cor) {
        setCor(cartaoParaEditar.cor);
      }
    }
  }, [cartaoParaEditar]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!nome || !bandeira || !limite || !fechamento || !vencimento) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    const novoCartao: CartaoCredito = {
      id: cartaoParaEditar?.id || Date.now().toString(),
      nome,
      bandeira,
      limite: parseFloat(limite),
      fechamento: parseInt(fechamento),
      vencimento: parseInt(vencimento),
      cor
    };
    
    onSalvar(novoCartao);
  };
  
  const formTitle = cartaoParaEditar ? 'Editar Cartão' : 'Novo Cartão';
  
  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormTitle>{formTitle}</FormTitle>
      
      <FormRow>
        <FormGroup>
          <Label htmlFor="nome">Nome do Cartão *</Label>
          <Input 
            type="text" 
            id="nome" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex: Nubank, Itaú, etc."
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="bandeira">Bandeira *</Label>
          <Select 
            id="bandeira" 
            value={bandeira} 
            onChange={(e) => setBandeira(e.target.value)}
            required
          >
            <option value="">Selecione uma bandeira</option>
            <option value="Visa">Visa</option>
            <option value="Mastercard">Mastercard</option>
            <option value="American Express">American Express</option>
            <option value="Elo">Elo</option>
            <option value="Hipercard">Hipercard</option>
            <option value="Outra">Outra</option>
          </Select>
        </FormGroup>
      </FormRow>
      
      <FormRow>
        <FormGroup>
          <Label htmlFor="limite">Limite *</Label>
          <Input 
            type="number" 
            id="limite" 
            value={limite} 
            onChange={(e) => setLimite(e.target.value)}
            min="0.01" 
            step="0.01"
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="cor">Cor do Cartão</Label>
          <ColorContainer>
            <Input 
              type="color" 
              id="cor" 
              value={cor} 
              onChange={(e) => setCor(e.target.value)}
            />
            <ColorPreview cor={cor} />
          </ColorContainer>
        </FormGroup>
      </FormRow>
      
      <FormRow>
        <FormGroup>
          <Label htmlFor="fechamento">Dia de Fechamento *</Label>
          <Input 
            type="number" 
            id="fechamento" 
            value={fechamento} 
            onChange={(e) => setFechamento(e.target.value)}
            min="1" 
            max="31"
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="vencimento">Dia de Vencimento *</Label>
          <Input 
            type="number" 
            id="vencimento" 
            value={vencimento} 
            onChange={(e) => setVencimento(e.target.value)}
            min="1" 
            max="31"
            required
          />
        </FormGroup>
      </FormRow>
      
      <ButtonsContainer>
        <Button type="button" onClick={onCancelar}>
          Cancelar
        </Button>
        <Button type="submit" primary>
          Salvar
        </Button>
      </ButtonsContainer>
    </FormContainer>
  );
};

export default CartaoForm;
