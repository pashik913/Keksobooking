'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var removeClass = function (element, className) {
    element.classList.remove(className);
  };

  var addClass = function (element, className) {
    element.classList.add(className);
  };

  var debounce = function (fun) {
    var lastTimeout = null;
    return function () {
      var args = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        fun.apply(null, args);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.utils = {
    removeClass: removeClass,
    addClass: addClass,
    debounce: debounce
  };
})();
