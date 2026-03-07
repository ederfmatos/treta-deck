# Como criar um novo deck

Este guia explica como adicionar um novo deck de perguntas ao Treta Deck para que qualquer pessoa possa contribuir.

## 1. Criar o arquivo JSON do deck

Crie um novo arquivo na pasta **`/decks/`** com um nome em minúsculas, separado por hífens (ex.: `meu-deck.json`).

### Estrutura do JSON

- **`id`** (obrigatório): identificador único do deck, igual ao nome do arquivo sem a extensão (ex.: `meu-deck`).
- **`name`** (obrigatório): nome exibido na lista de decks (ex.: "Meu Deck Incrível").
- **`description`** (obrigatório): texto curto que aparece na tela inicial (ex.: "Perguntas sobre...").
- **`type`** (obrigatório): tipo do jogo. Valores suportados:
  - **`choose`**: o jogador escolhe entre duas opções.
  - **`who`**: pergunta "quem do grupo" faria algo (sem opções de resposta na tela).
- **`questions`** (obrigatório): array de perguntas.

### Tipo `choose`

Cada item do array deve ter:

- **`question`**: texto da pergunta (ex.: "O que você prefere?").
- **`options`**: array com **exatamente duas strings** (as duas opções).

Exemplo:

```json
{
  "id": "meu-deck",
  "name": "Meu Deck Incrível",
  "description": "Escolha entre duas situações absurdas",
  "type": "choose",
  "questions": [
    {
      "question": "O que você prefere?",
      "options": [
        "Opção A",
        "Opção B"
      ]
    }
  ]
}
```

### Tipo `who`

Cada item do array deve ter apenas:

- **`question`**: texto completo da pergunta (ex.: "Quem do grupo mandaria mensagem para o ex às 3 da manhã?").

Não é necessário o campo `options`.

Exemplo:

```json
{
  "id": "amigos-merda",
  "name": "Amigos de Merda",
  "description": "Quem do grupo faria isso?",
  "type": "who",
  "questions": [
    { "question": "Quem do grupo mandaria mensagem para o ex às 3 da manhã?" }
  ]
}
```

## 2. Registrar o deck no registry

Abra o arquivo **`/decks/registry.json`** e adicione um novo objeto ao array **`decks`**:

- **`id`**: o mesmo `id` do seu deck (ex.: `meu-deck`).
- **`file`**: nome do arquivo (ex.: `meu-deck.json`).
- **`name`** (opcional): mesmo nome do deck (para exibir na tela inicial).
- **`description`** (opcional): mesma descrição (para exibir na tela inicial).

Exemplo de `registry.json` após adicionar um deck:

```json
{
  "decks": [
    {
      "id": "decisoes-merda",
      "file": "decisoes-merda.json",
      "name": "Decisões de Merda",
      "description": "Escolha entre duas situações absurdas"
    },
    {
      "id": "meu-deck",
      "file": "meu-deck.json",
      "name": "Meu Deck Incrível",
      "description": "Escolha entre duas situações absurdas"
    }
  ]
}
```

## 3. Abrir um Pull Request no GitHub

1. Faça um **fork** do repositório.
2. Crie uma **branch** (ex.: `add-deck-meu-deck`).
3. Adicione o arquivo do deck em `/decks/` e edite `/decks/registry.json`.
4. Faça **commit** e **push** da sua branch.
5. Abra um **Pull Request** descrevendo o novo deck e o tipo de perguntas.

O projeto não registra respostas nem pontuação; o site apenas exibe as perguntas para serem jogadas presencialmente entre amigos. Mantenha o conteúdo adequado para +18 e dentro do espírito do jogo.
