"use strict";

/**
 * Bootstrap boundary for the UNO game app.
 * Later phases connect menu, controller, engine, and rendering here.
 */
function initGameApp() {
  return {
    ready: true,
    phase: "menu",
  };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    initGameApp,
  };
}
