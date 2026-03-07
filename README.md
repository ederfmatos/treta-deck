# Treta Deck

Jogos sociais para adultos (**+18**) pensados para serem jogados **presencialmente entre amigos**. O site só exibe perguntas ou situações; não há registro de respostas nem pontuação.

## Como rodar

- **Opção 1:** Abrir o arquivo `index.html` no navegador.  
  Para carregar os decks (JSON), é necessário usar um servidor local (muitos navegadores bloqueiam `fetch` em `file://`).

- **Opção 2 (recomendada):** Usar um servidor simples na raiz do projeto:

  ```bash
  npx serve .
  ```

  Depois acesse a URL exibida no terminal (ex.: `http://localhost:3000`).

## Estrutura do projeto

```
project-root/
  index.html          # Ponto de entrada
  service-worker.js   # PWA (cache offline)
  /css
    style.css
  /js
    app.js            # Orquestração e eventos
    deck-loader.js    # Carrega registry e decks
    deck-engine.js    # Embaralha e entrega perguntas (Fisher-Yates)
    ui.js             # Telas inicial e jogo, tema
  /decks
    registry.json     # Lista de decks (id, file, name, description)
    *.json            # Um arquivo por deck
  /assets
    logo.svg
    icon-192.png   # Ícones PWA (substitua por versões em tamanho real se quiser)
    icon-512.png
  /pwa
    manifest.json
  /docs
    creating-decks.md # Como criar e contribuir com novos decks
  README.md
```

## Como contribuir com novos decks

Qualquer pessoa pode adicionar novos “decks” de perguntas. O processo está descrito em **[docs/creating-decks.md](docs/creating-decks.md)**:

1. Criar um arquivo JSON em `/decks/` com a estrutura do deck.
2. Registrar o deck em `/decks/registry.json`.
3. Abrir um Pull Request no GitHub.

Não é necessário alterar código: só novos arquivos JSON e uma linha no registry.

## Tecnologias

- **HTML**, **CSS** e **JavaScript** (ES Modules), sem frameworks.
- Funciona abrindo o `index.html` ou com um servidor simples.
- PWA: instalável e com cache offline via Service Worker.

## Licença

MIT.
