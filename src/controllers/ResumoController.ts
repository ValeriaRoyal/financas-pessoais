import { ResumoModel } from '../models/ResumoModel';
import { ResumoFinanceiro } from '../types';

/**
 * Controlador para gerenciar operações relacionadas ao resumo financeiro.
 * Implementa a lógica de negócios e cálculos.
 * 
 * @class ResumoController
 */
export class ResumoController {
  /**
   * Obtém o resumo financeiro atual.
   * 
   * @static
   * @returns {Promise<ResumoFinanceiro>} Dados do resumo financeiro
   * @throws {Error} Mensagem de erro amigável
   */
  static async obterResumo(): Promise<ResumoFinanceiro> {
    try {
      return await ResumoModel.get();
    } catch (error) {
      console.error('Controller: Erro ao obter resumo financeiro', error);
      throw new Error('Não foi possível carregar o resumo financeiro. Tente novamente mais tarde.');
    }
  }

  /**
   * Atualiza o resumo financeiro.
   * 
   * @static
   * @param {Partial<ResumoFinanceiro>} resumo - Dados parciais do resumo financeiro
   * @returns {Promise<ResumoFinanceiro>} Resumo financeiro atualizado
   * @throws {Error} Mensagem de erro amigável
   */
  static async atualizarResumo(resumo: Partial<ResumoFinanceiro>): Promise<ResumoFinanceiro> {
    try {
      return await ResumoModel.update(resumo);
    } catch (error) {
      console.error('Controller: Erro ao atualizar resumo financeiro', error);
      throw new Error('Não foi possível atualizar o resumo financeiro. Tente novamente mais tarde.');
    }
  }

  /**
   * Calcula o resumo financeiro com base nas transações.
   * Em um cenário real, este método recalcularia o resumo com base nas transações.
   * 
   * @static
   * @returns {Promise<ResumoFinanceiro>} Resumo financeiro calculado
   * @throws {Error} Mensagem de erro amigável
   */
  static async calcularResumo(): Promise<ResumoFinanceiro> {
    try {
      // Em um cenário real, aqui você poderia recalcular o resumo com base nas transações
      // Por exemplo, somar todas as receitas, despesas, etc.
      const resumoAtual = await this.obterResumo();
      return resumoAtual;
    } catch (error) {
      console.error('Controller: Erro ao calcular resumo financeiro', error);
      throw new Error('Não foi possível calcular o resumo financeiro. Tente novamente mais tarde.');
    }
  }
}
