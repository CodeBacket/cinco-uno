"use strict";

(function bootstrapPhaseOneScaffold() {
  if (typeof document === "undefined") {
    return;
  }

  document.addEventListener("DOMContentLoaded", function onReady() {
    const appShell = document.getElementById("app-shell");
    if (appShell) {
      appShell.setAttribute("data-ready", "true");
    }
  });
})();
