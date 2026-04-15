"use strict";

(function initEngineNamespace() {
  if (typeof window === "undefined") {
    return;
  }

  window.CincoUnoEngine = window.CincoUnoEngine || {
    version: "phase-01-scaffold",
  };
})();
