/**
 * deck-loader.js - Carrega registry e arquivos de deck via fetch.
 * Caminhos relativos ao documento (index.html).
 */

const DECKS_BASE = 'decks/';

/**
 * Carrega o registry com a lista de decks disponíveis.
 * @returns {Promise<{decks: Array<{id: string, file: string}>}>}
 */
export async function loadRegistry() {
  const res = await fetch(`${DECKS_BASE}registry.json`);
  if (!res.ok) throw new Error(`Falha ao carregar registry: ${res.status}`);
  return res.json();
}

/**
 * Carrega um deck pelo id (busca o arquivo no registry e faz fetch do JSON).
 * @param {string} deckId - Id do deck (igual ao do registry)
 * @param {{decks: Array<{id: string, file: string}>}} registry - Registry já carregado
 * @returns {Promise<{id: string, name: string, description: string, type: string, questions: Array}>}
 */
export async function loadDeck(deckId, registry) {
  const entry = registry.decks.find((d) => d.id === deckId);
  if (!entry) throw new Error(`Deck não encontrado: ${deckId}`);
  const res = await fetch(`${DECKS_BASE}${entry.file}`);
  if (!res.ok) throw new Error(`Falha ao carregar deck ${deckId}: ${res.status}`);
  return res.json();
}
