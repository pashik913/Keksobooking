'use strict';

(function () {
  var Y_COORD_BORDER = 65;
  var mainPin = document.querySelector('.map__pin--main');
  var dragLimit = {
    X: {
      MIN: 0,
      MAX: 1200
    },
    Y: {
      MIN: 130,
      MAX: 630
    }
  };

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var mainPinPosition = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };

      var border = {
        TOP: dragLimit.Y.MIN - mainPin.offsetHeight + Y_COORD_BORDER,
        BOTTOM: dragLimit.Y.MAX - mainPin.offsetHeight + Y_COORD_BORDER,
        LEFT: dragLimit.X.MIN,
        RIGHT: dragLimit.X.MAX - mainPin.offsetWidth
      };

      if (mainPinPosition.x >= border.LEFT && mainPinPosition.x <= border.RIGHT) {
        mainPin.style.left = mainPinPosition.x + 'px';
      }
      if (mainPinPosition.y >= border.TOP && mainPinPosition.y <= border.BOTTOM) {
        mainPin.style.top = mainPinPosition.y + 'px';
      }

      window.map.setAddress(mainPin, 1);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
