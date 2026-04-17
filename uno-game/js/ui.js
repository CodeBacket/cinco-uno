import { cardById, cardLabel, legalPlays, toPublicState } from "./engine.js";

const elements = {};

function cacheElements() {
  elements.screenSetup = document.getElementById("screen-setup");
  elements.screenGame = document.getElementById("screen-game");
  elements.playersRow = document.getElementById("players-row");
  elements.humanHand = document.getElementById("human-hand");
  elements.humanPanel = document.getElementById("human-panel");
  elements.humanCount = document.getElementById("human-count");
  elements.drawCount = document.getElementById("draw-count");
  elements.discardTop = document.getElementById("discard-top");
  elements.turnLabel = document.getElementById("turn-label");
  elements.directionLabel = document.getElementById("direction-label");
  elements.drawButton = document.getElementById("draw-button");
  elements.passButton = document.getElementById("pass-button");
  elements.wildPicker = document.getElementById("wild-picker");
  elements.roundOverlay = document.getElementById("round-overlay");
  elements.roundMessage = document.getElementById("round-message");
  elements.backToMenu = document.getElementById("back-to-menu");
  elements.announcer = document.getElementById("announcer");
}

function seatLabel(seatIndex) {
  return seatIndex === 0 ? "You" : `Computer ${seatIndex}`;
}

function initUi(controller) {
  cacheElements();

  elements.drawButton.addEventListener("click", () => {
    controller.onHumanDraw();
  });

  elements.passButton.addEventListener("click", () => {
    controller.onHumanPass();
  });

  elements.playersRow.addEventListener("click", (event) => {
    event.preventDefault();
  });

  elements.humanHand.addEventListener("click", (event) => {
    const cardButton = event.target.closest("[data-card-id]");
    if (!cardButton) {
      return;
    }
    const cardId = Number(cardButton.dataset.cardId);
    if (!Number.isInteger(cardId)) {
      return;
    }
    controller.onHumanCardClick(cardId);
  });

  elements.wildPicker.addEventListener("click", (event) => {
    const button = event.target.closest("[data-color]");
    if (!button) {
      return;
    }
    controller.onHumanWildColor(button.dataset.color);
  });

  elements.backToMenu.addEventListener("click", () => {
    controller.onBackToMenu();
  });
}

function ensureAiPanels(state) {
  const existingPanels = elements.playersRow.querySelectorAll(".player.ai");
  if (existingPanels.length === state.hands.length - 1) {
    return;
  }
  elements.playersRow.replaceChildren();
  for (let seat = 1; seat < state.hands.length; seat += 1) {
    const panel = document.createElement("div");
    panel.className = "player ai";
    panel.dataset.seat = String(seat);
    panel.innerHTML = `
      <span class="player-name">${seatLabel(seat)}</span>
      <span class="hand-count">0 cards</span>
    `;
    elements.playersRow.append(panel);
  }
}

function updateAiPanels(state) {
  ensureAiPanels(state);
  for (let seat = 1; seat < state.hands.length; seat += 1) {
    const panel = elements.playersRow.querySelector(`.player.ai[data-seat="${seat}"]`);
    if (!panel) {
      continue;
    }
    const countNode = panel.querySelector(".hand-count");
    if (countNode) {
      countNode.textContent = `${state.hands[seat].length} cards`;
    }
  }
}

function colorLabel(card) {
  if (!card) {
    return "";
  }
  if (card.color === "wild") {
    return "wild";
  }
  return card.color;
}

function renderHumanHand(state) {
  const legal = new Set(legalPlays(state, 0));
  const mustPlayCardId = state.mustPlayDrawnCardBySeat[0];
  elements.humanHand.replaceChildren();
  for (const cardId of state.hands[0]) {
    const card = cardById(state, cardId);
    if (!card) {
      continue;
    }
    const button = document.createElement("button");
    button.type = "button";
    button.className = "card";
    button.dataset.cardId = String(card.id);
    button.dataset.color = colorLabel(card);
    button.textContent = cardLabel(card);
    const playable = legal.has(card.id) && (!mustPlayCardId || mustPlayCardId === card.id);
    if (playable) {
      button.classList.add("card--playable");
    }
    elements.humanHand.append(button);
  }
}

function setCurrentSeatIndicators(state, options = {}) {
  const playerPanels = document.querySelectorAll(".player");
  for (const panel of playerPanels) {
    panel.removeAttribute("aria-current");
    panel.classList.remove("is-thinking");
    panel.removeAttribute("aria-busy");
  }

  const activePanel = document.querySelector(`.player[data-seat="${state.currentSeat}"]`);
  if (activePanel) {
    activePanel.setAttribute("aria-current", "true");
    if (state.currentSeat > 0 && options.isAiThinking) {
      activePanel.classList.add("is-thinking");
      activePanel.setAttribute("aria-busy", "true");
    }
  }
}

function setScreenMode(isPlaying) {
  elements.screenSetup.hidden = isPlaying;
  elements.screenGame.hidden = !isPlaying;
}

function renderRoundOverlay(state) {
  if (state.phase !== "roundOver") {
    elements.roundOverlay.hidden = true;
    return;
  }
  const winner = state.roundWinner ?? 0;
  elements.roundMessage.textContent = winner === 0 ? "Player wins" : `Computer ${winner} wins`;
  elements.roundOverlay.hidden = false;
}

function renderWildPicker(state) {
  const shouldShow = state.awaitingWildColor && state.awaitingWildColor.seat === 0;
  elements.wildPicker.hidden = !shouldShow;
}

function renderState(state, options = {}) {
  const publicState = toPublicState(state);
  const currentSeatText = publicState.currentSeat === 0 ? "Turn: You" : `Turn: Computer ${publicState.currentSeat}`;
  elements.turnLabel.textContent = currentSeatText;
  elements.directionLabel.textContent = publicState.direction === 1 ? "Direction: Clockwise" : "Direction: Counterclockwise";
  elements.drawCount.textContent = `${publicState.drawCount} cards`;
  elements.discardTop.textContent = publicState.topCardLabel;
  elements.humanCount.textContent = `${publicState.handCounts[0]} cards`;
  updateAiPanels(state);
  renderHumanHand(state);
  setCurrentSeatIndicators(state, options);
  renderWildPicker(state);
  renderRoundOverlay(state);

  const canInteract = state.phase === "playing" && state.currentSeat === 0 && !state.awaitingWildColor;
  elements.drawButton.disabled = !canInteract;

  const mustPass = Boolean(state.mustPlayDrawnCardBySeat[0]);
  elements.passButton.hidden = !mustPass || !canInteract;
  elements.passButton.disabled = !mustPass || !canInteract;
}

function announce(message) {
  elements.announcer.textContent = message;
}

function eventToAnnouncement(event) {
  if (!event) {
    return "";
  }
  switch (event.type) {
    case "CARD_PLAYED":
      return `${seatLabel(event.payload.seat)} played ${event.payload.card}.`;
    case "DRAWN":
      return `${seatLabel(event.payload.seat)} drew a card.`;
    case "DRAW_PENALTY":
      return `${seatLabel(event.payload.seat)} drew ${event.payload.amount} cards.`;
    case "WILD_COLOR_CHOSEN":
      return `${seatLabel(event.payload.seat)} chose ${event.payload.color}.`;
    case "ROUND_WON":
      return event.payload.seat === 0 ? "You won the round." : `Computer ${event.payload.seat} won the round.`;
    default:
      return "";
  }
}

function announceEvents(events = []) {
  for (const event of events) {
    const message = eventToAnnouncement(event);
    if (message) {
      announce(message);
    }
  }
}

function showMenu() {
  setScreenMode(false);
  elements.roundOverlay.hidden = true;
  elements.wildPicker.hidden = true;
  elements.playersRow.replaceChildren();
  elements.humanHand.replaceChildren();
}

function showGame() {
  setScreenMode(true);
}

export { initUi, renderState, showGame, showMenu, announceEvents, announce };
