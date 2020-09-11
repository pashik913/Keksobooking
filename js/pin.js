'use strict';

(function () {
  var MAX_PINS = 5;
  var pin = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
  var mapPinBlock = document.querySelector('.map__pins');

  var fillPin = function (data) {
    var element = pin.cloneNode(true);
    var image = element.querySelector('img');

    element.style.left = data.location.x + 'px';
    element.style.top = data.location.y + 'px';
    image.src = data.author.avatar;
    image.alt = data.offer.title;

    element.addEventListener('click', function (evt) {
      evt.preventDefault();

      window.card.remove();
      window.card.render(data);
    });

    return element;
  };

  var renderPins = function (data) {
    var fragment = document.createDocumentFragment();

    data.length = data.length > MAX_PINS ? MAX_PINS : data.length;

    data.forEach(function (item) {
      fragment.appendChild(fillPin(item));
    });

    mapPinBlock.appendChild(fragment);
  };

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin');

    pins.forEach(function (item) {
      if (!item.classList.contains('map__pin--main')) {
        item.remove();
      }
    });
  };

  window.pin = {
    render: renderPins,
    remove: removePins
  };
})();
