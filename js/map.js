'use strict';

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
var TYPE_OFFERS = ['flat', 'house', 'bungalo'];
var CHECK_IN = ['12:00', '13:00', '14:00'];
var CHECK_OUT = ['12:00', '13:00', '14:00'];

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
var LOCATION_X = getRandomNumber(300, 900);
var LOCATION_Y = getRandomNumber(100, 500);

// В блоке `selectedBlock` удалить класс `selectedClass`
var removeClass = function (selectedBlock, selectedClass) {
  var modifedElement = document.querySelector(selectedBlock);
  modifedElement.classList.remove(selectedClass);
};

// В блоке `map` удаляем класс `map--faded`
removeClass('.map', 'map--faded');

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
var similarOffer = function (num) {
  var offer = [];
  for (var i = 0; i < num; i++) {
    offer[i] = {
      author: {
        avatar: 'img/avatars/user0' + getRandomNumber(1, 8) + '.png'
      },
      location: {
        x: LOCATION_X,
        y: LOCATION_Y
      },
      offers: {
        title: getRandomItem(TITLES),
        address: LOCATION_X + ',' + LOCATION_Y,
        price: getRandomNumber(1000, 100000),
        type: getRandomItem(TYPE_OFFERS),
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

var createOffers = similarOffer(8);


// // генерируем одну метку на карте
// var generatePin = function (ad) {
//   var imgHeight = 44;
//   var sharpEdge = 18;
//   var template = document.querySelector('template');
//   var pinTemplate = template.content.querySelector('.map__pin');
//   var newPin = pinTemplate.cloneNode(true);
//   newPin.setAttribute('style', 'left:' + (ad.location.x) + 'px; top:' + (ad.location.y + imgHeight / 2 + sharpEdge) + 'px');
//   newPin.children[0].setAttribute('src', ad.author.avatar);
//   return newPin;
// };
//
// var makePin = generatePin();
//
//
// // показываем сгенерированные DOM-элементы (метки на карте)
//
//   var fragment = document.createDocumentFragment();
//   for (var i = 0; i < makePin.length; i++) {
//     fragment.appendChild(generatePin(makePin[i]));
//   }
//   document.querySelector('.map__pins').appendChild(fragment);

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
var renderCard = function (card) {
  var mapCardTemplate = document.querySelector('template').content.querySelector('article.map__card');
  var mapCardElement = mapCardTemplate.cloneNode(true);
  var similarOfferElement = document.querySelector('.map');
  // типы жилья
  mapCardElement.querySelector('h4').textContent = offersTypeTranslations(card.offers.type);
  // заголовок
  mapCardElement.querySelector('h3').textContent = card.offers.title;
  // адресс
  mapCardElement.querySelector('small').textContent = card.offers.address;
  // цена
  mapCardElement.querySelector('.popup__price').innerHTML = card.offers.price + ' &#x20bd;/ночь';
  // количество комнат и гостей
  mapCardElement.querySelector('h4 + p').textContent = card.offers.rooms + ' комнаты для ' + card.offers.guests + ' гостей';
  // время заезда и выезда
  mapCardElement.querySelector('h4 + p + p').textContent = 'Заезд после ' + card.offers.checkin + ', выезд до ' + card.offers.checkout;
  // список
  mapCardElement.querySelector('.popup__features').innerHTML = generateFeaturesList(card.offers.features);
  // доп.информация
  mapCardElement.querySelector('ul + p').textContent = card.offers.description;
  // аватарка
  mapCardElement.querySelector('img.popup__avatar').src = card.author.avatar;
  similarOfferElement.appendChild(mapCardElement);
};


// Вставляем карточку похожих объявлений в разметку
var fragment = document.createDocumentFragment();
for (var i = 0; i < createOffers.length; i++) {
  fragment.appendChild(renderCard(createOffers[i]));
}


