"use strict";

const UNO_COLORS = ["red", "yellow", "green", "blue"];
const UNO_ACTIONS = ["skip", "reverse", "draw-two"];
const UNO_WILD_TYPES = ["wild", "wild-draw-four"];

const game = {
  deck: [],
  drawPile: [],
  discardPile: [],
};

function createUnoDeck() {
  const deck = [];
  let cardId = 0;

  UNO_COLORS.forEach((color) => {
    deck.push({
      id: cardId++,
      color,
      kind: "number",
      value: "0",
    });

    for (let value = 1; value <= 9; value += 1) {
      deck.push(
        {
          id: cardId++,
          color,
          kind: "number",
          value: String(value),
        },
        {
          id: cardId++,
          color,
          kind: "number",
          value: String(value),
        }
      );
    }

    UNO_ACTIONS.forEach((action) => {
      deck.push(
        {
          id: cardId++,
          color,
          kind: "action",
          value: action,
        },
        {
          id: cardId++,
          color,
          kind: "action",
          value: action,
        }
      );
    });
  });

  UNO_WILD_TYPES.forEach((wildType) => {
    for (let copy = 0; copy < 4; copy += 1) {
      deck.push({
        id: cardId++,
        color: "wild",
        kind: "wild",
        value: wildType,
      });
    }
  });

  return deck;
}

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[randomIndex]] = [deck[randomIndex], deck[i]];
  }

  return deck;
}

function formatCard(card) {
  if (!card) {
    return "No card";
  }

  return `${card.color} ${card.value}`;
}

function renderGameState() {
  const drawPileCountElement = document.getElementById("draw-pile-count");
  const discardTopCardElement = document.getElementById("discard-top-card");
  const deckSizeElement = document.getElementById("deck-size");
  const gameMessageElement = document.getElementById("game-message");

  if (!drawPileCountElement || !discardTopCardElement || !deckSizeElement || !gameMessageElement) {
    return;
  }

  drawPileCountElement.textContent = `${game.drawPile.length} cards`;
  discardTopCardElement.textContent = formatCard(game.discardPile[game.discardPile.length - 1]);
  deckSizeElement.textContent = `Deck: ${game.deck.length} cards`;
  gameMessageElement.textContent = "Game initialized.";
}

function initializeGame() {
  game.deck = createUnoDeck();
  shuffleDeck(game.deck);

  game.drawPile = [...game.deck];
  game.discardPile = [];

  if (game.drawPile.length > 0) {
    const firstDiscardCard = game.drawPile.pop();
    game.discardPile.push(firstDiscardCard);
  }

  renderGameState();
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", initializeGame);
}
