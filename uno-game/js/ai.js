"use strict";

function chooseAiMove() {
  // AI policy is implemented in phase 04.
  return null;
}

if (typeof window !== "undefined") {
  window.UnoAi = {
    chooseAiMove
  };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    chooseAiMove
  };
}
