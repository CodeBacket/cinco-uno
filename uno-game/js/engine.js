import { EVENT_TYPES } from "./state.js";

export function createEngineNotImplementedResult(state, reason) {
  return {
    ok: false,
    newState: state,
    events: [{ type: EVENT_TYPES.ERROR, payload: { reason } }],
  };
}

export function createInitialRoundState() {
  throw new Error("Not implemented in phase 01 scaffold. See docs/03-core-engine-and-turn-loop.plan.md.");
}

export function legalPlays() {
  throw new Error("Not implemented in phase 01 scaffold. See docs/03-core-engine-and-turn-loop.plan.md.");
}

export function applyPlay() {
  throw new Error("Not implemented in phase 01 scaffold. See docs/03-core-engine-and-turn-loop.plan.md.");
}

export function applyDraw() {
  throw new Error("Not implemented in phase 01 scaffold. See docs/03-core-engine-and-turn-loop.plan.md.");
}

export function applyWildColorChoice() {
  throw new Error("Not implemented in phase 01 scaffold. See docs/03-core-engine-and-turn-loop.plan.md.");
}
