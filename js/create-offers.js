import {
  getRandomInt,
  getRandomArbitrary,
  getArray,
  getRandomArrayElement
} from './util.js';

import {
  TYPE_OF_HOUSING,
  CHECKIN,
  CHECKOUT,
  FEATURES,
  PHOTOS,
  DECIMAL_PLACES,
  OFFERS_COUNT,
  LatCoordinate,
  LngCoordinate,
  RoomsRange,
  GuestsRange,
  PriceRange
} from './data.js';

const createCard = (index) => ({
  author: {
    avatar: `img/avatars/user${index.toString().padStart(2, '0')}.png`,
  },
  offer: {
    title: 'Добро пожаловать в наше уютное жилье',
    address: (`${getRandomArbitrary(LatCoordinate.MIN, LatCoordinate.MAX, DECIMAL_PLACES)}, ${getRandomArbitrary(LngCoordinate.MIN, LngCoordinate.MAX, DECIMAL_PLACES)}`),
    price: getRandomInt(PriceRange.MIN, PriceRange.MAX),
    type: getRandomArrayElement(Object.values(TYPE_OF_HOUSING)),
    rooms: getRandomInt(RoomsRange.MIN, RoomsRange.MAX),
    guests: getRandomInt(GuestsRange.MIN, GuestsRange.MAX),
    checkin: getRandomArrayElement(CHECKIN),
    checkout: getRandomArrayElement(CHECKOUT),
    features: getArray(FEATURES),
    description: 'Чисто, уютно и светло',
    photos: getArray(PHOTOS),
  },
  location: {
    lat: getRandomArbitrary(LatCoordinate.MIN, LatCoordinate.MAX, DECIMAL_PLACES),
    lng: getRandomArbitrary(LngCoordinate.MIN, LngCoordinate.MAX, DECIMAL_PLACES),
  }
});

export const createOffers = () => Array.from({length: OFFERS_COUNT}, (_, index) => createCard(index + 1));
