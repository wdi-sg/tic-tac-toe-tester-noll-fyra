$(document).ready(function () {
  $('#restart').hide()

  var gridWidth = $('.grid').width()
  $('.grid').css({'height': gridWidth + 'px'})

  var grid = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  var playerOneActive = true
  var isDraw = 0

  // function random () {
  //   return Math.round(Math.random() * 255)
  // }

  function restart () {
    grid = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    playerOneActive = true
    isDraw = 0
  }

  function isGameOver () {
    switch (true) {
      case (grid[0] === grid[1] && grid[1] === grid[2]):
        return true
      case (grid[3] === grid[4] && grid[4] === grid[5]):
        return true
      case (grid[6] === grid[7] && grid[7] === grid[8]):
        return true
      case (grid[0] === grid[3] && grid[3] === grid[6]):
        return true
      case (grid[1] === grid[4] && grid[4] === grid[7]):
        return true
      case (grid[2] === grid[5] && grid[5] === grid[8]):
        return true
      case (grid[0] === grid[4] && grid[4] === grid[8]):
        return true
      case (grid[2] === grid[4] && grid[4] === grid[6]):
        return true
      default:
        return false
    }
  }

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

  $('.box').on('click', function () {
    if (!isGameOver()) {
      if (playTurn($(this).attr('id'))) {
        if (playerOneActive) {
          $('.active-player').text('Active: Player One')
          $('.active-player').css('color', 'blue')
          $(this).css('background-color', 'blue')
        } else {
          $('.active-player').text('Active: Player Two')
          $('.active-player').css('color', 'red')
          $(this).css('background-color', 'red')
        }
        if (isGameOver()) {
          $('.active-player').text('Player '+ whoWon().toString() + ' won')
          $('#restart').show()
          console.log(isGameOver())
        }
        console.log(grid)
      }
    }
    // $('.box').css('background-color', 'rgb(' + random() + ', ' + random() + ', ' + random() + ')')
  })

  $('#restart').on('click', function () {
    restart()
    $('.active-player').text('Active: Player One')
    $('.active-player').show()
    $(this).hide()
  })
})
