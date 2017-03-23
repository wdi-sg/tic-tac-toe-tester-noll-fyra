$(document).ready(function () {
  $('#restart').hide()
  $('.active-player').text('Active: Player 1')

  var gridWidth = $('.grid').width()
  $('.grid').css({'height': gridWidth + 'px'})

  var grid = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  var playerOneActive = true
  var isDraw = 0
  var clickCounter = 0

  function random () {
    return Math.round(Math.random() * 255)
  }

  function restart () {
    grid = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    playerOneActive = true
    $('.active-player').text('Active: Player 1')
    $('.box').css('background-color', 'black')
    isDraw = 0
    $('.box').each(function () { $(this).text('') })
    clickCounter = 0
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
      return true
    }
  }

  function updateGrid (clicker) {
    if (playerOneActive) {
      $('.active-player').text('Active: Player 2')
      $('.active-player').css('color', 'blue')
      clicker.css('background-color', 'red')
    } else {
      $('.active-player').text('Active: Player 1')
      $('.active-player').css('color', 'red')
      clicker.css('background-color', 'blue')
    }
  }

  $('.box').on('click', function () {
    clickCounter += 1
    if (clickCounter > 9 && isDraw === 9 || isGameOver()) {
      $('.active-player').text('Ouch! Stop clicking me!')
    }
    if (!isGameOver()) {
      if (playTurn($(this).attr('id'))) {
        if (playerOneActive) {
          $(this).text('X')
        } else {
          $(this).text('O')
        }
        updateGrid($(this))
        if (!isGameOver()) {
          playerOneActive = !playerOneActive
          if (isDraw === 9) {
            $('.active-player').text('It\'s a draw! The spoils are shared.')
            $('.active-player').css('color', 'black')
            $('#restart').show()
          }
        } else {
          console.log(isGameOver())
          switch (whoWon()) {
            case 3:
              $('.active-player').text('It\'s a draw! The spoils are shared.')
              $('.active-player').css('color', 'black')
              break
            case 2:
              $('.active-player').text('Player 2 won!')
              $('.active-player').css('color', 'blue')
              break
            case 1:
              $('.active-player').text('Player 1 won!')
              $('.active-player').css('color', 'red')
              break
            default:
              $('.active-player').text('Something went wrong.')
              $('.active-player').css('color', 'black')
          }
          $('#restart').show()
        }
      }
    } else {
      if (whoWon() === 3) {
        $('.active-player').text('It\'s a draw! The spoils are shared.')
        $('.active-player').css('color', 'black')
        $('#restart').show()
      }
    }
    $('body').css('background-color', 'rgb(' + random() + ', ' + random() + ', ' + random() + ')')
  })

  $('#restart').on('click', function () {
    restart()
    $(this).hide()
  })
})
