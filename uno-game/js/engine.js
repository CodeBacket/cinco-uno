"use strict";

/**
 * Placeholder engine module for phase 01.
 * Rule logic is implemented in plan 03.
 */
function notImplemented(name) {
  throw new Error(name + " is not implemented yet.");
}

function createInitialState() {
  return notImplemented("createInitialState");
}

function legalPlays() {
  return notImplemented("legalPlays");
}

function applyPlay() {
  return notImplemented("applyPlay");
}

function applyDraw() {
  return notImplemented("applyDraw");
}

function applyWildColorChoice() {
  return notImplemented("applyWildColorChoice");
}

exports.createInitialState = createInitialState;
exports.legalPlays = legalPlays;
exports.applyPlay = applyPlay;
exports.applyDraw = applyDraw;
exports.applyWildColorChoice = applyWildColorChoice;
