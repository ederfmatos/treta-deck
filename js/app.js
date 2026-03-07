/**
 * app.js - Ponto de entrada: orquestra carregamento do registry, telas e eventos.
 */

import { loadRegistry, loadDeck } from './deck-loader.js';
import { DeckEngine } from './deck-engine.js';
import { renderHome, renderGame, getTheme, setTheme } from './ui.js';

/** @type {{decks: Array<{id: string, file: string, name?: string, description?: string}>}|null} */
let registry = null;

/** @type {import('./deck-engine.js').DeckEngine|null} */
let deckEngine = null;

/** @type {{id: string, name: string, description: string, type: string, questions: Array}|null} */
let currentDeck = null;

/** @type {{question: string, options?: string[]}|null} - pergunta atualmente exibida na tela do jogo */
let currentCard = null;

/**
 * Mostra tela inicial e aplica tema salvo.
 */
function showHome() {
  if (!registry) throw new Error('Registry não carregado');
  const theme = getTheme();
  setTheme(theme);
  renderHome(registry, onDeckSelect, onThemeToggleHome);
}

/**
 * Alterna tema na tela inicial e re-renderiza para atualizar o ícone do botão.
 */
function onThemeToggleHome() {
  const next = getTheme() === 'dark' ? 'light' : 'dark';
  setTheme(next);
  showHome();
}

/**
 * Chamado ao clicar em um deck: carrega o deck, cria o engine e mostra a tela do jogo.
 * @param {string} deckId
 */
async function onDeckSelect(deckId) {
  try {
    const deck = await loadDeck(deckId, registry);
    currentDeck = deck;
    deckEngine = new DeckEngine(deck.questions);
    currentCard = deckEngine.getNext();
    setTheme(getTheme());
    renderGame(deck, currentCard, onNextCard, onChangeDeck, onThemeToggleGame);
  } catch (err) {
    console.error(err);
    alert('Não foi possível carregar o deck. Tente de novo.');
  }
}

/**
 * Próxima pergunta: obtém do engine e atualiza a tela do jogo.
 */
function onNextCard() {
  if (!deckEngine || !currentDeck) return;
  currentCard = deckEngine.getNext();
  setTheme(getTheme());
  renderGame(currentDeck, currentCard, onNextCard, onChangeDeck, onThemeToggleGame);
}

/**
 * Alterna tema na tela do jogo e re-renderiza mantendo a mesma pergunta.
 */
function onThemeToggleGame() {
  const next = getTheme() === 'dark' ? 'light' : 'dark';
  setTheme(next);
  if (currentDeck) renderGame(currentDeck, currentCard, onNextCard, onChangeDeck, onThemeToggleGame);
}

/**
 * Volta para a tela inicial (trocar deck).
 */
function onChangeDeck() {
  deckEngine = null;
  currentDeck = null;
  showHome();
}

/**
 * Registra o Service Worker para PWA (quando disponível).
 */
function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  try {
    navigator.serviceWorker.register('service-worker.js').catch(() => {});
  } catch (_) {}
}

/**
 * Inicialização: carrega registry e mostra a tela inicial.
 */
async function init() {
  registerServiceWorker();
  try {
    registry = await loadRegistry();
    showHome();
  } catch (err) {
    console.error(err);
    document.getElementById('app').innerHTML = `
      <div class="error-screen">
        <h2>Erro ao carregar</h2>
        <p>Não foi possível carregar os decks. Verifique se está rodando por um servidor (ex.: <code>npx serve .</code>).</p>
      </div>
    `;
  }
}

init();
