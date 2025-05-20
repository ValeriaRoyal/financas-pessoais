import api from '../services/api';
import { CartaoCredito } from '../types';

/**
 * Modelo para gerenciar operações relacionadas a cartões de crédito.
 * 
 * @class CartaoModel
 */
export class CartaoModel {
  /**
   * Busca todos os cartões disponíveis.
   * 
   * @static
   * @returns {Promise<CartaoCredito[]>} Lista de cartões
   * @throws {Error} Erro ao buscar cartões
   */
  static async getAll(): Promise<CartaoCredito[]> {
    try {
      const response = await api.get('/cartoes');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar cartões:', error);
      throw error;
    }
  }

  /**
   * Busca um cartão específico pelo ID.
   * 
   * @static
   * @param {string} id - ID do cartão
   * @returns {Promise<CartaoCredito>} Dados do cartão
   * @throws {Error} Erro ao buscar cartão
   */
  static async getById(id: string): Promise<CartaoCredito> {
    try {
      const response = await api.get(`/cartoes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar cartão ${id}:`, error);
      throw error;
    }
  }

  /**
   * Cria um novo cartão.
   * 
   * @static
   * @param {Omit<CartaoCredito, 'id'>} cartao - Dados do cartão sem ID
   * @returns {Promise<CartaoCredito>} Cartão criado com ID
   * @throws {Error} Erro ao criar cartão
   */
  static async create(cartao: Omit<CartaoCredito, 'id'>): Promise<CartaoCredito> {
    try {
      const response = await api.post('/cartoes', {
        ...cartao,
        id: Date.now().toString() // ID temporário
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao criar cartão:', error);
      throw error;
    }
  }

  /**
   * Atualiza um cartão existente.
   * 
   * @static
   * @param {string} id - ID do cartão
   * @param {Partial<CartaoCredito>} cartao - Dados parciais do cartão
   * @returns {Promise<CartaoCredito>} Cartão atualizado
   * @throws {Error} Erro ao atualizar cartão
   */
  static async update(id: string, cartao: Partial<CartaoCredito>): Promise<CartaoCredito> {
    try {
      const response = await api.put(`/cartoes/${id}`, cartao);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar cartão ${id}:`, error);
      throw error;
    }
  }

  /**
   * Exclui um cartão.
   * 
   * @static
   * @param {string} id - ID do cartão
   * @returns {Promise<void>}
   * @throws {Error} Erro ao excluir cartão
   */
  static async delete(id: string): Promise<void> {
    try {
      await api.delete(`/cartoes/${id}`);
    } catch (error) {
      console.error(`Erro ao excluir cartão ${id}:`, error);
      throw error;
    }
  }
}
