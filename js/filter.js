'use strict';

(function () {
  var PRICES = {
    min: 10000,
    max: 50000
  };
  var options = document.querySelectorAll('.map__filter');
  var priceToType = {
    low: function (price) {
      return price < PRICES.min;
    },
    middle: function (price) {
      return price >= PRICES.min && price < PRICES.max;
    },
    high: function (price) {
      return price >= PRICES.max;
    }
  };

  var filterByType = function (item, type, value) {
    return item.offer[type].toString() === value;
  };

  var filterByFeatures = function (data, value) {
    return data.filter(function (it) {
      return it.offer.features.includes(value);
    });
  };

  var updateOffers = function (data) {
    var features = document.querySelectorAll('.map__checkbox:checked');

    var filters = Array.from(options).filter(function (option) {
      return option.value !== 'any';
    });

    filters.forEach(function (option) {
      data = data.filter(function (it) {
        switch (option.id) {
          case 'housing-type':
            return filterByType(it, 'type', option.value);

          case 'housing-rooms':
            return filterByType(it, 'rooms', option.value);

          case 'housing-guests':
            return filterByType(it, 'guests', option.value);

          case 'housing-price':
            return priceToType[option.value](it.offer.price);
        }

        return it;
      });
    });

    features.forEach(function (feature) {
      data = filterByFeatures(data, feature.value);
    });

    return data;
  };

  window.filter = updateOffers;
})();
