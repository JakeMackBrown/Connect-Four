//const statusDisplay = document.querySelector('.game--status');

let playerOne = "B";
let playerTwo = "R";
let currentPlayer = playerOne;

let gameOver = false;
let board;
let currentColumns;

let rows = 6;
let columns = 7;

//document.querySelector('.game--restart').addEventListener('click', startGame);

window.onload = function () {
    startGame()
}

function startGame () {
    board = [];
    currentColumns = [5, 5, 5, 5, 5, 5, 5];

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {

            row.push(' ')

            let tile = document.createElement('div');
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById('board').append(tile);
        }
        board.push(row);
    }
} 

function setPiece () {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-"); 
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    r = currentColumns[c];
    if (r < 0) {
        return;
    }

    board[r][c] = currentPlayer;
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currentPlayer == playerOne) {
        tile.classList.add('blue-piece');
        currentPlayer = playerTwo;
    }
    else {
        tile.classList.add("red-piece");
        currentPlayer = playerOne
    }
    r -= 1;
    currentColumns[c] = r;

    confirmWin();
}

function confirmWin() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board [r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                    nameWinner(r, c); 
                    return;   
                }
            }
        }
    }

    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                    nameWinner(r, c);
                    return;
                }
            }
        }
    }

    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+3][c+3]) {
                    nameWinner(r, c);
                    return;
                }
            }
        }
    }
}

function nameWinner(r, c) {
    let winner = document.getElementById("winner");
    if (board[r][c] == playerOne) {
        winner.innerText = "Player 1 wins!"
    } else {
        winner.innerText = "Player 2 wins!";
    }

    gameOver = true;
}

// function startGame() {
//     gameActive = true;
//     currentPlayer = "B";
//     gameState = ["", "", "", "", "", "", "", "", ""];
//     statusDisplay.innerHTML = currentPlayerTurn();
//     document.querySelectorAll('.cell')
//                 .forEach(cell => cell.innerHTML = "")
// }