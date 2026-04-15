'use strict';

var MIN_AI_OPPONENTS = 1;
var MAX_AI_OPPONENTS = 5;

var GAME_PHASES = Object.freeze({
  MENU: 'menu',
  PLAYING: 'playing',
  ROUND_OVER: 'roundOver',
  GAME_OVER: 'gameOver',
});

var PHASE_TRANSITIONS = Object.freeze({
  menu: Object.freeze([GAME_PHASES.PLAYING]),
  playing: Object.freeze([GAME_PHASES.ROUND_OVER]),
  roundOver: Object.freeze([GAME_PHASES.MENU, GAME_PHASES.GAME_OVER]),
  gameOver: Object.freeze([GAME_PHASES.MENU]),
});

var EVENT_TYPES = Object.freeze({
  PHASE_CHANGED: 'PHASE_CHANGED',
  TURN_CHANGED: 'TURN_CHANGED',
  CARD_PLAYED: 'CARD_PLAYED',
  CARD_DRAWN: 'CARD_DRAWN',
  WILD_COLOR_CHOSEN: 'WILD_COLOR_CHOSEN',
  PENALTY_APPLIED: 'PENALTY_APPLIED',
  DISCARD_RESHUFFLED: 'DISCARD_RESHUFFLED',
  ROUND_WON: 'ROUND_WON',
  ERROR: 'ERROR',
});

function isValidAiOpponentCount(value) {
  return Number.isInteger(value) &&
    value >= MIN_AI_OPPONENTS &&
    value <= MAX_AI_OPPONENTS;
}

function canTransitionPhase(fromPhase, toPhase) {
  var allowedTransitions = PHASE_TRANSITIONS[fromPhase];
  return Array.isArray(allowedTransitions) && allowedTransitions.indexOf(toPhase) !== -1;
}

function getAllowedPhaseTransitions(fromPhase) {
  var allowedTransitions = PHASE_TRANSITIONS[fromPhase];
  if (!Array.isArray(allowedTransitions)) {
    return [];
  }

  return allowedTransitions.slice();
}

var STATE_CONTRACT = Object.freeze({
  MIN_AI_OPPONENTS: MIN_AI_OPPONENTS,
  MAX_AI_OPPONENTS: MAX_AI_OPPONENTS,
  GAME_PHASES: GAME_PHASES,
  PHASE_TRANSITIONS: PHASE_TRANSITIONS,
  EVENT_TYPES: EVENT_TYPES,
  isValidAiOpponentCount: isValidAiOpponentCount,
  canTransitionPhase: canTransitionPhase,
  getAllowedPhaseTransitions: getAllowedPhaseTransitions,
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = STATE_CONTRACT;
}

if (typeof window !== 'undefined') {
  window.UNO_STATE_CONTRACT = STATE_CONTRACT;
}
