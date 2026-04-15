"use strict";

/**
 * Pure rules engine boundary stub.
 * Plan 03 implements deck, legal-play checks, and transition reducers.
 */
function createEngine() {
  return {
    applyIntent() {
      throw new Error("Engine not implemented yet.");
    }
  };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    createEngine
  };
}
