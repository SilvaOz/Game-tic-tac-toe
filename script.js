const cells = document.querySelectorAll('.cell');
const message = document.querySelector('.message');
const player1 = 'X';
const player2 = 'O';


let currentPlayer = player1;
let gameEnded = false;

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});


function handleCellClick() {
    if (gameEnded) return;
    if (this.textContent !== '') return;

    this.textContent = currentPlayer;
    this.classList.add(currentPlayer === player1 ? 'blue' : 'yellow');

    if (checkForWin()) {
        endGame(false);
    } else if (checkForDraw()) {
        endGame(true);
    } else {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        if (currentPlayer === player2) {
            setTimeout(computerPlay, 500);
        }
    }
}


function computerPlay() {
    let emptyCells = [];
    cells.forEach(cell => {
        if (cell.textContent === '') emptyCells.push(cell);
    });

    let randomIndex = Math.floor(Math.random() * emptyCells.length);
    emptyCells[randomIndex].textContent = currentPlayer;
    emptyCells[randomIndex].classList.add(currentPlayer === player1 ? 'blue' : 'yellow');

    if (checkForWin()) {
        endGame(false);
    } else if (checkForDraw()) {
        endGame(true);
    } else {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }
}

function checkForWin() {
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

    for (let i = 0; i < winningCombinations.length; i++) {
        let combo = winningCombinations[i];
        if (cells[combo[0]].textContent !== '' &&
            cells[combo[0]].textContent === cells[combo[1]].textContent &&
            cells[combo[1]].textContent === cells[combo[2]].textContent) {
            combo.forEach(index => cells[index].classList.add('winner'));
            return true;
        }
    }

    return false;
}

function checkForDraw() {
    return Array.from(cells).every(cell => cell.textContent !== '');
}

function endGame(isDraw) {
    gameEnded = true;

    if (isDraw) {
        if (message) message.textContent = "It's a draw!";
    } else {
        if (message) message.textContent = `${currentPlayer} win!`;

        if (currentPlayer === player1) {
            document.querySelector('#result').textContent = "You win!";
        } else {
            document.querySelector('#result').textContent = "You lose!";
        }
    }

    cells.forEach(cell => {
        cell.removeEventListener('click', handleCellClick);
    });

    resetButton.classList.add('show');
}
function resetGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('blue');
        cell.classList.remove('yellow');
        cell.classList.remove('winner');
    });
    currentPlayer = player1;
    gameEnded = false;
    if (message) {
        message.textContent = '';
    }
}
const resetButton = document.querySelector('#reset-button');
if (resetButton) {
    resetButton.addEventListener('click', resetGame);
}

