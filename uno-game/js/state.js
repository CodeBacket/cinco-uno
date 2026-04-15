"use strict";

// Ticket #31 phase-01 shared state contract constants.
const MIN_AI_OPPONENTS = 1;
const MAX_AI_OPPONENTS = 5;

const GAME_PHASES = Object.freeze({
  MENU: "menu",
  PLAYING: "playing",
  ROUND_OVER: "roundOver",
  GAME_OVER: "gameOver",
});

const PHASE_TRANSITIONS = Object.freeze({
  [GAME_PHASES.MENU]: Object.freeze([GAME_PHASES.PLAYING]),
  [GAME_PHASES.PLAYING]: Object.freeze([GAME_PHASES.ROUND_OVER]),
  [GAME_PHASES.ROUND_OVER]: Object.freeze([GAME_PHASES.MENU, GAME_PHASES.GAME_OVER]),
  [GAME_PHASES.GAME_OVER]: Object.freeze([GAME_PHASES.MENU]),
});

const EVENT_TYPES = Object.freeze({
  PHASE_CHANGED: "PHASE_CHANGED",
  TURN_CHANGED: "TURN_CHANGED",
  CARD_PLAYED: "CARD_PLAYED",
  CARD_DRAWN: "CARD_DRAWN",
  WILD_COLOR_CHOSEN: "WILD_COLOR_CHOSEN",
  PENALTY_APPLIED: "PENALTY_APPLIED",
  DISCARD_RESHUFFLED: "DISCARD_RESHUFFLED",
  ROUND_WON: "ROUND_WON",
  ERROR: "ERROR",
});

function isValidAiOpponentCount(count) {
  return Number.isInteger(count) && count >= MIN_AI_OPPONENTS && count <= MAX_AI_OPPONENTS;
}

function canTransitionPhase(fromPhase, toPhase) {
  const nextPhases = PHASE_TRANSITIONS[fromPhase];
  return Array.isArray(nextPhases) ? nextPhases.includes(toPhase) : false;
}

function createInitialState(aiOpponentCount) {
  if (!isValidAiOpponentCount(aiOpponentCount)) {
    throw new RangeError(
      "aiOpponentCount must be an integer between MIN_AI_OPPONENTS and MAX_AI_OPPONENTS",
    );
  }

  return {
    phase: GAME_PHASES.MENU,
    aiOpponentCount,
    direction: 1,
    currentPlayerIndex: 0,
    pendingWildColor: null,
    hands: [],
    drawPile: [],
    discardPile: [],
  };
}

const stateApi = {
  MIN_AI_OPPONENTS,
  MAX_AI_OPPONENTS,
  GAME_PHASES,
  PHASE_TRANSITIONS,
  EVENT_TYPES,
  isValidAiOpponentCount,
  canTransitionPhase,
  createInitialState,
};

if (typeof window !== "undefined") {
  window.CincoUno = window.CincoUno || {};
  window.CincoUno.state = stateApi;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = stateApi;
  exports.MIN_AI_OPPONENTS = MIN_AI_OPPONENTS;
  exports.MAX_AI_OPPONENTS = MAX_AI_OPPONENTS;
  exports.GAME_PHASES = GAME_PHASES;
  exports.PHASE_TRANSITIONS = PHASE_TRANSITIONS;
  exports.EVENT_TYPES = EVENT_TYPES;
  exports.isValidAiOpponentCount = isValidAiOpponentCount;
  exports.canTransitionPhase = canTransitionPhase;
  exports.createInitialState = createInitialState;
}
