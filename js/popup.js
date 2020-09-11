'use strict';

(function () {
  var popupOnSuccess = document.querySelector('#success')
  .content
  .querySelector('.success');
  var popupOnError = document.querySelector('#error')
  .content
  .querySelector('.error');
  var main = document.querySelector('main');

  var renderPopupSuccess = function () {
    var popup = popupOnSuccess.cloneNode(true);

    document.addEventListener('keydown', onSuccessEscPress);
    popup.addEventListener('click', function (evt) {
      evt.preventDefault();

      closeSuccessPopup();
    });

    main.append(popup);
  };

  var renderPopupError = function (error) {
    var popup = popupOnError.cloneNode(true);
    var message = popup.querySelector('.error__message');

    message.textContent = error;
    document.addEventListener('keydown', onErrorEscPress);
    popup.addEventListener('click', function (evt) {
      evt.preventDefault();

      closeErrorPopup();
    });

    main.append(popup);
  };

  var closeSuccessPopup = function () {
    var popup = document.querySelector('.success');
    popup.remove();
    document.removeEventListener('keydown', onSuccessEscPress);
  };

  var closeErrorPopup = function () {
    var popup = document.querySelector('.error');
    popup.remove();
    document.removeEventListener('keydown', onErrorEscPress);
  };

  var onSuccessEscPress = function (evt) {
    if (evt.key === window.const.ESC_BUTTON) {
      evt.preventDefault();
      closeSuccessPopup();
    }
  };

  var onErrorEscPress = function (evt) {
    if (evt.key === window.const.ESC_BUTTON) {
      evt.preventDefault();
      closeErrorPopup();
    }
  };

  window.popup = {
    success: renderPopupSuccess,
    error: renderPopupError
  };
})();

