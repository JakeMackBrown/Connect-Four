let playerOne = "B";
let playerTwo = "R";
let currentPlayer = playerOne;

let gameOver = false;
let board;
let currentColumns;

let rows = 6;
let columns = 7;
// GLOBAL VARIABLES ^^

window.onload = function () {
    startGame();
//^^ I hadn't used the window.onload event before, and it was a workaround for a previous error I had in tic-tac-toe which required me to hit the Start New Game button for the game to begin.  I put the reset button on ice and reintegrated it into this function once the game logic worked, which was simpler than starting with a reset button and working backwards into the game logic, which I then realized I had done with tic-tac-toe.
    document.getElementById('resetButton').addEventListener("click", function () {
        resetGame();
    });
};

function resetGame() {
    gameOver = false;
    currentPlayer = playerOne;
    document.getElementById("winner").innerText = "";
    startGame();
}
// This sets the gameOver boolean flag to false, clears the winner text and resets currentPlayer to playerOne

function startGame () {
    board = [];
    currentColumns = [5, 5, 5, 5, 5, 5, 5]; //<<< refers to each column's current available row on the bottom of the board 

    document.getElementById("board").innerHTML = ' '; //<< resets the board's HTML

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            row.push(' ')

            let tile = document.createElement('div');
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece); //<< calls the setPiece function when any tile in the appended array is clicked.
            document.getElementById('board').append(tile);
        }
        board.push(row); //<< this adds the tiles to the board, applying the above for loop of push, serving the same purpose as 42 separate divs.
//This was the most important function of this script that I learned through this process.  I first started modeling this after our tic-tac-toe game, similar to how it's done in this walkthrough by Ania Kubow which I used for reference (https://www.youtube.com/watch?v=aroYjgQH8Tw).  After trying it this way, I wanted to circumvent the need to create 42 separate elements for each tile (i.e. "<div id = 0-0 class="tile"></div><div id = 0-1 class="tile"</div> etc.) because I didn't want to have to copy and paste every possible winning combination, and I thought it would be too many lines and detract from the code's readability.
// The for loops above create a div for each tile and gives it the ID "r-c"
    }
} 

function setPiece () {
    if (gameOver) {
        return;
    } // If there is a winner, the game is over.

    let coords = this.id.split("-"); //"0-0" -> ["0", "0"].  "coords" is an array with two parts separated by a hyphen. 
    let r = parseInt(coords[0]); // refers to the first index in the array and converts the string into an integer.  In the example "4-5" or ["4", "5"], r is assigned to 4. 
    let c = parseInt(coords[1]); //refers to the second index in the array and converts the string into an integer.  i.e. "4-5" or ["4", "5"], c is assigned to 5.

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
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
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

    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
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