"use strict";

(function registerEngineModule(globalScope) {
  const engineApi = {
    version: "phase-01-scaffold",
    // Implemented in docs/03-core-engine-and-turn-loop.plan.md.
    createInitialState: null
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = engineApi;
  }

  globalScope.CincoUnoEngine = engineApi;
})(typeof globalThis !== "undefined" ? globalThis : window);
