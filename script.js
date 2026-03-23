"use strict";

const UNO_COLORS = ["red", "blue", "green", "yellow"];
const STARTING_HAND_SIZE = 7;

const gameState = {
  players: [
    createPlayer("You", true),
    createPlayer("CPU"),
  ],
  drawPile: [],
  status: "",
};

const ui = {
  status: document.getElementById("game-status"),
  drawPileCount: document.getElementById("draw-pile-count"),
  cpuCardCount: document.getElementById("cpu-card-count"),
  playerCardCount: document.getElementById("player-card-count"),
  playerHand: document.getElementById("player-hand"),
  drawCardButton: document.getElementById("draw-card-btn"),
};

function createPlayer(name, isHuman = false) {
  return {
    id: `player-${name.toLowerCase()}`,
    name,
    isHuman,
    hand: [],
  };
}

function createDeck() {
  const deck = [];
  let cardId = 0;

  for (let colorIndex = 0; colorIndex < UNO_COLORS.length; colorIndex += 1) {
    const color = UNO_COLORS[colorIndex];
    for (let value = 0; value <= 9; value += 1) {
      // Duplicate number cards to keep enough cards for early game actions.
      deck.push(createCard(cardId, color, String(value)));
      cardId += 1;
      deck.push(createCard(cardId, color, String(value)));
      cardId += 1;
    }
  }

  return deck;
}

function createCard(id, color, value) {
  return {
    id: `card-${id}`,
    color,
    value,
  };
}

function shuffleCards(cards) {
  for (let index = cards.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [cards[index], cards[randomIndex]] = [cards[randomIndex], cards[index]];
  }

  return cards;
}

function dealCards(players, drawPile, cardsPerPlayer) {
  for (let cardCount = 0; cardCount < cardsPerPlayer; cardCount += 1) {
    for (let playerIndex = 0; playerIndex < players.length; playerIndex += 1) {
      const nextCard = drawPile.pop();
      if (!nextCard) {
        return;
      }
      players[playerIndex].hand.push(nextCard);
    }
  }
}

function drawCard(player) {
  const nextCard = gameState.drawPile.pop();
  if (!nextCard) {
    setStatus("Draw pile is empty.");
    render();
    return;
  }

  player.hand.push(nextCard);
  setStatus(`${player.name} drew a ${nextCard.color} ${nextCard.value}.`);
  render();
}

function setStatus(message) {
  gameState.status = message;
}

function render() {
  ui.status.textContent = gameState.status;
  ui.drawPileCount.textContent = `Draw pile: ${gameState.drawPile.length}`;
  ui.cpuCardCount.textContent = `CPU cards: ${gameState.players[1].hand.length}`;
  ui.playerCardCount.textContent = `Cards in hand: ${gameState.players[0].hand.length}`;
  ui.drawCardButton.disabled = gameState.drawPile.length === 0;
  renderPlayerHand(gameState.players[0].hand);
}

function renderPlayerHand(hand) {
  ui.playerHand.textContent = "";

  if (hand.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No cards in hand.";
    ui.playerHand.appendChild(emptyMessage);
    return;
  }

  for (let index = 0; index < hand.length; index += 1) {
    const card = hand[index];
    ui.playerHand.appendChild(buildCardElement(card));
  }
}

function buildCardElement(card) {
  const cardElement = document.createElement("article");
  cardElement.className = `card card-${card.color}`;
  cardElement.setAttribute("aria-label", `${card.color} ${card.value}`);

  const topValue = document.createElement("span");
  topValue.className = "card-top";
  topValue.textContent = card.value;

  const middleValue = document.createElement("span");
  middleValue.className = "card-number";
  middleValue.textContent = card.value;

  const bottomValue = document.createElement("span");
  bottomValue.className = "card-bottom";
  bottomValue.textContent = card.value;

  cardElement.appendChild(topValue);
  cardElement.appendChild(middleValue);
  cardElement.appendChild(bottomValue);

  return cardElement;
}

function initGame() {
  gameState.drawPile = shuffleCards(createDeck());
  dealCards(gameState.players, gameState.drawPile, STARTING_HAND_SIZE);
  setStatus("Dealt 7 cards to each player.");
  render();

  ui.drawCardButton.addEventListener("click", function onDrawCardClick() {
    drawCard(gameState.players[0]);
  });
}

initGame();
