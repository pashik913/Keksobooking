'use strict';

(function () {
  var LEFT_MOUSE_BUTTON = 0;
  var PIN_X = 570;
  var PIN_Y = 375;
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mainPin = document.querySelector('.map__pin--main');
  var isActive = false;
  var filters = document.querySelectorAll('.map__filter');
  var fieldsets = document.querySelectorAll('fieldset');
  var filterForm = document.querySelector('.map__filters');
  var address = document.querySelector('#address');

  var setDisabled = function (fields) {
    fields.forEach(function (it) {
      it.disabled = !it.disabled;
    });
  };

  var setAddress = function (elem, offset) {
    var x = Math.round(elem.offsetLeft + elem.offsetWidth / 2);
    var y = Math.round(elem.offsetTop + elem.offsetHeight / offset);

    address.value = x + ', ' + y;
  };

  setAddress(mainPin, 2);
  setDisabled(filters);
  setDisabled(fieldsets);

  var activatePage = function () {
    window.utils.removeClass(map, 'map--faded');
    window.utils.removeClass(adForm, 'ad-form--disabled');
    window.data.load();
    setDisabled(filters);
    setDisabled(fieldsets);
    isActive = true;
    document.removeEventListener('keydown', onPinEnterPress);
    setAddress(mainPin, 1);
  };

  var deactivatePage = function () {
    window.utils.addClass(map, 'map--faded');
    window.utils.addClass(adForm, 'ad-form--disabled');
    window.pin.remove();
    setDisabled(filters);
    setDisabled(fieldsets);
    document.addEventListener('keydown', onPinEnterPress);
    adForm.reset();
    filterForm.reset();
    window.card.remove();
    isActive = false;
    mainPin.style.top = PIN_Y + 'px';
    mainPin.style.left = PIN_X + 'px';
    setAddress(mainPin, 2);
  };

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    if (evt.button === LEFT_MOUSE_BUTTON && !isActive) {
      activatePage();
    }
  });

  var onPinEnterPress = function (evt) {
    if (evt.key === window.const.ENTER_BUTTON && !isActive) {
      evt.preventDefault();
      activatePage();
    }
  };

  var onFilterChange = window.utils.debounce(window.data.update);

  document.addEventListener('keydown', onPinEnterPress);
  filterForm.addEventListener('change', onFilterChange);

  window.map = {
    deactivatePage: deactivatePage,
    setAddress: setAddress
  };
})();
