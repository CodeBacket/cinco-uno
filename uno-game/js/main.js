import {
  createInitialState,
  GAME_PHASES,
  MAX_AI_OPPONENTS,
  MIN_AI_OPPONENTS,
  PHASE_TRANSITIONS,
} from "./state.js";

function renderScaffoldSummary(root) {
  const summary = document.createElement("pre");
  summary.setAttribute("aria-label", "Phase 01 architecture summary");
  summary.textContent = JSON.stringify(
    {
      aiOpponentRange: [MIN_AI_OPPONENTS, MAX_AI_OPPONENTS],
      phases: GAME_PHASES,
      transitions: PHASE_TRANSITIONS,
      sampleState: createInitialState({ aiOpponents: MIN_AI_OPPONENTS }),
    },
    null,
    2
  );
  root.appendChild(summary);
}

document.addEventListener("DOMContentLoaded", () => {
  const screenSetup = document.getElementById("screen-setup");
  if (!screenSetup) {
    return;
  }

  renderScaffoldSummary(screenSetup);
});
