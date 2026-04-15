'use strict';

/**
 * Entry point placeholder for menu/controller wiring.
 * Plan 04 owns the game loop and intent plumbing.
 */
function bootstrapGame() {
  return {
    started: false,
    reason: 'Controller bootstrap pending multi-opponent plan.',
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    bootstrapGame,
  };
}
