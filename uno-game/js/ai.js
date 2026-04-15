"use strict";

function chooseAiMove() {
  return {
    kind: "pass",
    reason: "AI policy is planned for phase 04.",
  };
}

function chooseWildColorFromHand() {
  return "red";
}

const aiApi = {
  chooseAiMove,
  chooseWildColorFromHand,
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = aiApi;
}

if (typeof window !== "undefined") {
  window.UnoAi = aiApi;
}
