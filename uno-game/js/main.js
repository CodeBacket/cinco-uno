import {
  MIN_AI_OPPONENTS,
  MAX_AI_OPPONENTS,
  createInitialState,
  legalPlays,
  applyDraw,
  applyPass,
  applyPlay,
  applyWildColorChoice,
  cardById,
  cardLabel
} from "./engine.js";
import { chooseAiMove } from "./ai.js";
import { initUi, renderState, showGame, showMenu, announce, announceEvents } from "./ui.js";

const URL_SEARCH = new URLSearchParams(window.location.search);
const DEBUG_AI = URL_SEARCH.get("debugAi") === "1";
const AI_THINK_MS = 420;

let state = null;
let lockHumanInput = false;
let aiTimer = null;
let aiTurnToken = 0;

function logAi(message, data = {}) {
  if (!DEBUG_AI) {
    return;
  }
  // Debug logs are intentionally structured so QA can compare moves to legalPlays.
  console.log(`[DEBUG_AI] ${message}`, data);
}

function cleanupTimers() {
  if (aiTimer !== null) {
    window.clearTimeout(aiTimer);
    aiTimer = null;
  }
  aiTurnToken += 1;
}

function isHumanTurnActive() {
  return Boolean(
    state &&
      state.phase === "playing" &&
      state.currentSeat === 0 &&
      !state.awaitingWildColor &&
      !lockHumanInput
  );
}

function applyResult(result) {
  if (!result.ok) {
    return false;
  }
  state = result.state;
  announceEvents(result.events);
  return true;
}

function render(options = {}) {
  if (!state) {
    return;
  }
  renderState(state, options);
}

function runAiTurn(token) {
  if (!state || token !== aiTurnToken || state.phase === "roundOver") {
    return;
  }
  if (state.currentSeat === 0) {
    lockHumanInput = false;
    render({ isAiThinking: false });
    return;
  }

  const seat = state.currentSeat;
  const legalBefore = legalPlays(state, seat);
  const move = chooseAiMove(state, seat);
  logAi("move-selected", { seat, move, legalPlays: legalBefore });

  let changed = false;
  if (move.type === "chooseColor") {
    changed = applyResult(applyWildColorChoice(state, seat, move.color));
  } else if (move.type === "play") {
    changed = applyResult(applyPlay(state, seat, move.cardId));
  } else if (move.type === "draw") {
    changed = applyResult(applyDraw(state, seat));
    if (changed && state.mustPlayDrawnCardBySeat[seat]) {
      const drawnId = state.mustPlayDrawnCardBySeat[seat];
      const drawnCard = cardById(state, drawnId);
      logAi("play-drawn-card", { seat, cardId: drawnId, card: cardLabel(drawnCard) });
      changed = applyResult(applyPlay(state, seat, drawnId));
    }
  } else if (move.type === "pass") {
    changed = applyResult(applyPass(state, seat));
  }

  if (!changed) {
    announce(`Computer ${seat} move rejected.`);
    lockHumanInput = false;
    render({ isAiThinking: false });
    return;
  }

  render({ isAiThinking: false });
  scheduleTurns();
}

function scheduleTurns() {
  cleanupTimers();
  if (!state) {
    return;
  }
  render({ isAiThinking: state.currentSeat > 0 && state.phase === "playing" });
  if (state.phase === "roundOver") {
    lockHumanInput = true;
    return;
  }

  if (state.currentSeat === 0) {
    lockHumanInput = false;
    return;
  }

  lockHumanInput = true;
  const token = aiTurnToken;
  requestAnimationFrame(() => {
    aiTimer = window.setTimeout(() => runAiTurn(token), AI_THINK_MS);
  });
}

function startNewGame(aiCountRaw) {
  const aiCount = Number(aiCountRaw);
  if (!Number.isInteger(aiCount) || aiCount < MIN_AI_OPPONENTS || aiCount > MAX_AI_OPPONENTS) {
    announce(`Choose a value between ${MIN_AI_OPPONENTS} and ${MAX_AI_OPPONENTS}.`);
    return;
  }

  lockHumanInput = true;
  const startButton = document.getElementById("start-game");
  if (startButton) {
    startButton.disabled = true;
  }

  const playerCount = 1 + aiCount;
  state = createInitialState(playerCount);
  showGame();
  announce(`Game started with ${aiCount} computer opponents.`);
  render({ isAiThinking: false });
  scheduleTurns();

  requestAnimationFrame(() => {
    if (startButton) {
      startButton.disabled = false;
    }
  });
}

function onHumanCardClick(cardId) {
  if (!isHumanTurnActive()) {
    return;
  }
  const card = cardById(state, cardId);
  if (!card) {
    return;
  }

  const result = applyPlay(state, 0, cardId);
  if (!applyResult(result)) {
    announce("Card is not legal right now.");
    return;
  }
  render();
  if (state.awaitingWildColor) {
    lockHumanInput = true;
    return;
  }
  scheduleTurns();
}

function onHumanWildColor(color) {
  if (!state || !state.awaitingWildColor || state.awaitingWildColor.seat !== 0) {
    return;
  }
  const result = applyWildColorChoice(state, 0, color);
  if (!applyResult(result)) {
    announce("Choose a valid color.");
    return;
  }
  lockHumanInput = false;
  render();
  scheduleTurns();
}

function onHumanDraw() {
  if (!isHumanTurnActive()) {
    return;
  }

  const result = applyDraw(state, 0);
  if (!applyResult(result)) {
    announce("Draw is not available right now.");
    return;
  }
  render();
  if (!state.mustPlayDrawnCardBySeat[0]) {
    scheduleTurns();
  }
}

function onHumanPass() {
  if (!isHumanTurnActive()) {
    return;
  }
  const result = applyPass(state, 0);
  if (!applyResult(result)) {
    announce("Pass is only available after drawing a playable card.");
    return;
  }
  render();
  scheduleTurns();
}

function onBackToMenu() {
  cleanupTimers();
  state = null;
  lockHumanInput = false;
  showMenu();
  const aiSelect = document.getElementById("ai-count");
  if (aiSelect) {
    aiSelect.focus();
  }
}

function createController() {
  return {
    onHumanCardClick,
    onHumanDraw,
    onHumanPass,
    onHumanWildColor,
    onBackToMenu
  };
}

window.addEventListener("DOMContentLoaded", () => {
  const controller = createController();
  initUi(controller);
  showMenu();

  const startButton = document.getElementById("start-game");
  const aiSelect = document.getElementById("ai-count");
  if (!startButton || !aiSelect) {
    return;
  }

  startButton.addEventListener("click", () => {
    if (state) {
      return;
    }
    startNewGame(aiSelect.value);
  });
});
