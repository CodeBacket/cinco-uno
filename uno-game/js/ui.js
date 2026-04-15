"use strict";

(function initUiModule(globalScope) {
  function render(stateSnapshot) {
    return {
      ok: true,
      renderedPhase: stateSnapshot ? stateSnapshot.phase : "unknown"
    };
  }

  const uiApi = Object.freeze({
    render
  });

  if (typeof module !== "undefined" && module.exports) {
    module.exports = uiApi;
  }

  globalScope.UnoUi = uiApi;
}(typeof window !== "undefined" ? window : globalThis));
