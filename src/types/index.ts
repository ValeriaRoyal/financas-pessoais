/**
 * Enum para categorias de transações.
 * 
 * @enum {string}
 */
export enum CategoriaTransacao {
  ALIMENTACAO = 'Alimentação',
  MORADIA = 'Moradia',
  TRANSPORTE = 'Transporte',
  SAUDE = 'Saúde',
  EDUCACAO = 'Educação',
  LAZER = 'Lazer',
  VESTUARIO = 'Vestuário',
  SERVICOS = 'Serviços',
  INVESTIMENTOS = 'Investimentos',
  RESERVA = 'Reserva',
  OUTROS = 'Outros'
}

/**
 * Enum para formas de pagamento.
 * 
 * @enum {string}
 */
export enum FormaPagamento {
  CREDITO = 'Crédito',
  DEBITO = 'Débito',
  DINHEIRO = 'Dinheiro',
  PIX = 'PIX',
  TRANSFERENCIA = 'Transferência',
  BOLETO = 'Boleto',
  OUTRO = 'Outro'
}

/**
 * Interface para transações financeiras.
 * 
 * @interface Transacao
 */
export interface Transacao {
  id: string;
  descricao: string;
  valor: number;
  data: string;
  tipo: 'Receita' | 'Despesa';
  categoria: string;
  formaPagamento: string;
  tipoDespesa?: 'Fixa' | 'Variável';
  cartaoId?: string;
  recorrente: boolean;
  parcelado: boolean;
  numeroParcelas?: number;
  parcelaAtual?: number;
}

/**
 * Interface para cartões de crédito.
 * 
 * @interface CartaoCredito
 */
export interface CartaoCredito {
  id: string;
  nome: string;
  bandeira: string;
  limite: number;
  fechamento: number;
  vencimento: number;
  cor: string;
}

/**
 * Interface para resumo financeiro.
 * 
 * @interface ResumoFinanceiro
 */
export interface ResumoFinanceiro {
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
  totalDespesasFixas: number;
  totalDespesasVariaveis: number;
  totalCartaoCredito: number;
  totalReserva: number;
  totalInvestimentos: number;
}

/**
 * Interface para resumo por categoria.
 * 
 * @interface ResumoPorCategoria
 */
export interface ResumoPorCategoria {
  categoria: CategoriaTransacao;
  valor: number;
  percentual: number;
}

/**
 * Interface para resumo por forma de pagamento.
 * 
 * @interface ResumoPorFormaPagamento
 */
export interface ResumoPorFormaPagamento {
  formaPagamento: FormaPagamento;
  valor: number;
  percentual: number;
}
