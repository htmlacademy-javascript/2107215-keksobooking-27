import {
  getRandomInt,
  getRandomArbitrary,
  getArray,
  getRandomArrayElement
} from './util.js';

const TYPE_OF_HOUSING = [
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
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const createCard = (index) => ({
  author: {
    avatar: `img/avatars/user${index.toString().padStart(2, '0')}.png`,
  },
  offer: {
    title: 'Добро пожаловать в наше уютное жилье',
    address: (`${getRandomArbitrary(35.65000, 35.70000, 5)}, ${getRandomArbitrary(139.70000, 139.80000, 5)}`),
    price: getRandomInt(1, 10),
    type: getRandomArrayElement(TYPE_OF_HOUSING),
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
    lng: getRandomArbitrary(139.70000, 139.80000, 5),
  }
});

export const createOffers = () => Array.from({length: 10}, (_, index) => createCard(index + 1));
