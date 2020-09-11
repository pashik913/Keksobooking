'use strict';

(function () {
  var typeToHouse = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };
  var card = document.querySelector('#card')
  .content
  .querySelector('.map__card');
  var block = document.querySelector('.map__filters-container');

  var createFeatures = function (data) {
    var featureFragment = document.createDocumentFragment();

    data.forEach(function (it) {
      var featureItem = document.createElement('li');
      featureItem.className = 'popup__feature popup__feature--' + it;
      featureFragment.appendChild(featureItem);
    });

    return featureFragment;
  };

  var createPhotos = function (data) {
    var photosFragment = document.createDocumentFragment();
    var template = document.querySelector('template');
    var popupPhoto = template.content.querySelector('.popup__photo');

    data.forEach(function (it) {
      var popupPhotoItem = popupPhoto.cloneNode(true);
      popupPhotoItem.src = it;
      photosFragment.appendChild(popupPhotoItem);
    });

    return photosFragment;
  };

  var fillCard = function (data) {
    var element = card.cloneNode(true);
    var avatar = element.querySelector('.popup__avatar');
    var title = element.querySelector('.popup__title');
    var cardAddress = element.querySelector('.popup__text--address');
    var price = element.querySelector('.popup__text--price');
    var type = element.querySelector('.popup__type');
    var capacity = element.querySelector('.popup__text--capacity');
    var time = element.querySelector('.popup__text--time');
    var features = element.querySelector('.popup__features');
    var description = element.querySelector('.popup__description');
    var photos = element.querySelector('.popup__photos');
    var photo = element.querySelector('.popup__photo');
    var popupClose = element.querySelector('.popup__close');

    title.textContent = data.offer.title;
    cardAddress.textContent = data.offer.address;
    price.textContent = data.offer.price + ' ₽/ночь';
    type.textContent = typeToHouse[data.offer.type];
    time.textContent = 'Заезд после ' + data.offer.checkin + ' выезд до ' + data.offer.checkout;
    features.textContent = data.offer.features;
    description.textContent = data.offer.description;
    capacity.textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    avatar.src = data.author.avatar;
    features.innerHTML = '';
    features.appendChild(createFeatures(data.offer.features));
    photos.removeChild(photo);
    photos.appendChild(createPhotos(data.offer.photos));

    popupClose.addEventListener('click', onButtonClick);
    document.addEventListener('keydown', onEscPress);

    return element;
  };

  var onButtonClick = function (evt) {
    evt.preventDefault();
    removeCard();
  };

  var onEscPress = function (evt) {
    if (evt.key === window.const.ESC_BUTTON) {
      evt.preventDefault();
      removeCard();
    }
  };

  var renderCard = function (data) {
    block.insertAdjacentElement('beforebegin', card.appendChild(fillCard(data)));
  };

  var removeCard = function () {
    var mapCard = document.querySelector('.map__card');

    if (mapCard) {
      mapCard.remove();
      document.removeEventListener('keydown', onEscPress);
    }
  };

  window.card = {
    render: renderCard,
    remove: removeCard
  };
})();
