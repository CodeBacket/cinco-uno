export const MIN_AI_OPPONENTS = 1;
export const MAX_AI_OPPONENTS = 5;

export const GAME_PHASES = Object.freeze({
  MENU: "menu",
  PLAYING: "playing",
  ROUND_OVER: "roundOver",
  GAME_OVER: "gameOver",
});

export const PHASE_TRANSITIONS = Object.freeze({
  [GAME_PHASES.MENU]: [GAME_PHASES.PLAYING],
  [GAME_PHASES.PLAYING]: [GAME_PHASES.ROUND_OVER, GAME_PHASES.GAME_OVER],
  [GAME_PHASES.ROUND_OVER]: [GAME_PHASES.MENU, GAME_PHASES.GAME_OVER],
  [GAME_PHASES.GAME_OVER]: [GAME_PHASES.MENU],
});

// Shared vocabulary for engine/controller/UI event payloads.
export const EVENT_TYPES = Object.freeze({
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

export function isValidAiOpponentCount(value) {
  return Number.isInteger(value) && value >= MIN_AI_OPPONENTS && value <= MAX_AI_OPPONENTS;
}

export function canTransitionPhase(fromPhase, toPhase) {
  return PHASE_TRANSITIONS[fromPhase]?.includes(toPhase) ?? false;
}

export function createInitialState({ aiOpponents }) {
  if (!isValidAiOpponentCount(aiOpponents)) {
    throw new RangeError(
      `aiOpponents must be an integer between ${MIN_AI_OPPONENTS} and ${MAX_AI_OPPONENTS}`
    );
  }

  return {
    phase: GAME_PHASES.MENU,
    players: {
      humanSeat: 0,
      aiOpponents,
      totalSeats: aiOpponents + 1,
    },
    direction: 1,
    currentPlayerIndex: 0,
    pendingWildColor: null,
    drawPile: [],
    discardPile: [],
    hands: [],
  };
}
