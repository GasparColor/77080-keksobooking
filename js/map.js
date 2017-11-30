'use strict';

// Получает случайный элемент из массива
var getRandomItem = function (arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

// Возвращает случайное число в пределах заданного диапозона
var getRandomNumber = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

// В блоке `selectedBlock` удалить класс `selectedClass`
var removeClass = function (selectedBlock, selectedClass) {
  var modifedElement = document.querySelector(selectedBlock);
  modifedElement.classList.remove(selectedClass);
};

// TODO Создаем массив случайных данных
var getFeatures = function (basicfeatures, count) {
  var uniquefeatures = [];
  var templateArrow = basicfeatures.slice(); // копия исходного массива
  for (var i = 0; i < count; i++) {
    var index = Math.floor(Math.random() * templateArrow.length);
    uniquefeatures.push(templateArrow.splice(index, 1)[0]);
  }
  return uniquefeatures;
};

var SIMILAR_OFFERS = [];
// Создаем похожее предложение
var createSimilarOffer = function () {
  var quantity = 8;
  var TITLE = [
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
  var TYPE_OFFERS = ['flat', 'house', 'bungalo'];
  var CHECK_IN_OR_CHECK_OUT = ['12:00', '13:00', '14:00'];

  var LOCATION_X = getRandomNumber(300, 900);
  var LOCATION_Y = getRandomNumber(100, 500);
  for (var i = 0; i < quantity; i++) {
    SIMILAR_OFFERS[i] = {
      author: {
        avatar: 'img/avatars/user0' + getRandomNumber(1, 8) + '.png'
      },
      location: {
        x: LOCATION_X,
        y: LOCATION_Y
      },
      offers: {
        title: getRandomItem(TITLE),
        address: LOCATION_X + ',' + LOCATION_Y,
        price: getRandomNumber(1000, 100000),
        type: getRandomItem(TYPE_OFFERS),
        rooms: getRandomNumber(1, 5),
        guests: getRandomNumber(1, 5),
        checkin: getRandomItem(CHECK_IN_OR_CHECK_OUT),
        checkout: getRandomItem(CHECK_IN_OR_CHECK_OUT),
        features: getFeatures(FEATURES, getRandomNumber(0, FEATURES.length)),
        description: '',
        photos: []
      },
    };
  }
  return SIMILAR_OFFERS[i];
};

createSimilarOffer();

// В блоке .map удаляем класс map--faded
removeClass('.map', 'map--faded');

// TODO Создаем метку на карте
// var renderCardPin = function (SIMILAR_OFFERS) {
//   var mapCardTemplate = document.querySelector('template').content.querySelector('button.map__pin');
//   for (var i = 0; i < 8; i++) {
//     var offersButton = mapCardTemplate.cloneNode(true);
//     offersButton.style.left = locationX;
//     offersButton.style.top = locationY;
// offersButton.querySelector('img').src = similarOffers.author.avatar;
// var cardButtonAvatar = offersButton.querySelectorAll('img');
// cardButtonAvatar[0].src = offer.author.avatar;
//   }
//   return offersButton;
// };
// renderCardPin();


// TODO Вставляем метки в разметку
// var buttonElements = document.querySelector('.map__pins');
// var fragmentBtn = document.createDocumentFragment();
// for (var i = 0; i < SIMILAR_OFFERS.length; i++) {
//   fragmentBtn.appendChild(renderCardPin(SIMILAR_OFFERS[i]));
// }
//
// buttonElements.appendChild(fragmentBtn);

// генерируем уникальный список удобств
var generateFeaturesList = function (featuresArray) {
  var featuresList = '';
  for (var i = 0; i < featuresArray.length; i++) {
    featuresList = '<li class="feature feature--' + featuresArray[i] + '"></li>' + featuresList;
  }
  return featuresList;
};

// Переводы для типов жилья
var offersTypeTranslations = function (type) {
  if (type === 'house') {
    return 'Дом';
  } else if (type === 'bungalo') {
    return 'Бунгало';
  } else {
    return 'Квартира';
  }
};

// Создаем карточку с похожим предложением
var renderMapCard = function (offer) {
  var mapCardTemplate = document.querySelector('template').content.querySelector('article.map__card');
  var mapCardElement = mapCardTemplate.cloneNode(true);
  // типы жилья
  mapCardElement.querySelector('h4').textContent = offersTypeTranslations(offer.offers.type);
  // заголовок
  mapCardElement.querySelector('h3').textContent = offer.offers.title;
  // адресс
  mapCardElement.querySelector('small').textContent = offer.offers.address;
  // цена
  mapCardElement.querySelector('.popup__price').innerHTML = offer.offers.price + ' &#x20bd;/ночь';
  // количество комнат и гостей
  mapCardElement.querySelector('h4 + p').textContent = offer.offers.rooms + ' комнаты для ' + offer.offers.guests + ' гостей';
  // время заезда и выезда
  mapCardElement.querySelector('h4 + p + p').textContent = 'Заезд после ' + offer.offers.checkin + ', выезд до ' + offer.offers.checkout;
  // список
  mapCardElement.querySelector('.popup__features').innerHTML = generateFeaturesList(offer.offers.features);
  // доп.информация
  mapCardElement.querySelector('ul + p').textContent = offer.offers.description;
  // аватарка
  mapCardElement.querySelector('img.popup__avatar').src = offer.author.avatar;
  return mapCardElement;
};


// Вставляем карточку похожих объявлений в разметку
var similarOfferElement = document.querySelector('.map');
var fragment = document.createDocumentFragment();
for (var i = 0; i < SIMILAR_OFFERS.length; i++) {
  fragment.appendChild(renderMapCard(SIMILAR_OFFERS[i]));
}
similarOfferElement.appendChild(fragment);
