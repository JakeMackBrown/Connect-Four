//const statusDisplay = document.querySelector('.game--status');

let playerOne = "B";
let playerTwo = "R";
let currentPlayer = playerOne;

let gameOver = false;
let board;

const rows = 6;
const columns = 7;

//document.querySelector('.game--restart').addEventListener('click', startGame);

window.onload = function () {
    startGame()
}

function startGame () {
    board = [];

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

    board[r][c] = currentPlayer;
    let tile = this;
    if (currentPlayer == playerOne) {
        tile.classList.add('blue-piece');
        currentPlayer = playerTwo;
    }
    else {
        tile.classList.add("red-piece");
        currentPlayer = playerOne
    }
}

// function startGame() {
//     gameActive = true;
//     currentPlayer = "B";
//     gameState = ["", "", "", "", "", "", "", "", ""];
//     statusDisplay.innerHTML = currentPlayerTurn();
//     document.querySelectorAll('.cell')
//                 .forEach(cell => cell.innerHTML = "")
// }