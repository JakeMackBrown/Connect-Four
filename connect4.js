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
    document.body.style.backgroundColor = ""; //changes background color to default when game is reset
    startGame();
}
// ^^This sets the gameOver boolean flag to false, clears the winner text and resets currentPlayer to playerOne.

function startGame () {
    board = [];
    currentColumns = [5, 5, 5, 5, 5, 5, 5]; //<<< refers to each column's current available row on the bottom of the board 

    document.getElementById("board").innerHTML = ' '; //<< resets the board's HTML at the start of a new game

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
        board.push(row); //<< this adds the tiles to the board, applying the above for loop of push, serving the same purpose as 42 separate divs.  When the tile is clicked, its array is appended, corresponding with the setPiece function defined below.
//This was the most important function of this script that I learned through this process.  I first started modeling this after our tic-tac-toe game, similar to how it's done in this walkthrough by Ania Kubow which I used for reference (https://www.youtube.com/watch?v=aroYjgQH8Tw).  After trying it this way, I wanted to circumvent the need to create 42 separate elements for each tile (i.e. "<div id = 0-0 class="tile"></div><div id = 0-1 class="tile"</div> etc.) because I didn't want to have to copy and paste every possible winning combination, and I thought it would be too many lines and detract from the code's readability.
// The for loops above create a div for each tile and give it the ID "r-c"
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
    //^^ this updates the board, setting board[r][c] to the current player ("B" or "R")
    if (currentPlayer == playerOne) {
        tile.classList.add('blue-piece');
        currentPlayer = playerTwo;
    }
    else {
        tile.classList.add("red-piece");
        currentPlayer = playerOne
    } //^^ these take the corresponding tile element from the DOM and add the class of "blue-piece" or "red-piece," which change the tile's color, and then alternates the current player.
    r -= 1;
    currentColumns[c] = r; //When a piece is placed, this moves the available row index for that column one tile up by subtracting one from the value.

    confirmWin();
}

// For the function below, which serves the bulk of the game's logic, I initially used functions that reflected tic-tac-toe using the manual array of 42 tiles and manual array of winning combinations, similar to Ania Kubow.  When I tried that, I found I was having issues arise too easily with combination mishaps and when I tried to alter other things like CSS.  When I hit a wall, I referred to Kenny Yip's walkthrough (https://www.youtube.com/watch?v=4ARsthVnCTg&list=LL&index=2), which demonstrated sliding window functions.  The sliding window allowed for checking four consecutive pieces of the same player simultaneously while sliding in the opposite direction, covering the length of the array horizontally, vertically, and diagonally in both directions.  I restructured this to fit my established code and to be more legible.  This seemed like a much more efficient process than checking for every possible winning combination each move (that worked better with tic-tac-toe considering there were only nine tiles and far fewer winning combinations).  Once I tried the sliding window functions, I was having far fewer issues, but I noticed that in Kenny's walkthrough, his diagonal functions were missing conditions with winning combinations toward the top and middle of the board, so I fixed that with my functions below.

function confirmWin() {
    // Check horizontal wins
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns - 3; col++) { //this stops at columns-3 to account for seven columns, ensuring enough room for four consecutive pieces.
            if (board[row][col] !== ' ' && //checks if the current tile is empty
                board[row][col] === board[row][col + 1] &&
                board[row][col] === board[row][col + 2] &&
                board[row][col] === board[row][col + 3]) {
                nameWinner(row, col);
                return;
            }
        }
    }

    // Check vertical wins
    for (let col = 0; col < columns; col++) {
        for (let row = 0; row < rows - 3; row++) {
            if (board[row][col] !== ' ' && 
                board[row][col] === board[row + 1][col] && //these conditions check if the current tile is the same as the three tiles below it in the same column.
                board[row][col] === board[row + 2][col] &&
                board[row][col] === board[row + 3][col]) {
                nameWinner(row, col);
                return;
            }
        }
    }

    // Check diagonal (bottom-left to top-right) wins
    for (let row = 0; row < rows - 3; row++) {
        for (let col = 0; col < columns - 3; col++) {
            if (board[row][col] !== ' ' && 
                board[row][col] === board[row + 1][col + 1] &&
                board[row][col] === board[row + 2][col + 2] &&
                board[row][col] === board[row + 3][col + 3]) {
                nameWinner(row, col);
                return;
            }
        }
    }

    // Check diagonal (top-left to bottom-right) wins
    for (let row = 3; row < rows; row++) {
        for (let col = 0; col < columns - 3; col++) {
            if (board[row][col] !== ' ' && 
                board[row][col] === board[row - 1][col + 1] &&
                board[row][col] === board[row - 2][col + 2] &&
                board[row][col] === board[row - 3][col + 3]) {
                nameWinner(row, col);
                return;
            }
        }
    }
}

function nameWinner(r, c) {
    let winner = document.getElementById("winner");
    let body = document.body;
    if (board[r][c] == playerOne) {
        winner.innerText = "Player 1 wins!";
        body.style.backgroundColor = "darkblue"; //changes background color to blue when playerOne wins
    } else {
        winner.innerText = "Player 2 wins!";
        body.style.backgroundColor = "darkred" //changes background color to red when playerTwo wins
    }

    gameOver = true;
}