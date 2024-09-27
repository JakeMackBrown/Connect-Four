# Connect Four 

A classic strategy game in which two players go head-to-head in a battle to own the grid.  They drop the discs into the grid, starting in the middle or at the edge to stack their colored discs upwards, horizontally, or diagonally. Use strategy to block opponents while aiming to be the first player to get four in a row to win.

Connect Four (also known as Four Up, Plot Four, Find Four, Four in a Row, Four in a Line, or Drop Four), in this case, will be a a two-player game in which the players first choose a color and then take turns dropping one colored disc into a seven-column, six-row vertically suspended grid.  The pieces fall to the lowest available space within the column.

## Objective

We will be making this with HTML, CSS and JavaScript.  Specifically:
* for loops
* addEventListener
* document.createElement
* document.querySelector
arrow functions

## Rules and Directions
* Two-player game.  Player 1 goes first.
* Colors default to red (player 1) and yellow (player 2).  Colors can be swapped or changed with the change color button.  There is also a button to change the board and background colors.
* Pieces will fall to the lowest available slot within the column.  You may click a higher slot, or the immediate space above the board in that column, but the piece will still fall.
* The game will continue until a winning combination of four is reached by player 1 or player 2, or until the grid is full and no winning combination was found.
