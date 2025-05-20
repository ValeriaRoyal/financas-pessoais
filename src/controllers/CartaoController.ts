import { CartaoModel } from '../models/CartaoModel';
import { CartaoCredito } from '../types';

/**
 * Controlador para gerenciar operações relacionadas a cartões de crédito.
 * Implementa a lógica de negócios e validações.
 * 
 * @class CartaoController
 */
export class CartaoController {
  /**
   * Lista todos os cartões disponíveis.
   * 
   * @static
   * @returns {Promise<CartaoCredito[]>} Lista de cartões
   * @throws {Error} Mensagem de erro amigável
   */
  static async listarCartoes(): Promise<CartaoCredito[]> {
    try {
      return await CartaoModel.getAll();
    } catch (error) {
      console.error('Controller: Erro ao listar cartões', error);
      throw new Error('Não foi possível carregar os cartões. Tente novamente mais tarde.');
    }
  }

  /**
   * Obtém um cartão específico pelo ID.
   * 
   * @static
   * @param {string} id - ID do cartão
   * @returns {Promise<CartaoCredito>} Dados do cartão
   * @throws {Error} Mensagem de erro amigável
   */
  static async obterCartao(id: string): Promise<CartaoCredito> {
    try {
      return await CartaoModel.getById(id);
    } catch (error) {
      console.error(`Controller: Erro ao obter cartão ${id}`, error);
      throw new Error('Não foi possível carregar os detalhes do cartão. Tente novamente mais tarde.');
    }
  }

  /**
   * Adiciona um novo cartão com validações.
   * 
   * @static
   * @param {Omit<CartaoCredito, 'id'>} cartao - Dados do cartão sem ID
   * @returns {Promise<CartaoCredito>} Cartão criado com ID
   * @throws {Error} Mensagem de erro amigável ou de validação
   */
  static async adicionarCartao(cartao: Omit<CartaoCredito, 'id'>): Promise<CartaoCredito> {
    try {
      // Validação de dados
      if (!cartao.nome || cartao.nome.trim() === '') {
        throw new Error('O nome do cartão é obrigatório');
      }
      
      if (!cartao.limite || cartao.limite <= 0) {
        throw new Error('O limite do cartão deve ser maior que zero');
      }
      
      return await CartaoModel.create(cartao);
    } catch (error) {
      console.error('Controller: Erro ao adicionar cartão', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Não foi possível adicionar o cartão. Tente novamente mais tarde.');
    }
  }

  /**
   * Atualiza um cartão existente com validações.
   * 
   * @static
   * @param {string} id - ID do cartão
   * @param {Partial<CartaoCredito>} cartao - Dados parciais do cartão
   * @returns {Promise<CartaoCredito>} Cartão atualizado
   * @throws {Error} Mensagem de erro amigável ou de validação
   */
  static async atualizarCartao(id: string, cartao: Partial<CartaoCredito>): Promise<CartaoCredito> {
    try {
      // Validações
      if (cartao.nome !== undefined && cartao.nome.trim() === '') {
        throw new Error('O nome do cartão não pode ser vazio');
      }
      
      if (cartao.limite !== undefined && cartao.limite <= 0) {
        throw new Error('O limite do cartão deve ser maior que zero');
      }
      
      return await CartaoModel.update(id, cartao);
    } catch (error) {
      console.error(`Controller: Erro ao atualizar cartão ${id}`, error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Não foi possível atualizar o cartão. Tente novamente mais tarde.');
    }
  }

  /**
   * Exclui um cartão.
   * 
   * @static
   * @param {string} id - ID do cartão
   * @returns {Promise<void>}
   * @throws {Error} Mensagem de erro amigável
   */
  static async excluirCartao(id: string): Promise<void> {
    try {
      await CartaoModel.delete(id);
    } catch (error) {
      console.error(`Controller: Erro ao excluir cartão ${id}`, error);
      throw new Error('Não foi possível excluir o cartão. Tente novamente mais tarde.');
    }
  }
}
