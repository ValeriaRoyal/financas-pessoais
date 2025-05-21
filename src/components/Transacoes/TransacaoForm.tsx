import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  Transacao, 
  TipoTransacao, 
  CategoriaTransacao, 
  FormaPagamento, 
  TipoDespesa,
  CartaoCredito
} from '../../types';

interface TransacaoFormProps {
  tipo: TipoTransacao;
  transacaoParaEditar?: Transacao;
  onSalvar: (transacao: Transacao) => void;
  onCancelar: () => void;
}

const FormContainer = styled.form`
  background-color: var(--surface);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--box-shadow);
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
`;

const FormTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: ${props => props.color};
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
  font-weight: 700;
  color: var(--textPrimary);
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

const Checkbox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const CheckboxInput = styled.input`
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  position: sticky;
  bottom: 0;
  background-color: white;
  padding-top: 1rem;
  padding-bottom: 1rem;
  z-index: 10;
`;

const Button = styled.button<{ $primary?: boolean }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  background-color: ${props => props.$primary ? 'var(--primaryDark)' : '#e0e0e0'};
  color: ${props => props.$primary ? 'white' : '#333333'};
  min-width: 120px;
  
  &:hover {
    background-color: ${props => props.$primary ? 'var(--primary)' : '#d0d0d0'};
  }
  
  &:focus {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
  }
`;

const TransacaoForm: React.FC<TransacaoFormProps> = ({ 
  tipo, 
  transacaoParaEditar, 
  onSalvar, 
  onCancelar 
}) => {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');
  const [categoria, setCategoria] = useState<CategoriaTransacao>(CategoriaTransacao.OUTROS);
  const [formaPagamento, setFormaPagamento] = useState<FormaPagamento>(FormaPagamento.DINHEIRO);
  const [tipoDespesa, setTipoDespesa] = useState<TipoDespesa>(TipoDespesa.VARIAVEL);
  const [cartaoId, setCartaoId] = useState<string>('');
  const [recorrente, setRecorrente] = useState(false);
  const [parcelado, setParcelado] = useState(false);
  const [parcelas, setParcelas] = useState('');
  const [observacoes, setObservacoes] = useState('');
  
  const [cartoes, setCartoes] = useState<CartaoCredito[]>([]);
  
  // Carregar dados de cartões (simulado)
  useEffect(() => {
    // Em um cenário real, isso viria de uma API ou localStorage
    const cartoesSimulados: CartaoCredito[] = [
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
  }, []);
  
  // Preencher formulário se estiver editando
  useEffect(() => {
    if (transacaoParaEditar) {
      setDescricao(transacaoParaEditar.descricao);
      setValor(transacaoParaEditar.valor.toString());
      setData(transacaoParaEditar.data);
      
      // Converter string para enum se necessário
      if (typeof transacaoParaEditar.categoria === 'string') {
        // Verificar se o valor existe no enum
        const categoriaEnum = Object.values(CategoriaTransacao).find(
          cat => cat === transacaoParaEditar.categoria
        );
        setCategoria(categoriaEnum || CategoriaTransacao.OUTROS);
      } else {
        setCategoria(transacaoParaEditar.categoria);
      }
      
      // Converter string para enum se necessário
      if (typeof transacaoParaEditar.formaPagamento === 'string') {
        // Verificar se o valor existe no enum
        const formaPagamentoEnum = Object.values(FormaPagamento).find(
          forma => forma === transacaoParaEditar.formaPagamento
        );
        setFormaPagamento(formaPagamentoEnum || FormaPagamento.DINHEIRO);
      } else {
        setFormaPagamento(transacaoParaEditar.formaPagamento);
      }
      
      if (transacaoParaEditar.tipoDespesa) {
        // Converter string para enum se necessário
        if (typeof transacaoParaEditar.tipoDespesa === 'string') {
          // Verificar se o valor existe no enum
          const tipoDespesaEnum = Object.values(TipoDespesa).find(
            tipo => tipo === transacaoParaEditar.tipoDespesa
          );
          setTipoDespesa(tipoDespesaEnum || TipoDespesa.VARIAVEL);
        } else {
          setTipoDespesa(transacaoParaEditar.tipoDespesa);
        }
      }
      
      if (transacaoParaEditar.cartaoId) {
        setCartaoId(transacaoParaEditar.cartaoId);
      }
      setRecorrente(transacaoParaEditar.recorrente);
      setParcelado(transacaoParaEditar.parcelado);
      if (transacaoParaEditar.parcelas) {
        setParcelas(transacaoParaEditar.parcelas.toString());
      }
      if (transacaoParaEditar.observacoes) {
        setObservacoes(transacaoParaEditar.observacoes);
      }
    } else {
      // Definir data atual para novas transações
      const hoje = new Date();
      const ano = hoje.getFullYear();
      const mes = String(hoje.getMonth() + 1).padStart(2, '0');
      const dia = String(hoje.getDate()).padStart(2, '0');
      setData(`${ano}-${mes}-${dia}`);
    }
  }, [transacaoParaEditar]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!descricao || !valor || !data) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    const novaTransacao: Transacao = {
      id: transacaoParaEditar?.id || Date.now().toString(),
      descricao,
      valor: parseFloat(valor),
      data,
      tipo,
      categoria,
      formaPagamento,
      recorrente,
      parcelado
    };
    
    // Adicionar campos opcionais
    if (tipo === TipoTransacao.DESPESA) {
      novaTransacao.tipoDespesa = tipoDespesa;
    }
    
    if (formaPagamento === FormaPagamento.CREDITO) {
      novaTransacao.cartaoId = cartaoId;
    }
    
    if (parcelado && parcelas) {
      novaTransacao.parcelas = parseInt(parcelas);
      novaTransacao.parcelaAtual = 1;
    }
    
    if (observacoes) {
      novaTransacao.observacoes = observacoes;
    }
    
    onSalvar(novaTransacao);
  };
  
  const formColor = tipo === TipoTransacao.RECEITA ? 'var(--success)' : 'var(--error)';
  const formTitle = transacaoParaEditar 
    ? `Editar ${tipo === TipoTransacao.RECEITA ? 'Receita' : 'Despesa'}`
    : `Nova ${tipo === TipoTransacao.RECEITA ? 'Receita' : 'Despesa'}`;
  
  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormTitle color={formColor}>{formTitle}</FormTitle>
      
      <FormRow>
        <FormGroup>
          <Label htmlFor="descricao">Descrição *</Label>
          <Input 
            type="text" 
            id="descricao" 
            value={descricao} 
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="valor">Valor *</Label>
          <Input 
            type="number" 
            id="valor" 
            value={valor} 
            onChange={(e) => setValor(e.target.value)}
            min="0.01" 
            step="0.01"
            required
          />
        </FormGroup>
      </FormRow>
      
      <FormRow>
        <FormGroup>
          <Label htmlFor="data">Data *</Label>
          <Input 
            type="date" 
            id="data" 
            value={data} 
            onChange={(e) => setData(e.target.value)}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="categoria">Categoria *</Label>
          <Select 
            id="categoria" 
            value={categoria} 
            onChange={(e) => setCategoria(e.target.value as CategoriaTransacao)}
            required
          >
            {Object.values(CategoriaTransacao).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </Select>
        </FormGroup>
      </FormRow>
      
      <FormRow>
        <FormGroup>
          <Label htmlFor="formaPagamento">Forma de Pagamento *</Label>
          <Select 
            id="formaPagamento" 
            value={formaPagamento} 
            onChange={(e) => setFormaPagamento(e.target.value as FormaPagamento)}
            required
          >
            {Object.values(FormaPagamento).map(forma => (
              <option key={forma} value={forma}>{forma}</option>
            ))}
          </Select>
        </FormGroup>
        
        {tipo === TipoTransacao.DESPESA && (
          <FormGroup>
            <Label htmlFor="tipoDespesa">Tipo de Despesa *</Label>
            <Select 
              id="tipoDespesa" 
              value={tipoDespesa} 
              onChange={(e) => setTipoDespesa(e.target.value as TipoDespesa)}
              required
            >
              <option value={TipoDespesa.FIXA}>Fixa</option>
              <option value={TipoDespesa.VARIAVEL}>Variável</option>
            </Select>
          </FormGroup>
        )}
      </FormRow>
      
      {formaPagamento === FormaPagamento.CREDITO && (
        <FormRow>
          <FormGroup>
            <Label htmlFor="cartao">Cartão de Crédito *</Label>
            <Select 
              id="cartao" 
              value={cartaoId} 
              onChange={(e) => setCartaoId(e.target.value)}
              required
            >
              <option value="">Selecione um cartão</option>
              {cartoes.map(cartao => (
                <option key={cartao.id} value={cartao.id}>
                  {cartao.nome} ({cartao.bandeira})
                </option>
              ))}
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Checkbox>
              <CheckboxInput 
                type="checkbox" 
                id="parcelado" 
                checked={parcelado} 
                onChange={(e) => setParcelado(e.target.checked)}
              />
              <Label htmlFor="parcelado">Compra Parcelada</Label>
            </Checkbox>
            
            {parcelado && (
              <Input 
                type="number" 
                placeholder="Número de parcelas" 
                value={parcelas} 
                onChange={(e) => setParcelas(e.target.value)}
                min="2"
                required
              />
            )}
          </FormGroup>
        </FormRow>
      )}
      
      <FormRow>
        <FormGroup>
          <Checkbox>
            <CheckboxInput 
              type="checkbox" 
              id="recorrente" 
              checked={recorrente} 
              onChange={(e) => setRecorrente(e.target.checked)}
            />
            <Label htmlFor="recorrente">Transação Recorrente</Label>
          </Checkbox>
        </FormGroup>
      </FormRow>
      
      <FormRow>
        <FormGroup style={{ gridColumn: '1 / -1' }}>
          <Label htmlFor="observacoes">Observações</Label>
          <Input 
            as="textarea" 
            id="observacoes" 
            value={observacoes} 
            onChange={(e) => setObservacoes(e.target.value)}
            style={{ height: '100px', resize: 'vertical' }}
          />
        </FormGroup>
      </FormRow>
      
      <ButtonsContainer>
        <Button type="button" onClick={onCancelar}>
          Cancelar
        </Button>
        <Button type="submit" $primary>
          {transacaoParaEditar ? 'Atualizar' : 'Salvar'}
        </Button>
      </ButtonsContainer>
    </FormContainer>
  );
};

export default TransacaoForm;
