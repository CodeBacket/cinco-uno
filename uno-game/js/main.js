"use strict";

function bootstrap() {
  const contract = typeof window !== "undefined" ? window.CincoUnoStateContract : null;
  if (!contract) {
    // Keep startup non-fatal in this scaffold phase.
    // Full bootstrap wiring is implemented in later plans.
    console.warn("State contract was not loaded before main bootstrap.");
    return;
  }

  window.cincoUno = Object.freeze({
    state: contract.createInitialGameState()
  });
}

if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootstrap);
  } else {
    bootstrap();
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { bootstrap };
}
