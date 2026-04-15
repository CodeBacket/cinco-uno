"use strict";

function chooseAiMove() {
  throw new Error("chooseAiMove is not implemented in phase 01 scaffold.");
}

const aiApi = {
  chooseAiMove,
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = aiApi;
} else if (typeof window !== "undefined") {
  window.UnoAi = aiApi;
}
