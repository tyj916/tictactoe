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

  function matchThree(row) {
    const isMatched = row.every((cell) => cell.getMark() === 'X') || row.every((cell) => cell.getMark() === 'O');
    return isMatched;
  }

  function isGameover() {
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
    getGameboard,
    displayGameboardConsole,
    placeMark,
    isGameover,
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

// Rules: Only game controller, no game rules
function gameController(p1 = "Player 1", p2 = "Player 2") {
  const gameboard = createGameboard();
  gameboard.displayGameboardConsole();

  const player1 = createPlayer(p1, "X");
  const player2 = createPlayer(p2, "O");
  const players = [player1, player2];
  let currentPlayer = players[0].getMark() === "X" ? players[0] : players[1];

    // if (gameboard.isGameover()) {
    //   console.log(`Gameover. The winner is ${currentPlayer.getName()}`);
    //   break;
    // }

  const getCurrentPlayer = () => currentPlayer.getName();

  function displayCurrentPlayer() {
    console.log(`It's ${currentPlayer.getName()}'s turn. Mark: ${currentPlayer.getMark()}`);
  }

  function switchCurrentPlayer() {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  }

  function playRound() {
    displayCurrentPlayer();
    // get selection from curentplayer
    const selectedRow = +prompt('Which row you want to place (0~2)');
    const selectedCol = +prompt('Which column you want to place? (0~2)');

    gameboard.placeMark(selectedRow, selectedCol, currentPlayer.getMark());
    gameboard.displayGameboardConsole();

    switchCurrentPlayer();
  }

  function startGame() {
    while (!gameboard.isGameover()) {
      playRound();
    }
    switchCurrentPlayer();
    console.log(`Game over! Winner is ${currentPlayer.getName()}`);
  }

  return {
    getCurrentPlayer,
    displayCurrentPlayer,
    switchCurrentPlayer,
    playRound,
    startGame,
  }
}


const gb = createGameboard();
const player = createPlayer("Player 1", "X");
const game = gameController();