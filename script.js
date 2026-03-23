"use strict";

const gameState = {
  players: {
    human: createPlayer("You"),
    cpu: createPlayer("CPU")
  },
  drawPile: []
};

const statusTextEl = document.getElementById("game-status");
const drawPileCountEl = document.getElementById("draw-pile-count");
const cpuHandCountEl = document.getElementById("cpu-hand-count");
const playerHandCountEl = document.getElementById("player-hand-count");
const playerHandEl = document.getElementById("player-hand");
const drawCardBtn = document.getElementById("draw-card-btn");

function createPlayer(name) {
  return {
    name,
    hand: []
  };
}

function createSimpleDeck() {
  const deck = [];
  const colors = ["Red", "Yellow", "Green", "Blue"];

  for (const color of colors) {
    for (let value = 0; value <= 9; value += 1) {
      deck.push({
        color,
        value
      });
      deck.push({
        color,
        value
      });
    }
  }

  return deck;
}

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const temp = deck[i];
    deck[i] = deck[randomIndex];
    deck[randomIndex] = temp;
  }
}

function dealCards(drawPile, players, cardsEach) {
  for (let dealRound = 0; dealRound < cardsEach; dealRound += 1) {
    for (const player of players) {
      const card = drawPile.pop();
      if (!card) {
        return;
      }

      player.hand.push(card);
    }
  }
}

function createCardElement(card) {
  const cardEl = document.createElement("div");
  cardEl.className = "card";
  cardEl.textContent = `${card.color[0]}${card.value}`;
  cardEl.setAttribute("aria-label", `${card.color} ${card.value}`);
  return cardEl;
}

function renderPlayerHand(player) {
  playerHandEl.innerHTML = "";

  for (const card of player.hand) {
    playerHandEl.appendChild(createCardElement(card));
  }
}

function updateCounters() {
  drawPileCountEl.textContent = String(gameState.drawPile.length);
  cpuHandCountEl.textContent = String(gameState.players.cpu.hand.length);
  playerHandCountEl.textContent = String(gameState.players.human.hand.length);
}

function drawCard(player) {
  const card = gameState.drawPile.pop();

  if (!card) {
    statusTextEl.textContent = "Draw pile is empty. No card was drawn.";
    drawCardBtn.disabled = true;
    updateCounters();
    return null;
  }

  player.hand.push(card);
  renderPlayerHand(player);
  updateCounters();
  statusTextEl.textContent = `${player.name} drew 1 card.`;

  if (gameState.drawPile.length === 0) {
    drawCardBtn.disabled = true;
  }

  return card;
}

function initGame() {
  gameState.drawPile = createSimpleDeck();
  shuffleDeck(gameState.drawPile);
  dealCards(gameState.drawPile, [gameState.players.human, gameState.players.cpu], 7);
  renderPlayerHand(gameState.players.human);
  updateCounters();
  drawCardBtn.disabled = false;
  statusTextEl.textContent = "Game ready. 7 cards dealt to each player.";

  drawCardBtn.addEventListener("click", () => {
    drawCard(gameState.players.human);
  });
}

initGame();
