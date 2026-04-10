"use strict";

(function initializeUnoGameplay() {
  const COLORS = ["red", "yellow", "green", "blue"];
  const SYMBOLS = ["skip", "reverse", "draw-two"];

  const gameState = {
    players: [
      { id: "P1", name: "Player 1", hand: [] },
      { id: "P2", name: "Player 2", hand: [] },
    ],
    currentPlayerIndex: 0,
    direction: 1,
    drawPile: [],
    discardPile: [],
    gameStarted: false,
    turnLocked: false,
    logs: [],
  };

  function createDeck() {
    const deck = [];

    COLORS.forEach((color) => {
      deck.push({ color, value: 0, type: "number" });

      for (let number = 1; number <= 9; number += 1) {
        deck.push({ color, value: number, type: "number" });
        deck.push({ color, value: number, type: "number" });
      }

      SYMBOLS.forEach((symbol) => {
        deck.push({ color, value: symbol, type: "symbol" });
        deck.push({ color, value: symbol, type: "symbol" });
      });
    });

    for (let index = 0; index < 4; index += 1) {
      deck.push({ color: "wild", value: "wild", type: "wild" });
      deck.push({ color: "wild", value: "wild-draw-four", type: "wild" });
    }

    return deck;
  }

  function shuffle(array) {
    for (let index = array.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      const temp = array[index];
      array[index] = array[randomIndex];
      array[randomIndex] = temp;
    }
    return array;
  }

  function cardToString(card) {
    if (!card) {
      return "-";
    }

    return `${card.color} ${card.value}`;
  }

  function getTopCard() {
    return gameState.discardPile[gameState.discardPile.length - 1] || null;
  }

  function getCurrentPlayer() {
    return gameState.players[gameState.currentPlayerIndex] || null;
  }

  function addLog(message) {
    gameState.logs.unshift(message);
    if (gameState.logs.length > 15) {
      gameState.logs = gameState.logs.slice(0, 15);
    }
    console.log(`[UNO] ${message}`);
  }

  function canPlayCard(card, topCard) {
    if (!card) {
      return false;
    }

    if (!topCard) {
      return true;
    }

    if (card.color === "wild" || card.value === "wild" || card.value === "wild-draw-four") {
      return true;
    }

    if (card.color === topCard.color) {
      return true;
    }

    return card.value === topCard.value;
  }

  function getPlayableCards(hand, topCard) {
    return hand
      .map((card, index) => ({ card, index }))
      .filter((entry) => canPlayCard(entry.card, topCard));
  }

  function hasPlayableCard(hand, topCard) {
    return hand.some((card) => canPlayCard(card, topCard));
  }

  function nextTurn() {
    const playerCount = gameState.players.length;
    gameState.currentPlayerIndex =
      (gameState.currentPlayerIndex + gameState.direction + playerCount) % playerCount;
    return getCurrentPlayer();
  }

  function startTurn() {
    const currentPlayer = getCurrentPlayer();
    if (!currentPlayer) {
      return;
    }

    gameState.turnLocked = false;
    addLog(`${currentPlayer.name}'s turn started.`);

    if (!hasPlayableCard(currentPlayer.hand, getTopCard())) {
      addLog(`${currentPlayer.name} has no playable card and must draw.`);
      drawCard(gameState.currentPlayerIndex);
      return;
    }

    updateUI();
  }

  function endTurn() {
    gameState.turnLocked = true;
    const nextPlayer = nextTurn();
    addLog(`Turn ended. Next player: ${nextPlayer.name}.`);
    startTurn();
  }

  function reshuffleDiscardIntoDraw() {
    if (gameState.discardPile.length <= 1) {
      return false;
    }

    const topCard = gameState.discardPile.pop();
    const cardsToShuffle = shuffle(gameState.discardPile.slice());
    gameState.discardPile = [topCard];
    gameState.drawPile.push(...cardsToShuffle);
    addLog("Draw pile was empty, reshuffled discard pile.");
    return true;
  }

  function drawSingleCard() {
    if (gameState.drawPile.length === 0) {
      const reshuffled = reshuffleDiscardIntoDraw();
      if (!reshuffled) {
        return null;
      }
    }

    return gameState.drawPile.pop() || null;
  }

  function drawCard(playerIndex) {
    const currentPlayer = getCurrentPlayer();
    if (!currentPlayer || playerIndex !== gameState.currentPlayerIndex || gameState.turnLocked) {
      return false;
    }

    const drawnCard = drawSingleCard();
    if (!drawnCard) {
      addLog("No card available to draw.");
      return false;
    }

    currentPlayer.hand.push(drawnCard);
    addLog(`${currentPlayer.name} drew ${cardToString(drawnCard)}.`);

    if (canPlayCard(drawnCard, getTopCard())) {
      currentPlayer.hand.pop();
      gameState.discardPile.push(drawnCard);
      addLog(`${currentPlayer.name} auto-played drawn card ${cardToString(drawnCard)}.`);
    }

    updateUI();
    endTurn();
    return true;
  }

  function playCard(playerIndex, cardIndex) {
    const currentPlayer = getCurrentPlayer();
    if (!currentPlayer || playerIndex !== gameState.currentPlayerIndex || gameState.turnLocked) {
      return false;
    }

    const selectedCard = currentPlayer.hand[cardIndex];
    if (!selectedCard) {
      return false;
    }

    if (!canPlayCard(selectedCard, getTopCard())) {
      addLog(`Invalid play attempted: ${cardToString(selectedCard)}.`);
      return false;
    }

    const playedCard = currentPlayer.hand.splice(cardIndex, 1)[0];
    gameState.discardPile.push(playedCard);
    addLog(`${currentPlayer.name} played ${cardToString(playedCard)}.`);
    updateUI();
    endTurn();
    return true;
  }

  function buildCardButton(card, cardIndex, isPlayable) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `card-button${isPlayable ? " playable" : ""}`;
    button.textContent = cardToString(card);
    button.disabled = !isPlayable || gameState.turnLocked;
    button.addEventListener("click", () => {
      playCard(gameState.currentPlayerIndex, cardIndex);
    });
    return button;
  }

  function updateUI() {
    const turnIndicator = document.getElementById("turn-indicator");
    const discardTop = document.getElementById("discard-top");
    const drawCount = document.getElementById("draw-count");
    const handContainer = document.getElementById("player-hand");
    const gameLog = document.getElementById("game-log");
    const drawButton = document.getElementById("draw-button");

    if (!turnIndicator || !discardTop || !drawCount || !handContainer || !gameLog || !drawButton) {
      return;
    }

    const currentPlayer = getCurrentPlayer();
    const topCard = getTopCard();
    const playableIndexes = new Set(getPlayableCards(currentPlayer.hand, topCard).map((entry) => entry.index));

    turnIndicator.textContent = `Current Turn: ${currentPlayer.name}`;
    discardTop.textContent = cardToString(topCard);
    drawCount.textContent = String(gameState.drawPile.length);

    handContainer.innerHTML = "";
    currentPlayer.hand.forEach((card, cardIndex) => {
      handContainer.appendChild(buildCardButton(card, cardIndex, playableIndexes.has(cardIndex)));
    });

    drawButton.disabled = gameState.turnLocked;
    drawButton.onclick = () => {
      drawCard(gameState.currentPlayerIndex);
    };

    gameLog.innerHTML = "";
    gameState.logs.forEach((entry) => {
      const row = document.createElement("li");
      row.textContent = entry;
      gameLog.appendChild(row);
    });
  }

  function dealStartingHands() {
    const cardsPerPlayer = 7;
    for (let count = 0; count < cardsPerPlayer; count += 1) {
      gameState.players.forEach((player) => {
        const card = gameState.drawPile.pop();
        if (card) {
          player.hand.push(card);
        }
      });
    }
  }

  function initializeGame() {
    const deck = shuffle(createDeck());
    gameState.drawPile = deck;
    gameState.discardPile = [];
    gameState.players.forEach((player) => {
      player.hand = [];
    });
    gameState.logs = [];
    gameState.currentPlayerIndex = 0;
    gameState.direction = 1;
    gameState.turnLocked = false;

    dealStartingHands();

    let firstCard = gameState.drawPile.pop() || null;
    while (firstCard && firstCard.color === "wild") {
      gameState.drawPile.unshift(firstCard);
      firstCard = gameState.drawPile.pop() || null;
    }

    if (firstCard) {
      gameState.discardPile.push(firstCard);
    }

    gameState.gameStarted = true;
    addLog(`Game initialized. Starting card: ${cardToString(getTopCard())}.`);
    updateUI();
    startTurn();
  }

  window.unoGame = {
    gameState,
    getCurrentPlayer,
    nextTurn,
    startTurn,
    endTurn,
    getTopCard,
    canPlayCard,
    getPlayableCards,
    hasPlayableCard,
    playCard,
    drawCard,
    reshuffleDiscardIntoDraw,
    updateUI,
    initializeGame,
  };

  initializeGame();
})();
