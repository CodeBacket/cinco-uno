"use strict";

(function registerAiModule(globalScope) {
  const aiApi = {
    version: "phase-01-scaffold",
    // Implemented in docs/04-multi-opponent-and-ai.plan.md.
    chooseMove: null
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = aiApi;
  }

  globalScope.CincoUnoAI = aiApi;
})(typeof globalThis !== "undefined" ? globalThis : window);
