"use strict";

(function bootstrapCincoUno() {
  if (typeof window === "undefined") {
    return;
  }

  const app = window.CincoUno || {};
  const state = window.CincoUnoState || {};

  app.start = function start() {
    return {
      phase: state.GAME_PHASES ? state.GAME_PHASES.MENU : "menu",
      message: "Cinco UNO scaffold initialized.",
    };
  };

  window.CincoUno = app;
})();
