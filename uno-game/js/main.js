"use strict";

function bootstrapUnoGame() {
  // Intentionally minimal in phase 01: wiring lands in plans 02-04.
  return {
    started: false
  };
}

if (typeof window !== "undefined") {
  window.UnoMain = {
    bootstrapUnoGame
  };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    bootstrapUnoGame
  };
}
