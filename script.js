"use strict";

function createPlayer(name) {
  return {
    name,
    hand: [],
  };
}

function createDeck() {
  const deck = [];
  const colors = ["red", "yellow", "green", "blue"];

  for (const color of colors) {
    for (let value = 0; value <= 9; value += 1) {
      deck.push({ color, value });
      deck.push({ color, value });
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

function dealCards(deck, players, cardCount = 7) {
  for (let i = 0; i < cardCount; i += 1) {
    for (const player of players) {
      if (deck.length === 0) {
        return;
      }
      player.hand.push(deck.pop());
    }
  }
}

function createCardElement(card) {
  const cardElement = document.createElement("div");
  cardElement.className = "card";
  cardElement.textContent = `${card.color[0].toUpperCase()}${card.value}`;
  cardElement.title = `${card.color} ${card.value}`;
  return cardElement;
}

function renderPlayerHand(player, handContainer) {
  handContainer.innerHTML = "";
  for (const card of player.hand) {
    handContainer.appendChild(createCardElement(card));
  }
}

function updateCounters(players, deck, counterElements) {
  counterElements.drawCount.textContent = String(deck.length);
  counterElements.cpuCount.textContent = String(players.cpu.hand.length);
  counterElements.playerCount.textContent = String(players.human.hand.length);
}

function updateStatus(statusElement, message) {
  statusElement.textContent = message;
}

function drawCard(player, deck) {
  if (deck.length === 0) {
    return null;
  }
  const card = deck.pop();
  player.hand.push(card);
  return card;
}

function initGame() {
  const statusElement = document.getElementById("status");
  const handContainer = document.getElementById("player-hand");
  const drawButton = document.getElementById("draw-button");
  const counterElements = {
    drawCount: document.getElementById("draw-count"),
    cpuCount: document.getElementById("cpu-count"),
    playerCount: document.getElementById("player-count"),
  };

  const deck = createDeck();
  shuffleDeck(deck);

  const players = {
    human: createPlayer("You"),
    cpu: createPlayer("CPU"),
  };

  dealCards(deck, [players.human, players.cpu], 7);
  renderPlayerHand(players.human, handContainer);
  updateCounters(players, deck, counterElements);
  updateStatus(statusElement, "Game started: 7 cards dealt to each player.");

  drawButton.addEventListener("click", function handleDrawClick() {
    const drawnCard = drawCard(players.human, deck);
    if (!drawnCard) {
      drawButton.disabled = true;
      updateStatus(statusElement, "Draw pile is empty.");
      return;
    }

    renderPlayerHand(players.human, handContainer);
    updateCounters(players, deck, counterElements);
    updateStatus(statusElement, "You drew 1 card.");

    if (deck.length === 0) {
      drawButton.disabled = true;
      updateStatus(statusElement, "You drew the last card. Draw pile is empty.");
    }
  });
}

window.addEventListener("DOMContentLoaded", initGame);
