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
  const displayGameboardConsole = () => {
    const arr = [];
    for (let i = 0; i < row; i++) {
      arr[i] = [];
      for(let j = 0; j < col; j++) {
        arr[i].push(gameboard[i][j].getMark());
      }
    }
    console.log(arr);
  };

  function placeMark(row, column, mark) {
    gameboard[row][column].setMark(mark);
  }

  return {
    getGameboard,
    displayGameboardConsole,
    placeMark,
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

function gameController(p1 = "Player 1", p2 = "Player 2") {
  const gameboard = createGameboard();
  gameboard.displayGameboardConsole();

  const player1 = createPlayer(p1, "X");
  const player2 = createPlayer(p2, "O");
  const players = [player1, player2];
  let currentPlayer = players[0].getMark() === "X" ? players[0] : players[1];

  const getCurrentPlayer = () => currentPlayer.getName();

  function displayCurrentPlayer() {
    console.log(`It's ${currentPlayer.getName()}'s turn. Mark: ${currentPlayer.getMark()}`);
  }

  function switchCurrentPlayer() {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[2];
  }

  function playRound() {
    // display current player
    displayCurrentPlayer();
    // get selection from curentplayer
    const selectedRow = +prompt('Which row you want to place (0~2)');
    const selectedCol = +prompt('Which column you want to place? (0~2)');
    // place mark on selection
    gameboard.placeMark(selectedRow, selectedCol, currentPlayer.getMark());
    // display gameboard
    gameboard.displayGameboardConsole();
    // check win condition

    // switch player
    switchCurrentPlayer();
  }

  return {
    getCurrentPlayer,
    displayCurrentPlayer,
    switchCurrentPlayer,
    playRound,
  }
}


const gb = createGameboard();
const player = createPlayer("Player 1", "X");
const game = gameController();