// Write your code here.
const BOARD_WIDTH = 3;

const WIN_CONDITIONS = [
  [0, 1, 2], // 1st row
  [3, 4, 5], // 2nd row
  [6, 7, 8], // 3rd row
  [0, 3, 6], // 1st column
  [1, 4, 7], // 2nd column
  [2, 5, 8], // third column
  [0, 4, 8], // first diagonal
  [2, 4, 6], // second diagonal
  ,
];

let currentPlayer = 1;
let numMovesDone = 0;

const gameHeading = document.getElementById('game-heading');
const gameSquares = document.querySelectorAll('.game-square');
const restartButton = document.getElementById('restart-button');

restartButton.addEventListener('click', restartGame);

gameSquares.forEach((gameSquare, idx) => {
  gameSquare.addEventListener('click', () => onSquareClick(gameSquare, idx));
});

function onSquareClick(clickedSquare, clickedSquareIndex) {
  const row = Math.floor(clickedSquareIndex / BOARD_WIDTH);
  const col = clickedSquareIndex % BOARD_WIDTH;
  makeMove(clickedSquare, row, col);
}

function makeMove(square) {
  square.textContent = currentPlayer === 1 ? 'X' : 'O';
  square.disabled = true;
  numMovesDone++;

  if (didCurrentPlayerWin()) {
    gameHeading.textContent = `Player ${currentPlayer} Won!`;
    endGame();
  } else if (numMovesDone >= BOARD_WIDTH * BOARD_WIDTH) {
    gameHeading.textContent = 'Tie Game!';
    endGame();
  } else {
    switchPlayer();
  }
}

function didCurrentPlayerWin() {
  const relevantText = currentPlayer === 1 ? 'X' : 'O';

  return WIN_CONDITIONS.some((conditionArray) => {
    return conditionArray.every((gameSquareIndex) => {
      return gameSquares[gameSquareIndex].textContent === relevantText;
    });
  });
}

function endGame() {
  restartButton.style.display = 'block';
  gameSquares.forEach((gameSquare) => {
    gameSquare.disabled = true;
  });
}

function switchPlayer() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  setCurrentPlayerHeading();
}

function setCurrentPlayerHeading() {
  gameHeading.textContent = `Player ${currentPlayer}'s Turn`;
}

function restartGame() {
  currentPlayer = 1;
  numMovesDone = 0;
  setCurrentPlayerHeading();
  gameSquares.forEach((gameSquare) => {
    gameSquare.textContent = '';
    gameSquare.disabled = false;
  });

  restartButton.style.display = 'none';
}
