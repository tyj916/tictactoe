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

  return {
    getBoard,
    getCell,
    placeMark,
    hasWinner,
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
  gameboard.displayGameboardConsole();
  let gameover = false;

  const player1 = createPlayer(p1, "X");
  const player2 = createPlayer(p2, "O");
  const players = [player1, player2];
  let currentPlayer = players[0].getMark() === "X" ? players[0] : players[1];

  const getCurrentPlayer = () => currentPlayer.getName();
  const getBoard = () => gameboard.getBoard();
  const isGameover = () => gameover;

  function displayCurrentPlayer() {
    console.log(`It's ${currentPlayer.getName()}'s turn. Mark: ${currentPlayer.getMark()}`);
  }

  function switchCurrentPlayer() {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  }

  function playRound(selectedRow, selectedCol) {
    displayCurrentPlayer();

    if (gameboard.getCell(selectedRow, selectedCol).hasMark()) {
      console.log("This cell is selected, please try again");
      return;
    }

    gameboard.placeMark(selectedRow, selectedCol, currentPlayer.getMark());
    gameboard.displayGameboardConsole();

    if (gameboard.hasWinner()) {
      gameover = true;
      announceWinner();
      return;
    }

    switchCurrentPlayer();
  }

  function announceWinner() {
    console.log(`Game over! Winner is ${currentPlayer.getName()}`);
  }

  return {
    getCurrentPlayer,
    getBoard,
    isGameover,
    displayCurrentPlayer,
    switchCurrentPlayer,
    playRound,
    announceWinner,
  }
}

const game = (function screenController() {
  const controller = gameController();

  // cache DOM
  const gameContainer = document.querySelector("#tictactoe");
  const gameboard = gameContainer.querySelector("#gameboard");

  // bind events
  gameboard.addEventListener('click', boardEventHandler);

  render();

  function render() {
    gameboard.textContent = '';

    const board = controller.getBoard();
    
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

  function boardEventHandler(event) {
    const target = event.target;

    if (target.tagName !== 'BUTTON') return;

    if (controller.isGameover()) {
      return;
    }

    const selectedRow = event.target.dataset.row;
    const selectedCol = event.target.dataset.col;

    controller.playRound(selectedRow, selectedCol);
    render();
  }
})();

/*

Todo:
1. announce tie if no winner
2. haha */