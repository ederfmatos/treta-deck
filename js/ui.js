/**
 * ui.js - Renderização das telas (inicial e jogo) e controle de tema (light/dark).
 */

const STORAGE_THEME_KEY = 'treta-deck-theme';

/**
 * Retorna o container principal do app.
 * @returns {HTMLElement}
 */
function getAppContainer() {
  const el = document.getElementById('app');
  if (!el) throw new Error('Elemento #app não encontrado');
  return el;
}

/**
 * Aplica tema no documento e persiste no localStorage.
 * @param {'light'|'dark'} theme
 */
export function setTheme(theme) {
  const root = document.documentElement;
  root.classList.remove('theme-light', 'theme-dark');
  root.classList.add(theme === 'light' ? 'theme-light' : 'theme-dark');
  try {
    localStorage.setItem(STORAGE_THEME_KEY, theme);
  } catch (_) { }
}

/**
 * Lê tema salvo (default: dark).
 * @returns {'light'|'dark'}
 */
export function getTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_THEME_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch (_) { }
  return 'dark';
}

/**
 * Renderiza a tela inicial: título, lista de decks (nome e descrição do registry), toggle de tema.
 * @param {{decks: Array<{id: string, file: string, name?: string, description?: string}>}} registry
 * @param {(deckId: string) => void} onDeckSelect - callback ao clicar em um deck (recebe id)
 * @param {() => void} onThemeToggle - callback ao alternar tema
 */
export function renderHome(registry, onDeckSelect, onThemeToggle) {
  const container = getAppContainer();
  const theme = getTheme();
  setTheme(theme);

  const decksHtml = (registry.decks || [])
    .map(
      (d) => `
    <li class="deck-card" data-deck-id="${escapeHtml(d.id)}">
      <span class="deck-card-title">${escapeHtml(d.name || d.id)}</span>
      <p class="deck-card-desc">${escapeHtml(d.description || 'Clique para jogar')}</p>
    </li>
  `
    )
    .join('');

  container.innerHTML = `
    <header class="header">
      <div class="header-inner">
        <img src="assets/logo.svg" alt="Treta Deck" class="logo" />
        <h1 class="title">Treta Deck</h1>
        <p class="subtitle">Jogos sociais +18 • Presencial entre amigos</p>
        <button type="button" class="theme-toggle" aria-label="Alternar tema" title="Alternar tema claro/escuro">
          ${theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
    <main class="main home">
      <ul class="deck-list" aria-label="Decks disponíveis">
        ${decksHtml}
      </ul>
    </main>
  `;

  container.querySelector('.theme-toggle').addEventListener('click', onThemeToggle);
  container.querySelectorAll('.deck-card').forEach((card) => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-deck-id');
      if (id) onDeckSelect(id);
    });
  });
}

/**
 * Renderiza a tela do jogo: pergunta, opções (se choose), botões Próxima e Trocar deck.
 * @param {{id: string, name: string, type: string}} deck
 * @param {{question: string, options?: string[]}|null} currentCard - pergunta atual
 * @param {() => void} onNext
 * @param {() => void} onChangeDeck
 * @param {() => void} [onThemeToggle] - callback ao alternar tema (re-render fica a cargo do app)
 */
export function renderGame(deck, currentCard, onNext, onChangeDeck, onThemeToggle) {
  const container = getAppContainer();
  const theme = getTheme();
  setTheme(theme);

  const isChoose = deck.type === 'choose';
  const hasTwoOptions = currentCard && currentCard.options && currentCard.options.length >= 2;
  const optionsHtml =
    isChoose && hasTwoOptions
      ? `
    <div class="options">
      <div class="option-card">${escapeHtml(currentCard.options[0])}</div>
      <span class="option-divider">OU</span>
      <div class="option-card">${escapeHtml(currentCard.options[1])}</div>
    </div>
  `
      : '';

  const questionHtml = currentCard
    ? `<p class="game-question">${escapeHtml(currentCard.question)}</p>`
    : '<p class="game-question">Nenhuma pergunta no deck.</p>';

  container.innerHTML = `
    <header class="header header-game">
      <div class="header-inner">
        <span class="deck-name">${escapeHtml(deck.name)}</span>
        <button type="button" class="btn btn-secondary change-deck">Trocar deck</button>
      </div>
    </header>
    <main class="main game">
      <div class="game-card">
        ${questionHtml}
        ${optionsHtml}
      </div>
      <div class="game-actions">
        <button type="button" class="btn btn-primary next-card">Próxima pergunta</button>
      </div>
    </main>
  `;
 container.querySelectorAll('.next-card').forEach((btn) => btn.addEventListener('click', onNext));
  container.querySelectorAll('.change-deck').forEach((btn) => btn.addEventListener('click', onChangeDeck));
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
