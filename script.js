"use strict";

function createGameboard(row = 3, col = 3) {
  const gameboard = [];

  for (let i = 0; i < row; i++) {
    gameboard.push([]);
    for(let j = 0; j < col; j++) {
      gameboard[i].push(createCell());
    }
  }

  const getBoard = () => gameboard;
  const getCell = (row, col) => gameboard[row][col];

  function placeMark(row, column, mark) {
    gameboard[row][column].setMark(mark);
  }

  function matchThree(row) {
    const isMatched = row.every((cell) => cell.getMark() === 'X') || row.every((cell) => cell.getMark() === 'O');
    return isMatched;
  }

  function hasWinner() {
    const allRows = [];

    // check for each row
    for (let i = 0; i < row; i++) {
      allRows.push(gameboard[i]);
    }

    // check for each column
    for (let i = 0; i < col; i++) {
      // convert gameboard cols to rows
      const col = gameboard.map(row => row[i]);
      allRows.push(col);
    }

    // check diagonal rows
    allRows.push([gameboard[0][0],gameboard[1][1],gameboard[2][2]],
                 [gameboard[0][2],gameboard[1][1],gameboard[2][0]]);

    // check if any rows in gameboard has 3 mark matched in a row
    return allRows.map(matchThree).includes(true);
  }

  function isTie() {
    return gameboard.every(row => row.every(cell => cell.hasMark()));
  }

  return {
    getBoard,
    getCell,
    placeMark,
    hasWinner,
    isTie,
  }
}

function createCell() {
  let cell = "";

  const getMark = () => cell;
  const setMark = (mark) => cell = mark;
  const hasMark = () => Boolean(cell);

  return {
    getMark,
    setMark,
    hasMark,
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

// Rules: Only game controller, no game rules
function gameController(p1 = "Player 1", p2 = "Player 2") {
  const gameboard = createGameboard();

  const player1 = createPlayer(p1, "X");
  const player2 = createPlayer(p2, "O");
  const players = [player1, player2];
  let currentPlayer = players[0].getMark() === "X" ? players[0] : players[1];
  let message = `It's ${currentPlayer.getName()}'s turn. Mark: ${currentPlayer.getMark()}`;

  const getCurrentPlayer = () => currentPlayer.getName();
  const getBoard = () => gameboard.getBoard();
  const getMessage = () => message;

  function switchCurrentPlayer() {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  }

  function playRound(selectedRow, selectedCol) {
    if (gameboard.hasWinner() || gameboard.isTie()) return;
    if (gameboard.getCell(selectedRow, selectedCol).hasMark()) {
      message = "This cell is selected. Please try again."
      return;
    }

    gameboard.placeMark(selectedRow, selectedCol, currentPlayer.getMark());

    if (gameboard.hasWinner()) {
      message = `Game over! Winner is ${currentPlayer.getName()}`;
    } else if (gameboard.isTie()) {
      message = "Game over! It's a tie!";
    } else {
      switchCurrentPlayer();
      message = `It's ${currentPlayer.getName()}'s turn. Mark: ${currentPlayer.getMark()}`;
    }
  }

  return {
    getCurrentPlayer,
    getBoard,
    getMessage,
    playRound,
  }
}

const game = (function screenController() {
  let controller;
  let board;

  // cache DOM
  const gameContainer = document.querySelector("#tictactoe");
  const gameboard = gameContainer.querySelector("#gameboard");
  const gameMessage = gameContainer.querySelector("#game-message");
  const startButton = gameContainer.querySelector("#start");

  // bind events
  gameboard.addEventListener('click', boardEventHandler);
  startButton.addEventListener('click', startNewGame);

  function boardEventHandler(event) {
    const target = event.target;

    if (target.tagName !== 'BUTTON') return;

    const selectedRow = event.target.dataset.row;
    const selectedCol = event.target.dataset.col;

    controller.playRound(selectedRow, selectedCol);
    render();
  }

  function render() {
    gameMessage.textContent = '';
    gameboard.textContent = '';

    gameMessage.textContent = controller.getMessage();
    
    board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        cellButton.dataset.row = rowIndex;
        cellButton.dataset.col = colIndex;
        cellButton.textContent = cell.getMark();

        gameboard.appendChild(cellButton);
      });
    });
  }

  function startNewGame() {
    const player1 = gameContainer.querySelector("#player-1");
    const player2 = gameContainer.querySelector("#player-2");

    const player1Name = player1.value ? player1.value : player1.placeholder;
    const player2Name = player2.value ? player2.value : player2.placeholder;

    controller = gameController(player1Name, player2Name);
    board = controller.getBoard();

    render();
  }
})();