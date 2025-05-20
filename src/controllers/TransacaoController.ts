import { TransacaoModel } from '../models/TransacaoModel';
import { Transacao } from '../types';

/**
 * Controlador para gerenciar operações relacionadas a transações financeiras.
 * Implementa a lógica de negócios e validações.
 * 
 * @class TransacaoController
 */
export class TransacaoController {
  /**
   * Lista todas as transações disponíveis.
   * 
   * @static
   * @returns {Promise<Transacao[]>} Lista de transações
   * @throws {Error} Mensagem de erro amigável
   */
  static async listarTransacoes(): Promise<Transacao[]> {
    try {
      return await TransacaoModel.getAll();
    } catch (error) {
      console.error('Controller: Erro ao listar transações', error);
      throw new Error('Não foi possível carregar as transações. Tente novamente mais tarde.');
    }
  }

  /**
   * Obtém uma transação específica pelo ID.
   * 
   * @static
   * @param {string} id - ID da transação
   * @returns {Promise<Transacao>} Dados da transação
   * @throws {Error} Mensagem de erro amigável
   */
  static async obterTransacao(id: string): Promise<Transacao> {
    try {
      return await TransacaoModel.getById(id);
    } catch (error) {
      console.error(`Controller: Erro ao obter transação ${id}`, error);
      throw new Error('Não foi possível carregar os detalhes da transação. Tente novamente mais tarde.');
    }
  }

  /**
   * Adiciona uma nova transação com validações.
   * 
   * @static
   * @param {Omit<Transacao, 'id'>} transacao - Dados da transação sem ID
   * @returns {Promise<Transacao>} Transação criada com ID
   * @throws {Error} Mensagem de erro amigável ou de validação
   */
  static async adicionarTransacao(transacao: Omit<Transacao, 'id'>): Promise<Transacao> {
    try {
      // Validação de dados
      if (!transacao.descricao || transacao.descricao.trim() === '') {
        throw new Error('A descrição da transação é obrigatória');
      }
      
      if (!transacao.valor || transacao.valor <= 0) {
        throw new Error('O valor da transação deve ser maior que zero');
      }
      
      if (!transacao.data) {
        throw new Error('A data da transação é obrigatória');
      }
      
      return await TransacaoModel.create(transacao);
    } catch (error) {
      console.error('Controller: Erro ao adicionar transação', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Não foi possível adicionar a transação. Tente novamente mais tarde.');
    }
  }

  /**
   * Atualiza uma transação existente com validações.
   * 
   * @static
   * @param {string} id - ID da transação
   * @param {Partial<Transacao>} transacao - Dados parciais da transação
   * @returns {Promise<Transacao>} Transação atualizada
   * @throws {Error} Mensagem de erro amigável ou de validação
   */
  static async atualizarTransacao(id: string, transacao: Partial<Transacao>): Promise<Transacao> {
    try {
      // Validações
      if (transacao.descricao !== undefined && transacao.descricao.trim() === '') {
        throw new Error('A descrição da transação não pode ser vazia');
      }
      
      if (transacao.valor !== undefined && transacao.valor <= 0) {
        throw new Error('O valor da transação deve ser maior que zero');
      }
      
      return await TransacaoModel.update(id, transacao);
    } catch (error) {
      console.error(`Controller: Erro ao atualizar transação ${id}`, error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Não foi possível atualizar a transação. Tente novamente mais tarde.');
    }
  }

  /**
   * Exclui uma transação.
   * 
   * @static
   * @param {string} id - ID da transação
   * @returns {Promise<void>}
   * @throws {Error} Mensagem de erro amigável
   */
  static async excluirTransacao(id: string): Promise<void> {
    try {
      await TransacaoModel.delete(id);
    } catch (error) {
      console.error(`Controller: Erro ao excluir transação ${id}`, error);
      throw new Error('Não foi possível excluir a transação. Tente novamente mais tarde.');
    }
  }
}
