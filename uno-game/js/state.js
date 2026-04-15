"use strict";

const MIN_AI_OPPONENTS = 1;
const MAX_AI_OPPONENTS = 5;
const HUMAN_PLAYER_COUNT = 1;
const MAX_PLAYERS = HUMAN_PLAYER_COUNT + MAX_AI_OPPONENTS;

const GAME_PHASES = Object.freeze({
  MENU: "menu",
  PLAYING: "playing",
  ROUND_OVER: "roundOver",
  GAME_OVER: "gameOver",
});

const ALLOWED_PHASE_TRANSITIONS = Object.freeze({
  [GAME_PHASES.MENU]: Object.freeze([GAME_PHASES.PLAYING]),
  [GAME_PHASES.PLAYING]: Object.freeze([GAME_PHASES.ROUND_OVER, GAME_PHASES.GAME_OVER]),
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

function isValidAiOpponentCount(value) {
  return Number.isInteger(value) && value >= MIN_AI_OPPONENTS && value <= MAX_AI_OPPONENTS;
}

function canTransitionPhase(fromPhase, toPhase) {
  const transitions = ALLOWED_PHASE_TRANSITIONS[fromPhase];
  return Array.isArray(transitions) && transitions.includes(toPhase);
}

function createInitialSessionState(aiOpponentCount) {
  if (!isValidAiOpponentCount(aiOpponentCount)) {
    throw new RangeError(
      `AI opponent count must be an integer in [${MIN_AI_OPPONENTS}, ${MAX_AI_OPPONENTS}]`
    );
  }

  return {
    phase: GAME_PHASES.MENU,
    aiOpponentCount,
    playerCount: HUMAN_PLAYER_COUNT + aiOpponentCount,
    maxPlayers: MAX_PLAYERS,
    direction: 1,
    activeSeat: 0,
    pendingWildColor: null,
  };
}

const stateContract = {
  MIN_AI_OPPONENTS,
  MAX_AI_OPPONENTS,
  HUMAN_PLAYER_COUNT,
  MAX_PLAYERS,
  GAME_PHASES,
  ALLOWED_PHASE_TRANSITIONS,
  EVENT_TYPES,
  isValidAiOpponentCount,
  canTransitionPhase,
  createInitialSessionState,
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = stateContract;
}

if (typeof window !== "undefined") {
  window.UnoState = stateContract;
}
