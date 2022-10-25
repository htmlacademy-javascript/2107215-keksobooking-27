import {createOffers} from './create-offers.js';
import {createSentenceWithCount} from './util.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const cardListFragment = document.createDocumentFragment();
const createCard = createOffers();

function setElementValue (element, classElement) {
  if (element) {
    classElement.textContent = element;
  } else {
    classElement.remove();
  }
}

function setElementPrice (element, classElement) {
  if (element) {
    classElement.textContent = `${element} ₽/ночь`;
  } else {
    classElement.remove();
  }
}

function setElementCapacity (elementRooms, elementGuests, classElement) {
  if (elementRooms && elementGuests) {
    classElement.textContent = `${elementRooms} для ${elementGuests}`;
  } else {
    classElement.remove();
  }
}

function setElementTime (elementCheckin, elementCheckout, classElement) {
  if (elementCheckin && elementCheckout) {
    classElement.textContent = `Заезд после ${elementCheckin}, выезд до ${elementCheckout}`;
  } else {
    classElement.remove();
  }
}

function setElementAvatar (element, classElement) {
  if (element) {
    classElement.src = element;
  } else {
    classElement.remove();
  }
}

function setElementPhotos (arrayLength, element, classElements, classElement) {
  if(!arrayLength) {
    classElements.remove();
  } else {
    classElement.remove();
    for(let i = 0; i < arrayLength; i++) {
      const photo = classElement.cloneNode(true);
      photo.src = element[i];
      classElements.append(photo);
    }
  }
}

createCard.forEach((card) => {
  const cardElement = cardTemplate.cloneNode(true);
  const avatarElement = cardElement.querySelector('.popup__avatar');
  const titleElement = cardElement.querySelector('.popup__title');
  const addressElement = cardElement.querySelector('.popup__text--address');
  const priceElement = cardElement.querySelector('.popup__text--price');
  const typeElement = cardElement.querySelector('.popup__type');
  const rooms = createSentenceWithCount(card.offer.rooms, ['комната', 'комнаты', 'комнат']);
  const guests = createSentenceWithCount(card.offer.guests, ['гостя', 'гостей']);
  const capacityElement = cardElement.querySelector('.popup__text--capacity');
  const timeElement = cardElement.querySelector('.popup__text--time');

  const cardListFeature = cardElement.querySelectorAll('.popup__feature');
  cardListFeature.forEach((featureListItem) => {
    const isNecessary = card.offer.features.some(
      (offerFeatures) => featureListItem.classList.contains(`popup__feature--${offerFeatures}`),
    );
    if (!isNecessary) {
      featureListItem.remove();
    }
  });

  const descriptionElement = cardElement.querySelector('.popup__description');
  const photoElements = cardElement.querySelector('.popup__photos');
  const photoElement = photoElements.querySelector('img');

  setElementAvatar(card.author.avatar, avatarElement);
  setElementValue(card.offer.title, titleElement);
  setElementPrice(card.offer.price, priceElement);
  setElementValue(card.offer.address, addressElement);
  setElementCapacity(rooms, guests, capacityElement);
  setElementTime(card.offer.checkin, card.offer.checkout, timeElement);
  setElementValue(card.offer.type, typeElement);
  setElementValue(card.offer.description, descriptionElement);
  setElementPhotos(card.offer.photos.length, card.offer.photos, photoElements, photoElement);
  cardListFragment.append(cardElement);
});

document.querySelector('#map-canvas').append(cardListFragment);
