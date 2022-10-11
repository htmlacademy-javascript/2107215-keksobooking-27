function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min > max || min < 0 || max < 0) {
    return NaN;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArbitrary(min, max, maxDigits = 0) {
  if (min > max || min < 0 || max < 0) {
    return NaN;
  }

  const digitsDegree = 10 ** maxDigits;
  return Math.floor((Math.random() * (max - min) + min) * digitsDegree) / digitsDegree;
}

const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];
const CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];
const CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

function getArray(features) {
  const maxLength = features.length;
  const lengthOfArray = getRandomInt(1, maxLength);
  const array = [];

  for(let i = 0; i < lengthOfArray; i++) {
    const indexOfEl = getRandomInt(0, maxLength);
    const el = features[indexOfEl];

    if (!array.includes(el)) {
      array.push(el);
    }
  }
  return array.join(', ');
}

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

const creatAutorData = (index) => ({
  avatar: `img/avatars/user${index.toString().padStart(2, '0')}.png`,
});

const createCard = () => ({
  offer: {
    title: 'Добро пожаловать в наше уютное жилье',
    address: (`${getRandomArbitrary(35.65000, 35.70000, 5)}, ${getRandomArbitrary(139.70000, 139.80000, 5)}`),
    price: getRandomInt(1, 10),
    type: getRandomArrayElement(TYPE),
    rooms: getRandomInt(1, 10),
    guests: getRandomInt(1, 10),
    checkin: getRandomArrayElement(CHECKIN),
    checkout: getRandomArrayElement(CHECKOUT),
    features: getArray(FEATURES),
    description: 'Чисто, уютно и светло',
    photos: getArray(PHOTOS),
  },
  location: {
    lat: getRandomArbitrary(35.65000, 35.70000, 5),
    Lng: getRandomArbitrary(139.70000, 139.80000, 5),
  }
});

const creatOffer = (index) => ({
  autor: creatAutorData (index),
});

const getOffers = Array.from({length: 10}, (_, index) => creatOffer(index + 1));

const similarCards = Array.from({length: 10}, createCard);
