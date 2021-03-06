// var movesTaken = []
var grid = [0, 1, 2, 3, 4, 5, 6, 7, 8]
var playerOneActive = true
var isDraw = 0

// reset the game variables
function restart () {
  // movesTaken = []
  grid = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  playerOneActive = true
  isDraw = 0
}

// checks if a winning combination is met
function isGameOver () {
  switch (true) {
    // top row
    case (grid[0] === grid[1] && grid[1] === grid[2]):
      return true
    // middle row
    case (grid[3] === grid[4] && grid[4] === grid[5]):
      return true
    // bottom row
    case (grid[6] === grid[7] && grid[7] === grid[8]):
      return true
    // left column
    case (grid[0] === grid[3] && grid[3] === grid[6]):
      return true
    // middle column
    case (grid[1] === grid[4] && grid[4] === grid[7]):
      return true
    // right column
    case (grid[2] === grid[5] && grid[5] === grid[8]):
      return true
    // diagonal \
    case (grid[0] === grid[4] && grid[4] === grid[8]):
      return true
    // diagonal /
    case (grid[2] === grid[4] && grid[4] === grid[6]):
      return true
    default:
      return false
  }
}

// if isGameOver() it returns the winner or draw
function whoWon () {
  switch (true) {
    case (isGameOver() && playerOneActive):
      return 1
    case (isGameOver() && !playerOneActive):
      return 2
    case (isDraw === 9):
      return 3
    default:
      return 0
  }
}

// checks if the move is valid and changes the active player
function playTurn (index) {
  if (typeof grid[index] === 'boolean') {
    return false
  } else {
    grid[index] = playerOneActive
    isDraw += 1
    if (!isGameOver()) {
      playerOneActive = !playerOneActive
    }
    return true
  }
}
