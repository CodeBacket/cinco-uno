"use strict";

/**
 * AI boundary.
 * Move selection heuristics are implemented in plan phase 04.
 */
function chooseAiMove() {
  throw new Error("AI strategy not implemented yet.");
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    chooseAiMove,
  };
}
