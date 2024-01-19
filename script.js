"use strict";

function createGameboard(row = 3, col = 3) {
  const gameboard = [];

  for (let i = 0; i < row; i++) {
    gameboard.push([]);
    for(let j = 0; j < col; j++) {
      gameboard[i].push(createCell());
    }
  }

  const getGameboard = () => gameboard;

  return {
    getGameboard,
  }
}

function createCell() {
  let cell = "";

  const getMark = () => cell;
  const setMark = (mark) => cell = mark;

  return {
    getMark,
    setMark,
  };
}

function createPlayer(name, mark) {
  const getName = () => name;
  const getMark = () => mark;
  
  return {
    getName,
    getMark,
  }
}

function startGame(p1 = "Player 1", p2 = "Player 2") {
  const gameboard = createGameboard();

  const player1 = createPlayer(p1, "X");
  const player2 = createPlayer(p2, "O");
  const players = [player1, player2];
  let currentPlayer = players[0].getMark() === "X" ? players[0] : players[1];

  const getCurrentPlayer = () => currentPlayer.getName();

  function switchCurrentPlayer() {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[2];
  }

  function playRound() {

  }

  return {
    getCurrentPlayer,
    switchCurrentPlayer,
    playRound,
  }
}


const gb = createGameboard();
const player = createPlayer("Player 1", "X");
const game = startGame();