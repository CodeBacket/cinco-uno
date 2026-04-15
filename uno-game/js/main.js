"use strict";

(function bootstrapScaffold() {
  if (typeof document === "undefined") {
    return;
  }

  // Phase 01 only defines architecture boundaries and shared state contract.
  const setupScreen = document.getElementById("screen-setup");
  const gameScreen = document.getElementById("screen-game");

  if (!setupScreen || !gameScreen) {
    return;
  }

  setupScreen.setAttribute("data-phase", "menu");
  gameScreen.setAttribute("data-phase", "playing");
})();
