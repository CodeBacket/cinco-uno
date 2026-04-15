"use strict";

(function initEngineModule(globalScope) {
  function applyIntent(stateSnapshot, intent) {
    return {
      ok: false,
      reason: "ENGINE_NOT_IMPLEMENTED",
      state: stateSnapshot,
      events: [{
        type: "ERROR",
        payload: {
          reason: "ENGINE_NOT_IMPLEMENTED",
          intentType: intent && intent.type ? intent.type : "unknown"
        }
      }]
    };
  }

  const engineApi = Object.freeze({
    applyIntent
  });

  if (typeof module !== "undefined" && module.exports) {
    module.exports = engineApi;
  }

  globalScope.UnoEngine = engineApi;
}(typeof window !== "undefined" ? window : globalThis));
