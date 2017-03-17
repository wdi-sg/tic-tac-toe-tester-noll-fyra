var movesTaken = []
var playerState = [0, 1, 2, 3, 4, 5, 6, 7, 8]
var playerOneActive = true
var draw = false

function restart () {
  movesTaken = []
  playerState = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  playerOneActive = true
  draw = false
}

function isGameOver () {
  if (movesTaken.length === 0) {
    return false
  } else if (movesTaken.length >= 5) {
    switch (true) {
      case (playerState[0] === playerState[1] && playerState[1] === playerState[2]):
        return true
      case (playerState[3] === playerState[4] && playerState[4] === playerState[5]):
        return true
      case (playerState[6] === playerState[7] && playerState[7] === playerState[8]):
        return true
      case (playerState[0] === playerState[3] && playerState[3] === playerState[6]):
        return true
      case (playerState[1] === playerState[4] && playerState[4] === playerState[7]):
        return true
      case (playerState[2] === playerState[5] && playerState[5] === playerState[8]):
        return true
      case (playerState[0] === playerState[4] && playerState[4] === playerState[8]):
        return true
      case (playerState[2] === playerState[4] && playerState[4] === playerState[6]):
        return true
      case (movesTaken.length === 9):
        draw = true
        break
      default:
        return false
    }
  } else {
    return false
  }
}

function whoWon () {
  if (isGameOver() && playerOneActive === true) {
    return 1
  } else if (isGameOver() && playerOneActive === false) {
    return 2
  } else if (draw === true) {
    return 3
  } else {
    return 0
  }
}

function playTurn (index) {
  if (movesTaken.includes(index)) {
    return false
  } else {
    movesTaken.push(index)
    playerState[index] = playerOneActive
    if (!isGameOver()) {
      playerOneActive = !playerOneActive
    }
    return true
  }
}
