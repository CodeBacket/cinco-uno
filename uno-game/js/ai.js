"use strict";

function chooseAiMove() {
  return {
    type: "PASS",
    payload: null,
  };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    chooseAiMove,
  };
}
