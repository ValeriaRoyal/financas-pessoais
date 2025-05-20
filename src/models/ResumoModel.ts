import api from '../services/api';
import { ResumoFinanceiro } from '../types';

/**
 * Modelo para gerenciar operações relacionadas ao resumo financeiro.
 * 
 * @class ResumoModel
 */
export class ResumoModel {
  /**
   * Busca o resumo financeiro atual.
   * 
   * @static
   * @returns {Promise<ResumoFinanceiro>} Dados do resumo financeiro
   * @throws {Error} Erro ao buscar resumo financeiro
   */
  static async get(): Promise<ResumoFinanceiro> {
    try {
      const response = await api.get('/resumo');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar resumo financeiro:', error);
      throw error;
    }
  }
  
  /**
   * Alias para get() para manter compatibilidade com o código existente.
   * 
   * @static
   * @returns {Promise<ResumoFinanceiro>} Dados do resumo financeiro
   * @throws {Error} Erro ao buscar resumo financeiro
   */
  static async getResumo(): Promise<ResumoFinanceiro> {
    return this.get();
  }

  /**
   * Atualiza o resumo financeiro.
   * 
   * @static
   * @param {Partial<ResumoFinanceiro>} resumo - Dados parciais do resumo financeiro
   * @returns {Promise<ResumoFinanceiro>} Resumo financeiro atualizado
   * @throws {Error} Erro ao atualizar resumo financeiro
   */
  static async update(resumo: Partial<ResumoFinanceiro>): Promise<ResumoFinanceiro> {
    try {
      const currentResumo = await this.get();
      const updatedResumo = { ...currentResumo, ...resumo };
      const response = await api.put('/resumo', updatedResumo);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar resumo financeiro:', error);
      throw error;
    }
  }
}
