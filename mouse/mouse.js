document.addEventListener('DOMContentLoaded', function () {
  var mouse = document.querySelector('#mouse')
  var container = document.querySelector('#container')
  var oldX = 0
  container.addEventListener('click', getClickPosition, false)

  function getClickPosition (e) {
    var parentPosition = getPosition(e.currentTarget)
    var xPosition = e.clientX - parentPosition.x - (mouse.clientWidth / 2)
    var yPosition = e.clientY - parentPosition.y - (mouse.clientHeight / 2)

    var newX = xPosition
    var diffX = newX - oldX
    oldX = newX

    if (diffX <= 0) {
      mouse.style.transform = 'scaleX(1)'
    } else {
      mouse.style.transform = 'scaleX(-1)'
    }

    mouse.style.left = xPosition + 'px'
    mouse.style.top = yPosition + 'px'
  }

  function getPosition (el) {
    var xPos = 0
    var yPos = 0

    while (el) {
      if (el.tagName === 'BODY') {
          // deal with browser quirks with body/window/document and page scroll
        var xScroll = el.scrollLeft || document.documentElement.scrollLeft
        var yScroll = el.scrollTop || document.documentElement.scrollTop

        xPos += (el.offsetLeft - xScroll + el.clientLeft)
        yPos += (el.offsetTop - yScroll + el.clientTop)
      } else {
          // for all other non-BODY elements
        xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft)
        yPos += (el.offsetTop - el.scrollTop + el.clientTop)
      }

      el = el.offsetParent
    }
    return {
      x: xPos,
      y: yPos
    }
  }
})
