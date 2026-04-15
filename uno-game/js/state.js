"use strict";

const MIN_AI_OPPONENTS = 1;
const MAX_AI_OPPONENTS = 5;

const GAME_PHASES = Object.freeze({
  MENU: "menu",
  PLAYING: "playing",
  ROUND_OVER: "roundOver",
  GAME_OVER: "gameOver",
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

const ALLOWED_PHASE_TRANSITIONS = Object.freeze({
  [GAME_PHASES.MENU]: Object.freeze([GAME_PHASES.PLAYING]),
  [GAME_PHASES.PLAYING]: Object.freeze([GAME_PHASES.ROUND_OVER]),
  [GAME_PHASES.ROUND_OVER]: Object.freeze([GAME_PHASES.MENU, GAME_PHASES.GAME_OVER]),
  [GAME_PHASES.GAME_OVER]: Object.freeze([GAME_PHASES.MENU]),
});

function isValidAiOpponentCount(value) {
  return (
    Number.isInteger(value) &&
    value >= MIN_AI_OPPONENTS &&
    value <= MAX_AI_OPPONENTS
  );
}

function canTransitionPhase(fromPhase, toPhase) {
  const allowedTargets = ALLOWED_PHASE_TRANSITIONS[fromPhase];
  return Array.isArray(allowedTargets) && allowedTargets.includes(toPhase);
}

const stateContract = {
  MIN_AI_OPPONENTS,
  MAX_AI_OPPONENTS,
  GAME_PHASES,
  EVENT_TYPES,
  isValidAiOpponentCount,
  canTransitionPhase,
  ALLOWED_PHASE_TRANSITIONS,
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = stateContract;
} else if (typeof window !== "undefined") {
  window.UnoState = stateContract;
}
