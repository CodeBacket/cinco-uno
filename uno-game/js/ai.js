'use strict';

/**
 * Placeholder AI strategy module.
 * Plan 04 will implement legal-play-based decision logic.
 */
function chooseAiMove() {
  return {
    action: 'draw',
    reason: 'AI policy not implemented yet.',
  };
}

function chooseWildColorFromHand() {
  return 'red';
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    chooseAiMove,
    chooseWildColorFromHand,
  };
}
