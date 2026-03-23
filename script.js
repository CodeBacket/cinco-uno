"use strict";

function createPlayer(name) {
  return {
    name: name,
    hand: []
  };
}

function createDeck() {
  const deck = [];
  const colors = ["red", "yellow", "green", "blue"];

  for (let colorIndex = 0; colorIndex < colors.length; colorIndex += 1) {
    const color = colors[colorIndex];
    for (let value = 0; value <= 9; value += 1) {
      deck.push({ color: color, value: value });
      if (value !== 0) {
        deck.push({ color: color, value: value });
      }
    }
  }

  return deck;
}

function shuffleDeck(deck) {
  for (let index = deck.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    const current = deck[index];
    deck[index] = deck[randomIndex];
    deck[randomIndex] = current;
  }
}

function dealCards(deck, players, cardsPerPlayer) {
  for (let round = 0; round < cardsPerPlayer; round += 1) {
    for (let playerIndex = 0; playerIndex < players.length; playerIndex += 1) {
      const card = deck.pop();
      if (!card) {
        return;
      }
      players[playerIndex].hand.push(card);
    }
  }
}

function createCardElement(card) {
  const cardElement = document.createElement("div");
  cardElement.className = "card card-" + card.color;
  cardElement.textContent = String(card.value);
  cardElement.setAttribute("aria-label", card.color + " " + card.value);
  return cardElement;
}

function renderPlayerHand(player) {
  const handContainer = document.getElementById("player-hand");
  handContainer.innerHTML = "";

  for (let index = 0; index < player.hand.length; index += 1) {
    handContainer.appendChild(createCardElement(player.hand[index]));
  }
}

function updateCounters(gameState) {
  const drawCount = document.getElementById("draw-count");
  const cpuCount = document.getElementById("cpu-count");
  const playerCount = document.getElementById("player-count");

  drawCount.textContent = String(gameState.drawPile.length);
  cpuCount.textContent = String(gameState.cpu.hand.length);
  playerCount.textContent = String(gameState.player.hand.length);
}

function setStatus(message) {
  const statusText = document.getElementById("status-text");
  statusText.textContent = message;
}

function drawCard(gameState) {
  if (gameState.drawPile.length === 0) {
    setStatus("Draw pile is empty.");
    const drawButton = document.getElementById("draw-button");
    drawButton.disabled = true;
    return;
  }

  const drawnCard = gameState.drawPile.pop();
  gameState.player.hand.push(drawnCard);

  renderPlayerHand(gameState.player);
  updateCounters(gameState);

  const cardsLeft = gameState.drawPile.length;
  if (cardsLeft === 0) {
    setStatus("You drew the final card. Draw pile is now empty.");
    const drawButton = document.getElementById("draw-button");
    drawButton.disabled = true;
    return;
  }

  setStatus("You drew a card. " + cardsLeft + " cards remain in draw pile.");
}

function initGame() {
  const player = createPlayer("You");
  const cpu = createPlayer("CPU");

  const drawPile = createDeck();
  shuffleDeck(drawPile);
  dealCards(drawPile, [player, cpu], 7);

  const gameState = {
    player: player,
    cpu: cpu,
    drawPile: drawPile
  };

  renderPlayerHand(player);
  updateCounters(gameState);
  setStatus("Dealt 7 cards to each player.");

  const drawButton = document.getElementById("draw-button");
  drawButton.addEventListener("click", function handleDrawClick() {
    drawCard(gameState);
  });
}

document.addEventListener("DOMContentLoaded", initGame);
