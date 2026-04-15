"use strict";

function chooseMove() {
  return {
    type: "noop",
    reason: "NOT_IMPLEMENTED",
  };
}

const ai = { chooseMove };

if (typeof module !== "undefined" && module.exports) {
  module.exports = ai;
}

if (typeof window !== "undefined") {
  window.CincoUnoAi = ai;
}
