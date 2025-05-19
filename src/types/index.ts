// Tipos para o aplicativo de finanças pessoais

// Categorias de transações
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
  RESERVA = 'Reserva de Emergência',
  OUTROS = 'Outros'
}

// Formas de pagamento
export enum FormaPagamento {
  DINHEIRO = 'Dinheiro',
  DEBITO = 'Cartão de Débito',
  CREDITO = 'Cartão de Crédito',
  PIX = 'PIX',
  TRANSFERENCIA = 'Transferência',
  BOLETO = 'Boleto',
  OUTRO = 'Outro'
}

// Tipo de transação
export enum TipoTransacao {
  RECEITA = 'Receita',
  DESPESA = 'Despesa'
}

// Tipo de despesa
export enum TipoDespesa {
  FIXA = 'Fixa',
  VARIAVEL = 'Variável'
}

// Interface para cartões de crédito
export interface CartaoCredito {
  id: string;
  nome: string;
  bandeira: string;
  limite: number;
  fechamento: number; // Dia do fechamento
  vencimento: number; // Dia do vencimento
  cor?: string;
}

// Interface para transações
export interface Transacao {
  id: string;
  descricao: string;
  valor: number;
  data: string; // Formato YYYY-MM-DD
  tipo: TipoTransacao;
  categoria: CategoriaTransacao;
  formaPagamento: FormaPagamento;
  tipoDespesa?: TipoDespesa;
  cartaoId?: string; // ID do cartão, se for pagamento com cartão
  recorrente: boolean;
  parcelado: boolean;
  parcelas?: number;
  parcelaAtual?: number;
  observacoes?: string;
}

// Interface para investimentos
export interface Investimento {
  id: string;
  nome: string;
  tipo: string;
  valor: number;
  dataInicio: string;
  rendimento?: number;
  vencimento?: string;
  risco?: 'Baixo' | 'Médio' | 'Alto';
  observacoes?: string;
}

// Interface para resumo financeiro
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

// Interface para resumo por categoria
export interface ResumoPorCategoria {
  categoria: CategoriaTransacao;
  valor: number;
  percentual: number;
}

// Interface para resumo por forma de pagamento
export interface ResumoPorFormaPagamento {
  formaPagamento: FormaPagamento;
  valor: number;
  percentual: number;
}
