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
  }
  return similarOffers[i];
};

createSimilarOffer();


// Создаем метку на карте
var renderCardPin = function () {
  var mapCardTemplate = document.querySelector('template').content.querySelector('button.map__pin');
  for (var i = 0; i < 8; i++) {
    var offersButton = mapCardTemplate.cloneNode(true);
    offersButton.style.left = locationX;
    offersButton.style.top = locationY;
    // var cardButtonAvatar = offersButton.querySelectorAll('img');
    // cardButtonAvatar[0].src = offer.author.avatar;
  }
  return offersButton;
};
renderCardPin();

var buttonElements = document.querySelector('.map__pins');

// Вставляем метки в разметку
var fragmentBtn = document.createDocumentFragment();
for (var i = 0; i < similarOffers.length; i++) {
  fragmentBtn.appendChild(renderCardPin(similarOffers[i]));
}

buttonElements.appendChild(fragmentBtn);

// Создаем карточку с похожим предложением
var renderMapCard = function (offer) {
  var mapCardTemplate = document.querySelector('template').content.querySelector('article.map__card');
  for (i = 0; i < 8; i++) {
    var mapCardElement = mapCardTemplate.cloneNode(true);
    var mapCardTitle = mapCardElement.querySelectorAll('h3');
    mapCardTitle[0].textContent = offer.offers.title;
    mapCardElement.querySelectorAll('small').textContent = offer.offers.address;
    var mapCardPrice = mapCardElement.querySelectorAll('.popup__price');
    mapCardPrice[0].innerHTML = offer.offers.price + ' &#x20bd;/ночь';
    // В блок h4 выведите тип жилья offer.type: Квартира для flat, Бунгало для bungalo, Дом для house
    var textBlock = mapCardElement.querySelectorAll('p');
    textBlock[2].textContent = offer.offers.rooms + ' комнаты для ' + offer.offers.guests + ' гостей';
    textBlock[3].textContent = 'Заезд после ' + offer.offers.checkin + ', выезд до ' + offer.offers.checkout;
    // В список .popup__features выведите все доступные удобства в квартире из массива {{offer.features}} пустыми элементами списка (<li>) с классом feature feature--{{название удобства}}
    textBlock[4].textContent = offer.offers.description;
    var imgBlock = mapCardElement.querySelectorAll('img.popup__avatar');
    imgBlock[0].src = offer.author.avatar;
  }
  return mapCardElement;
};

var similarOfferElement = document.querySelector('.map');

// Вставляем карточку похожих объявлений в разметку
var fragment = document.createDocumentFragment();
for (i = 0; i < similarOffers.length; i++) {
  fragment.appendChild(renderMapCard(similarOffers[i]));
}

similarOfferElement.appendChild(fragment);


