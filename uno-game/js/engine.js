"use strict";

function createEngine() {
  // Rule transitions are implemented in phase 03.
  return {
    name: "uno-engine-stub"
  };
}

if (typeof window !== "undefined") {
  window.UnoEngine = {
    createEngine
  };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    createEngine
  };
}
