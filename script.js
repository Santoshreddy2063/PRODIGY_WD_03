// script.js
const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart');

let currentPlayer = 'X';
let gameState = Array(9).fill(null);

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    if (gameState[index] || currentPlayer === 'O' || checkWinner()) {
        return;
    }

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
        setTimeout(() => alert(`${currentPlayer} wins!`), 100);
        return;
    }

    if (gameState.every(cell => cell)) {
        setTimeout(() => alert('Draw!'), 100);
        return;
    }

    currentPlayer = 'O';
    setTimeout(aiMove, 500); // Add a 500ms delay before AI makes its move
}

function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}

function aiMove() {
    // Basic AI: Random move
    const emptyCells = gameState.map((val, index) => val === null ? index : null).filter(val => val !== null);

    if (emptyCells.length === 0) return; // No move possible if no empty cells

    const index = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    gameState[index] = currentPlayer;
    cells[index].textContent = currentPlayer;

    if (checkWinner()) {
        setTimeout(() => alert(`${currentPlayer} wins!`), 100);
        return;
    }

    if (gameState.every(cell => cell)) {
        setTimeout(() => alert('Draw!'), 100);
        return;
    }

    currentPlayer = 'X';
}

function restartGame() {
    currentPlayer = 'X';
    gameState.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
    });
}

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

restartButton.addEventListener('click', restartGame);
