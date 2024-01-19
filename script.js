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

function createPlayer(name, mark) {
  const getName = () => name;
  const getMark = () => mark;
  
  return {
    getName,
    getMark,
  }
}

const gb = createGameboard();
const player1 = createPlayer("Player 1", "X");