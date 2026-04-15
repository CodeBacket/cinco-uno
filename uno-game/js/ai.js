"use strict";

function chooseMove() {
  throw new Error("chooseMove is not implemented yet. See docs/04-multi-opponent-and-ai.plan.md.");
}

const aiApi = Object.freeze({
  chooseMove
});

if (typeof module !== "undefined" && module.exports) {
  module.exports = aiApi;
}

if (typeof window !== "undefined") {
  window.CincoUnoAI = aiApi;
}
