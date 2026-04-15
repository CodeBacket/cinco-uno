"use strict";

(function initAiModule(globalScope) {
  function chooseMove() {
    return {
      type: "PASS",
      payload: {
        reason: "AI_NOT_IMPLEMENTED"
      }
    };
  }

  const aiApi = Object.freeze({
    chooseMove
  });

  if (typeof module !== "undefined" && module.exports) {
    module.exports = aiApi;
  }

  globalScope.UnoAi = aiApi;
}(typeof window !== "undefined" ? window : globalThis));
