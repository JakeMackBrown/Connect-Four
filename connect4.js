//const statusDisplay = document.querySelector('.game--status');

let playerOne = "B";
let playerTwo = "R";
const currentPlayer = playerOne;

let gameActive = true;
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
            document.getElementById('board').append(tile);
        }
        board.push(row);
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