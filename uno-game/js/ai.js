"use strict";

/**
 * AI decision boundary stub.
 * Plan 04 introduces deterministic v1 AI move selection.
 */
function chooseAiMove() {
  return {
    action: "pass",
    reason: "AI logic not implemented yet."
  };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    chooseAiMove
  };
}
