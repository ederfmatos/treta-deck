/**
 * DeckEngine - Gerencia o baralho de perguntas com embaralhamento Fisher-Yates.
 * Não repete perguntas até acabar o deck; ao esgotar, embaralha novamente.
 */

/**
 * Embaralha um array in-place usando o algoritmo Fisher-Yates.
 * @param {Array} array - Array a ser embaralhado
 * @returns {Array} - O mesmo array (embaralhado)
 */
function fisherYatesShuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Classe que controla a ordem e o ciclo de perguntas do deck.
 */
export class DeckEngine {
  /**
   * @param {Array<{question: string, options?: string[]}>} questions - Lista de perguntas do deck
   */
  constructor(questions) {
    if (!Array.isArray(questions) || questions.length === 0) {
      throw new Error('DeckEngine precisa de um array não vazio de perguntas.');
    }
    this.questions = questions;
    this.shuffled = fisherYatesShuffle(this.questions);
    this.index = 0;
  }

  /**
   * Retorna a próxima pergunta. Ao esgotar o deck, embaralha de novo e reinicia.
   * @returns {{question: string, options?: string[]}|null} - Próxima pergunta ou null se não houver
   */
  getNext() {
    if (this.shuffled.length === 0) return null;
    if (this.index >= this.shuffled.length) {
      this.shuffled = fisherYatesShuffle(this.questions);
      this.index = 0;
    }
    const card = this.shuffled[this.index];
    this.index += 1;
    return card;
  }

  /**
   * Quantidade de perguntas no deck.
   * @returns {number}
   */
  get size() {
    return this.questions.length;
  }
}
