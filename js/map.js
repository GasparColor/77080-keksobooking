'use strict';

// Найти элемент с классом .map и среди классов этого элемента убрать класс  .remove
var mapCard = document.querySelector('.map');
mapCard.classList.remove('map--faded');

var title = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var typeOffers = ['flat', 'house', 'bungalo'];
var checkinOrCheckout = ['12:00', '13:00', '14:00'];
var similarOffers = [];

// Получить случайный элемент из массива
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

// Вычисляем координаты точек X,Y
var locationX = getRandomNumber(300, 900);
var locationY = getRandomNumber(100, 500);


// Создаем похожее предложение
var createSimilarOffer = function () {
  for (var i = 0; i < 8; i++) {
    similarOffers[i] = {
      author: {
        avatar: 'img/avatars/user0' + getRandomNumber(1, 8) + '.png'
      },
      location: {
        x: locationX,
        y: locationY
      },
      offers: {
        title: getRandomItem(title),
        address: locationX + ',' + locationY,
        price: getRandomNumber(1000, 100000),
        type: getRandomItem(typeOffers),
        rooms: getRandomNumber(1, 5),
        guests: getRandomNumber(1, 5),
        checkin: getRandomItem(checkinOrCheckout),
        checkout: getRandomItem(checkinOrCheckout),
        features: getRandomItem(features),
        description: '',
        photos: []
      },
    };
    return similarOffers[i];
  }
};

createSimilarOffer();
