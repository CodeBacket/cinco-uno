"use strict";

(function bootstrap(globalScope) {
  const stateApi = globalScope.UnoState;
  const uiApi = globalScope.UnoUi;

  function createAppController() {
    if (!stateApi) {
      throw new Error("UnoState contract is not loaded.");
    }

    const state = stateApi.createInitialMetaState();

    return {
      getState: function getState() {
        return state;
      },
      startRound: function startRound(aiOpponentCount) {
        if (!stateApi.isValidAiOpponentCount(aiOpponentCount)) {
          return {
            ok: false,
            error: "AI_OPPONENT_COUNT_OUT_OF_RANGE"
          };
        }

        if (!stateApi.canTransitionPhase(state.phase, stateApi.GAME_PHASES.PLAYING)) {
          return {
            ok: false,
            error: "INVALID_PHASE_TRANSITION"
          };
        }

        state.phase = stateApi.GAME_PHASES.PLAYING;
        state.aiOpponentCount = aiOpponentCount;

        return {
          ok: true
        };
      }
    };
  }

  function startApp() {
    const controller = createAppController();
    if (uiApi && typeof uiApi.render === "function") {
      uiApi.render(controller.getState());
    }
    globalScope.UnoApp = controller;
  }

  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", startApp);
    } else {
      startApp();
    }
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = {
      createAppController
    };
  }
}(typeof window !== "undefined" ? window : globalThis));
