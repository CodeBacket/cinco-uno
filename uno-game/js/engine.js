"use strict";

/**
 * Rule engine boundary.
 * Pure transition functions are implemented in plan phase 03.
 */
function createEngine() {
  return {
    applyIntent() {
      throw new Error("Engine not implemented yet.");
    },
  };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    createEngine,
  };
}
