import api from '../services/api';
import { Transacao } from '../types';

/**
 * Modelo para gerenciar operações relacionadas a transações financeiras.
 * 
 * @class TransacaoModel
 */
export class TransacaoModel {
  /**
   * Busca todas as transações disponíveis.
   * 
   * @static
   * @returns {Promise<Transacao[]>} Lista de transações
   * @throws {Error} Erro ao buscar transações
   */
  static async getAll(): Promise<Transacao[]> {
    try {
      const response = await api.get('/transacoes');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar transações:', error);
      throw error;
    }
  }
  
  /**
   * Alias para getAll() para manter compatibilidade com o código existente.
   * 
   * @static
   * @returns {Promise<Transacao[]>} Lista de transações
   * @throws {Error} Erro ao buscar transações
   */
  static async getAllTransacoes(): Promise<Transacao[]> {
    return this.getAll();
  }

  /**
   * Busca uma transação específica pelo ID.
   * 
   * @static
   * @param {string} id - ID da transação
   * @returns {Promise<Transacao>} Dados da transação
   * @throws {Error} Erro ao buscar transação
   */
  static async getById(id: string): Promise<Transacao> {
    try {
      const response = await api.get(`/transacoes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar transação ${id}:`, error);
      throw error;
    }
  }

  /**
   * Cria uma nova transação.
   * 
   * @static
   * @param {Omit<Transacao, 'id'>} transacao - Dados da transação sem ID
   * @returns {Promise<Transacao>} Transação criada com ID
   * @throws {Error} Erro ao criar transação
   */
  static async create(transacao: Omit<Transacao, 'id'>): Promise<Transacao> {
    try {
      const response = await api.post('/transacoes', {
        ...transacao,
        id: Date.now().toString() // ID temporário
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao criar transação:', error);
      throw error;
    }
  }

  /**
   * Atualiza uma transação existente.
   * 
   * @static
   * @param {string} id - ID da transação
   * @param {Partial<Transacao>} transacao - Dados parciais da transação
   * @returns {Promise<Transacao>} Transação atualizada
   * @throws {Error} Erro ao atualizar transação
   */
  static async update(id: string, transacao: Partial<Transacao>): Promise<Transacao> {
    try {
      const response = await api.put(`/transacoes/${id}`, transacao);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar transação ${id}:`, error);
      throw error;
    }
  }

  /**
   * Exclui uma transação.
   * 
   * @static
   * @param {string} id - ID da transação
   * @returns {Promise<void>}
   * @throws {Error} Erro ao excluir transação
   */
  static async delete(id: string): Promise<void> {
    try {
      await api.delete(`/transacoes/${id}`);
    } catch (error) {
      console.error(`Erro ao excluir transação ${id}:`, error);
      throw error;
    }
  }
}
