"use strict";

function createGameboard(row = 3, col = 3) {
  const gameboard = [];

  for (let i = 0; i < row; i++) {
    gameboard.push([]);
    for(let j = 0; j < col; j++) {
      gameboard[i].push("");
    }
  }

  const getGameboard = () => gameboard;

  return {
    getGameboard,
  }
}

const gb = createGameboard();