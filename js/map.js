'use strict';

var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

var TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var TYPE_APARTMENTS = ['flat', 'house', 'bungalo'];
var APARTMENTS_TRANSLATES = {
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};
var CHECK_IN = ['12:00', '13:00', '14:00'];
var CHECK_OUT = ['12:00', '13:00', '14:00'];


var cardTemplate = document.querySelector('template').content.querySelector('article.map__card');
var cardElement = cardTemplate.cloneNode(true);
var similarOfferElement = document.querySelector('.map');
var mapPinsElement = document.querySelector('.map__pins');


// Получает случайный элемент из массива
var getRandomItem = function (arr) {
  var randomItem = Math.floor(Math.random() * arr.length);
  return arr[randomItem];
};

// Возвращает случайное число в пределах заданного диапозона
var getRandomNumber = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

// Ссылка на аватарку
var getAvatar = function (number) {
  var generatedNumber = '0' + number.toString();
  return 'img/avatars/user' + generatedNumber + '.png';
};

// В блоке `selectedBlock` удалить класс `selectedClass`
var removeClass = function (selectedBlock, selectedClass) {
  var modifedElement = document.querySelector(selectedBlock);
  modifedElement.classList.remove(selectedClass);
};


var getFeatures = function (basicfeatures, count) {
  var uniquefeatures = [];
  var templateArrow = basicfeatures.slice(); // копия исходного массива
  for (var i = 0; i < count; i++) {
    var index = Math.floor(Math.random() * templateArrow.length);
    uniquefeatures.push(templateArrow.splice(index, 1)[0]);
  }
  return uniquefeatures;
};


// Создаем похожее предложение
var createSimilarOffers = function (num) {
  var offer = [];
  for (var i = 0; i < num; i++) {
    var locationX = getRandomNumber(300, 900);
    var locationY = getRandomNumber(100, 500);
    offer[i] = {
      author: {
        avatar: getAvatar(i + 1)
      },
      location: {
        x: locationX,
        y: locationY
      },
      offer: {
        title: getRandomItem(TITLES),
        address: locationX + ',' + locationY,
        price: getRandomNumber(1000, 100000),
        type: getRandomItem(TYPE_APARTMENTS),
        rooms: getRandomNumber(1, 5),
        guests: getRandomNumber(1, 5),
        checkin: getRandomItem(CHECK_IN),
        checkout: getRandomItem(CHECK_OUT),
        features: getFeatures(FEATURES, getRandomNumber(0, FEATURES.length)),
        description: '',
        photos: []
      },
    };
  }
  return offer;
};


// создаем метку
var generatePin = function (ad) {
  var imgHeight = 44;
  var sharpEdge = 18;
  var template = document.querySelector('template');
  var pinTemplate = template.content.querySelector('.map__pin');
  var newPin = pinTemplate.cloneNode(true);
  newPin.setAttribute('style', 'left:' + (ad.location.x) + 'px; top:' + (ad.location.y + imgHeight / 2 + sharpEdge) + 'px');
  newPin.children[0].setAttribute('src', ad.author.avatar);
  newPin.addEventListener('click', onPinClick);
  newPin.addEventListener('keydown', onPinKeydown);
  newPin.addEventListener('keydown', onEscKeydown);
  return newPin;
};

// показываем сгенерированные DOM-элементы (метки на карте)
var renderPinsTo = function (offer, element) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < offer.length; i++) {
    fragment.appendChild(generatePin(offer[i]));
  }
  element.appendChild(fragment);
};


var removeUnnessaryFeatureElements = function (offer) {
  for (var i = 0; i < FEATURES.length; i++) {
    if (offer.features.indexOf(FEATURES[i]) < 0) {
      cardElement.querySelector('.feature--' + FEATURES[i]).remove();
    }
  }
};

// Создаем карточку с похожим предложением
var renderCard = function (card) {
  var offer = card.offer;
  // типы жилья
  cardElement.querySelector('h4').textContent = APARTMENTS_TRANSLATES[offer.type];
  // заголовок
  cardElement.querySelector('h3').textContent = offer.title;
  // адрес
  cardElement.querySelector('small').textContent = offer.address;
  // цена
  cardElement.querySelector('.popup__price').textContent = offer.price + ' \u20BD / ночь';
  // количество комнат и гостей
  cardElement.querySelector('h4 + p').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
  // время заезда и выезда
  cardElement.querySelector('h4 + p + p').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
  // список
  removeUnnessaryFeatureElements(offer, cardElement);
  // доп.информация
  cardElement.querySelector('ul + p').textContent = offer.description;
  // аватарка
  cardElement.querySelector('img.popup__avatar').src = card.author.avatar;
  cardElement.querySelector('.popup__close').tabIndex = 0;
  cardElement.querySelector('.popup__close').addEventListener('click', onPopupCloseClick);
  similarOfferElement.appendChild(cardElement);
};
var offersList = createSimilarOffers(8);

//  MODULE4-TASK1

// всем полям `fieldset` ставим атрибут `disabled`
var fieldsetDisabled = document.querySelectorAll('fieldset');
for (var i = 0; i < fieldsetDisabled.length; i++) {
  fieldsetDisabled[i].setAttribute('disabled', 'disabled');
}

var mainPin = document.querySelector('.map__pin--main');

var removePins = function () {
  var pins = document.querySelectorAll('.map__pin');
  for (var i = 1; i < pins.length; i++) {
    pins[i].remove();
  }

}
var activateForm = function () {
  removeClass('.map', 'map--faded');
  renderPinsTo(offersList, mapPinsElement);
  for (i = 0; i < fieldsetDisabled.length; i++) {
    fieldsetDisabled[i].removeAttribute('disabled');
  }
  removeClass('.notice__form', 'notice__form--disabled');
};

// выделить активный пин
var activatePin = function (evt) {
  var currentPin = evt.currentTarget;
  currentPin.classList.add('map__pin--active');
};

var deactivatePin = function () {
  var activePin = document.querySelector('.map__pin--active');
  if (activePin) {
    activePin.classList.remove('map__pin--active');
  }
};

var removeAd = function () {
  var map = document.querySelector('.map');
  var ad = map.querySelector('.popup');
  map.removeChild(ad);
};

var onPopupCloseClick = function () {
  removeAd();
  deactivatePin();
};

var onPopupCloseKeydown = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    removeAd();
    deactivatePin();
  }
};

var onEscKeydown = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    removeAd();
    deactivatePin();
  }
};

var onPinClick = function (evt) {
  deactivatePin();
  activatePin(evt);
  render(offersList);
  // renderCard(offersList[0]);
};

var render = function (ad) {
  for (i = 0; i < ad.length; i++) {
    renderCard(ad[i]);
  }
};

var onPinKeydown = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    onPinClick();
  }
};

// mapPin.addEventListener('click', onMapPinClick);
mainPin.addEventListener('mousedown', removePins);
mainPin.addEventListener('mouseup', activateForm);
