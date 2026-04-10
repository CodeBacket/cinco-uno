"use strict";

// ============================================
// UNO Card Game - Vanilla JavaScript
// ============================================

// Card colors and types
const COLORS = ['red', 'yellow', 'green', 'blue'];
const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const SPECIAL_TYPES = ['skip', 'reverse', 'draw-two'];
const WILD_TYPES = ['wild', 'wild-draw-four'];

// ============================================
// Card Class
// ============================================
class Card {
  constructor(color, type, value = null) {
    this.color = color;
    this.type = type;
    this.value = value;
    this.id = `${color}-${type}-${value || ''}-${Math.random().toString(36).substr(2, 9)}`;
  }

  isPlayableOn(topCard, currentColor) {
    if (this.type === 'wild' || this.type === 'wild-draw-four') {
      return true;
    }
    if (this.color === currentColor) {
      return true;
    }
    if (this.type === topCard.type && this.value === topCard.value) {
      return true;
    }
    return false;
  }

  getDisplayText() {
    if (this.type === 'number') {
      return this.value;
    }
    if (this.type === 'skip') {
      return '⊘';
    }
    if (this.type === 'reverse') {
      return '⟲';
    }
    if (this.type === 'draw-two') {
      return '+2';
    }
    if (this.type === 'wild') {
      return 'W';
    }
    if (this.type === 'wild-draw-four') {
      return '+4';
    }
    return '?';
  }
}

// ============================================
// Deck Generator
// ============================================
function createDeck() {
  const deck = [];

  for (const color of COLORS) {
    deck.push(new Card(color, 'number', '0'));

    for (let i = 0; i < 2; i++) {
      for (let num = 1; num <= 9; num++) {
        deck.push(new Card(color, 'number', num.toString()));
      }
    }

    for (let i = 0; i < 2; i++) {
      deck.push(new Card(color, 'skip'));
      deck.push(new Card(color, 'reverse'));
      deck.push(new Card(color, 'draw-two'));
    }
  }

  for (let i = 0; i < 4; i++) {
    deck.push(new Card('wild', 'wild'));
    deck.push(new Card('wild', 'wild-draw-four'));
  }

  return deck;
}

function shuffleDeck(deck) {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// ============================================
// Player Class
// ============================================
class Player {
  constructor(name, isHuman = false) {
    this.name = name;
    this.hand = [];
    this.isHuman = isHuman;
  }

  addCard(card) {
    this.hand.push(card);
  }

  removeCard(cardId) {
    const index = this.hand.findIndex(c => c.id === cardId);
    if (index !== -1) {
      return this.hand.splice(index, 1)[0];
    }
    return null;
  }

  getPlayableCards(topCard, currentColor) {
    return this.hand.filter(card => card.isPlayableOn(topCard, currentColor));
  }

  hasUno() {
    return this.hand.length === 1;
  }

  hasWon() {
    return this.hand.length === 0;
  }
}

// ============================================
// Game Class
// ============================================
class UnoGame {
  constructor() {
    this.drawPile = [];
    this.discardPile = [];
    this.players = [];
    this.currentPlayerIndex = 0;
    this.direction = 1;
    this.currentColor = null;
    this.gameOver = false;
    this.winner = null;
    this.pendingDrawCards = 0;
    this.waitingForColorChoice = false;
    this.pendingCard = null;
  }

  init(playerCount = 4) {
    this.drawPile = shuffleDeck(createDeck());
    this.discardPile = [];
    this.players = [];
    this.currentPlayerIndex = 0;
    this.direction = 1;
    this.gameOver = false;
    this.winner = null;
    this.pendingDrawCards = 0;
    this.waitingForColorChoice = false;
    this.pendingCard = null;

    this.players.push(new Player('You', true));
    for (let i = 1; i < playerCount; i++) {
      this.players.push(new Player(`CPU ${i}`, false));
    }

    for (let i = 0; i < 7; i++) {
      for (const player of this.players) {
        player.addCard(this.drawPile.pop());
      }
    }

    let startCard = this.drawPile.pop();
    while (startCard.type === 'wild' || startCard.type === 'wild-draw-four') {
      this.drawPile.unshift(startCard);
      this.drawPile = shuffleDeck(this.drawPile);
      startCard = this.drawPile.pop();
    }
    this.discardPile.push(startCard);
    this.currentColor = startCard.color;

    this.handleStartingCardEffect(startCard);
  }

  handleStartingCardEffect(card) {
    if (card.type === 'skip') {
      this.nextTurn();
    } else if (card.type === 'reverse') {
      this.direction *= -1;
    } else if (card.type === 'draw-two') {
      const currentPlayer = this.getCurrentPlayer();
      this.drawCards(currentPlayer, 2);
      this.nextTurn();
    }
  }

  getCurrentPlayer() {
    return this.players[this.currentPlayerIndex];
  }

  getTopCard() {
    return this.discardPile[this.discardPile.length - 1];
  }

  drawCard(player) {
    if (this.drawPile.length === 0) {
      this.reshuffleDiscardPile();
    }
    if (this.drawPile.length > 0) {
      const card = this.drawPile.pop();
      player.addCard(card);
      return card;
    }
    return null;
  }

  drawCards(player, count) {
    for (let i = 0; i < count; i++) {
      this.drawCard(player);
    }
  }

  reshuffleDiscardPile() {
    if (this.discardPile.length <= 1) return;
    const topCard = this.discardPile.pop();
    this.drawPile = shuffleDeck(this.discardPile);
    this.discardPile = [topCard];
  }

  playCard(player, cardId, chosenColor = null) {
    const card = player.removeCard(cardId);
    if (!card) return false;

    this.discardPile.push(card);

    if (card.type === 'wild' || card.type === 'wild-draw-four') {
      if (chosenColor) {
        this.currentColor = chosenColor;
      } else {
        this.waitingForColorChoice = true;
        this.pendingCard = card;
        return true;
      }
    } else {
      this.currentColor = card.color;
    }

    this.applyCardEffect(card);

    if (player.hasWon()) {
      this.gameOver = true;
      this.winner = player;
      return true;
    }

    this.nextTurn();
    return true;
  }

  setWildColor(color) {
    this.currentColor = color;
    this.waitingForColorChoice = false;
    if (this.pendingCard) {
      this.applyCardEffect(this.pendingCard);
      this.pendingCard = null;
    }

    const currentPlayer = this.getCurrentPlayer();
    if (currentPlayer.hasWon()) {
      this.gameOver = true;
      this.winner = currentPlayer;
      return;
    }

    this.nextTurn();
  }

  applyCardEffect(card) {
    switch (card.type) {
      case 'skip':
        this.nextTurn();
        break;
      case 'reverse':
        this.direction *= -1;
        if (this.players.length === 2) {
          this.nextTurn();
        }
        break;
      case 'draw-two':
        const nextPlayer = this.getNextPlayer();
        this.drawCards(nextPlayer, 2);
        this.nextTurn();
        break;
      case 'wild-draw-four':
        const nextPlayerWild = this.getNextPlayer();
        this.drawCards(nextPlayerWild, 4);
        this.nextTurn();
        break;
    }
  }

  getNextPlayer() {
    let nextIndex = this.currentPlayerIndex + this.direction;
    if (nextIndex < 0) nextIndex = this.players.length - 1;
    if (nextIndex >= this.players.length) nextIndex = 0;
    return this.players[nextIndex];
  }

  nextTurn() {
    this.currentPlayerIndex += this.direction;
    if (this.currentPlayerIndex < 0) {
      this.currentPlayerIndex = this.players.length - 1;
    }
    if (this.currentPlayerIndex >= this.players.length) {
      this.currentPlayerIndex = 0;
    }
  }

  canPlay(card) {
    if (this.waitingForColorChoice) return false;
    return card.isPlayableOn(this.getTopCard(), this.currentColor);
  }

  cpuTurn() {
    const player = this.getCurrentPlayer();
    if (player.isHuman || this.gameOver || this.waitingForColorChoice) return;

    const playableCards = player.getPlayableCards(this.getTopCard(), this.currentColor);

    if (playableCards.length > 0) {
      const cardToPlay = playableCards[Math.floor(Math.random() * playableCards.length)];
      
      if (cardToPlay.type === 'wild' || cardToPlay.type === 'wild-draw-four') {
        const colorCounts = {};
        for (const c of COLORS) colorCounts[c] = 0;
        for (const c of player.hand) {
          if (c.color !== 'wild') colorCounts[c.color]++;
        }
        const bestColor = Object.entries(colorCounts)
          .sort((a, b) => b[1] - a[1])[0][0];
        this.playCard(player, cardToPlay.id, bestColor);
      } else {
        this.playCard(player, cardToPlay.id);
      }
    } else {
      this.drawCard(player);
      const drawnCard = player.hand[player.hand.length - 1];
      if (drawnCard && this.canPlay(drawnCard)) {
        if (drawnCard.type === 'wild' || drawnCard.type === 'wild-draw-four') {
          this.playCard(player, drawnCard.id, COLORS[Math.floor(Math.random() * COLORS.length)]);
        } else {
          this.playCard(player, drawnCard.id);
        }
      } else {
        this.nextTurn();
      }
    }
  }
}

// ============================================
// UI Renderer
// ============================================
class GameRenderer {
  constructor(game) {
    this.game = game;
    this.container = null;
    this.messageTimeout = null;
  }

  init() {
    this.container = document.querySelector('main section');
    this.container.innerHTML = '';
    this.container.setAttribute('class', 'game-container');
    this.render();
  }

  render() {
    this.container.innerHTML = '';

    const gameInfo = this.createGameInfo();
    this.container.appendChild(gameInfo);

    const opponents = this.createOpponentsArea();
    this.container.appendChild(opponents);

    const playArea = this.createPlayArea();
    this.container.appendChild(playArea);

    const playerHand = this.createPlayerHand();
    this.container.appendChild(playerHand);

    const actions = this.createActionsArea();
    this.container.appendChild(actions);

    if (this.game.waitingForColorChoice) {
      this.showColorPicker();
    }

    if (this.game.gameOver) {
      this.showGameOver();
    }
  }

  createGameInfo() {
    const div = document.createElement('div');
    div.className = 'game-info';

    const currentPlayer = this.game.getCurrentPlayer();
    const directionSymbol = this.game.direction === 1 ? '→' : '←';

    div.innerHTML = `
      <div class="info-item">
        <span class="label">Current Turn:</span>
        <span class="value">${currentPlayer.name}</span>
      </div>
      <div class="info-item">
        <span class="label">Direction:</span>
        <span class="value direction">${directionSymbol}</span>
      </div>
      <div class="info-item">
        <span class="label">Current Color:</span>
        <span class="value color-indicator ${this.game.currentColor}">${this.game.currentColor}</span>
      </div>
      <div class="info-item">
        <span class="label">Cards in Deck:</span>
        <span class="value">${this.game.drawPile.length}</span>
      </div>
    `;

    return div;
  }

  createOpponentsArea() {
    const div = document.createElement('div');
    div.className = 'opponents-area';

    for (let i = 1; i < this.game.players.length; i++) {
      const player = this.game.players[i];
      const isCurrentTurn = this.game.currentPlayerIndex === i;
      
      const playerDiv = document.createElement('div');
      playerDiv.className = `opponent ${isCurrentTurn ? 'current-turn' : ''}`;
      
      const unoIndicator = player.hasUno() ? '<span class="uno-badge">UNO!</span>' : '';
      
      playerDiv.innerHTML = `
        <div class="opponent-name">${player.name} ${unoIndicator}</div>
        <div class="opponent-cards">
          ${player.hand.map(() => '<div class="card-back"></div>').join('')}
        </div>
        <div class="card-count">${player.hand.length} cards</div>
      `;
      
      div.appendChild(playerDiv);
    }

    return div;
  }

  createPlayArea() {
    const div = document.createElement('div');
    div.className = 'play-area';

    const drawPile = document.createElement('div');
    drawPile.className = 'draw-pile';
    drawPile.innerHTML = `
      <div class="pile-label">Draw Pile</div>
      <div class="card-back large" id="draw-pile-card">
        <span>UNO</span>
      </div>
    `;

    const discardPile = document.createElement('div');
    discardPile.className = 'discard-pile';
    const topCard = this.game.getTopCard();
    discardPile.innerHTML = `
      <div class="pile-label">Discard Pile</div>
      ${this.createCardElement(topCard, false, true)}
    `;

    div.appendChild(drawPile);
    div.appendChild(discardPile);

    return div;
  }

  createPlayerHand() {
    const div = document.createElement('div');
    div.className = 'player-hand';

    const player = this.game.players[0];
    const isPlayerTurn = this.game.currentPlayerIndex === 0;
    const unoIndicator = player.hasUno() ? '<span class="uno-badge">UNO!</span>' : '';

    div.innerHTML = `<div class="hand-label">Your Hand (${player.hand.length} cards) ${unoIndicator}</div>`;

    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'cards-container';

    for (const card of player.hand) {
      const canPlay = isPlayerTurn && this.game.canPlay(card) && !this.game.waitingForColorChoice;
      cardsContainer.innerHTML += this.createCardElement(card, canPlay, false);
    }

    div.appendChild(cardsContainer);
    return div;
  }

  createCardElement(card, playable = false, isTopCard = false) {
    const colorClass = card.color === 'wild' ? 'wild' : card.color;
    const playableClass = playable ? 'playable' : '';
    const topCardClass = isTopCard ? 'top-card' : '';
    const cardText = card.getDisplayText();

    return `
      <div class="card ${colorClass} ${playableClass} ${topCardClass}" 
           data-card-id="${card.id}" 
           data-card-type="${card.type}">
        <div class="card-corner top-left">${cardText}</div>
        <div class="card-center">${cardText}</div>
        <div class="card-corner bottom-right">${cardText}</div>
      </div>
    `;
  }

  createActionsArea() {
    const div = document.createElement('div');
    div.className = 'actions-area';

    const isPlayerTurn = this.game.currentPlayerIndex === 0;

    if (isPlayerTurn && !this.game.waitingForColorChoice && !this.game.gameOver) {
      div.innerHTML = `
        <button id="draw-card-btn" class="action-btn">Draw Card</button>
        <div id="message-area" class="message-area"></div>
      `;
    } else if (!this.game.gameOver) {
      div.innerHTML = `
        <div class="waiting-message">Waiting for ${this.game.getCurrentPlayer().name}...</div>
        <div id="message-area" class="message-area"></div>
      `;
    }

    return div;
  }

  showColorPicker() {
    const overlay = document.createElement('div');
    overlay.className = 'color-picker-overlay';
    overlay.innerHTML = `
      <div class="color-picker-modal">
        <h3>Choose a Color</h3>
        <div class="color-options">
          <button class="color-btn red" data-color="red"></button>
          <button class="color-btn yellow" data-color="yellow"></button>
          <button class="color-btn green" data-color="green"></button>
          <button class="color-btn blue" data-color="blue"></button>
        </div>
      </div>
    `;
    this.container.appendChild(overlay);
  }

  showGameOver() {
    const overlay = document.createElement('div');
    overlay.className = 'game-over-overlay';
    overlay.innerHTML = `
      <div class="game-over-modal">
        <h2>${this.game.winner.name} Wins!</h2>
        <button id="new-game-btn" class="action-btn">New Game</button>
      </div>
    `;
    this.container.appendChild(overlay);
  }

  showMessage(text, duration = 2000) {
    const messageArea = document.getElementById('message-area');
    if (messageArea) {
      messageArea.textContent = text;
      messageArea.classList.add('visible');
      
      if (this.messageTimeout) clearTimeout(this.messageTimeout);
      this.messageTimeout = setTimeout(() => {
        messageArea.classList.remove('visible');
      }, duration);
    }
  }
}

// ============================================
// Game Controller
// ============================================
class GameController {
  constructor() {
    this.game = new UnoGame();
    this.renderer = new GameRenderer(this.game);
    this.cpuDelay = 1000;
  }

  start() {
    this.game.init();
    this.renderer.init();
    this.attachEventListeners();
    this.checkForCpuTurn();
  }

  attachEventListeners() {
    document.addEventListener('click', (e) => {
      if (e.target.closest('.card.playable')) {
        this.handleCardClick(e.target.closest('.card'));
      }

      if (e.target.id === 'draw-card-btn' || e.target.closest('#draw-pile-card')) {
        this.handleDrawCard();
      }

      if (e.target.closest('.color-btn')) {
        this.handleColorChoice(e.target.closest('.color-btn').dataset.color);
      }

      if (e.target.id === 'new-game-btn') {
        this.start();
      }
    });
  }

  handleCardClick(cardElement) {
    const cardId = cardElement.dataset.cardId;
    const player = this.game.players[0];
    const card = player.hand.find(c => c.id === cardId);

    if (card && this.game.canPlay(card)) {
      if (card.type === 'wild' || card.type === 'wild-draw-four') {
        this.game.playCard(player, cardId);
      } else {
        this.game.playCard(player, cardId);
      }
      this.renderer.render();
      this.checkForCpuTurn();
    }
  }

  handleDrawCard() {
    if (this.game.currentPlayerIndex !== 0 || this.game.gameOver) return;

    const player = this.game.players[0];
    this.game.drawCard(player);
    
    const drawnCard = player.hand[player.hand.length - 1];
    if (drawnCard && this.game.canPlay(drawnCard)) {
      this.renderer.render();
      this.renderer.showMessage('You drew a playable card! Click it to play or draw again.');
    } else {
      this.game.nextTurn();
      this.renderer.render();
      this.checkForCpuTurn();
    }
  }

  handleColorChoice(color) {
    this.game.setWildColor(color);
    this.renderer.render();
    this.checkForCpuTurn();
  }

  checkForCpuTurn() {
    if (this.game.gameOver) return;

    const currentPlayer = this.game.getCurrentPlayer();
    if (!currentPlayer.isHuman) {
      setTimeout(() => {
        this.game.cpuTurn();
        this.renderer.render();
        this.checkForCpuTurn();
      }, this.cpuDelay);
    }
  }
}

// ============================================
// Initialize Game
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const controller = new GameController();
  controller.start();
});
