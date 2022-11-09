import {createSentenceWithCount} from './util.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

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

function setElementPhotos (element, classElements, classElement) {
  if(!element.length) {
    classElements.remove();
  } else {
    classElement.remove();
    for(let i = 0; i < element.length; i++) {
      const photo = classElement.cloneNode(true);
      photo.src = element[i];
      classElements.append(photo);
    }
  }
}

function getCard(point) {
  const {author, offer} = point;
  const cardElement = cardTemplate.cloneNode(true);
  const avatarElement = cardElement.querySelector('.popup__avatar');
  const titleElement = cardElement.querySelector('.popup__title');
  const addressElement = cardElement.querySelector('.popup__text--address');
  const priceElement = cardElement.querySelector('.popup__text--price');
  const typeElement = cardElement.querySelector('.popup__type');
  const rooms = createSentenceWithCount(offer.rooms, ['комната', 'комнаты', 'комнат']);
  const guests = createSentenceWithCount(offer.guests, ['гостя', 'гостей']);
  const capacityElement = cardElement.querySelector('.popup__text--capacity');
  const timeElement = cardElement.querySelector('.popup__text--time');
  const featuresElement = cardElement.querySelector('.popup__features');
  if (offer.features) {
    const cardListFeature = featuresElement.querySelectorAll('.popup__feature');

    cardListFeature.forEach((featureListItem) => {
      const isNecessary = offer.features.some(
        (offerFeatures) => featureListItem.classList.contains(`popup__feature--${offerFeatures}`),
      );
      if (!isNecessary) {
        featureListItem.remove();
      }
    });
  } else {
    featuresElement.remove();
  }

  const descriptionElement = cardElement.querySelector('.popup__description');
  const photoElements = cardElement.querySelector('.popup__photos');
  const photoElement = photoElements.querySelector('img');

  setElementAvatar(author.avatar, avatarElement);
  setElementValue(offer.title, titleElement);
  setElementPrice(offer.price, priceElement);
  setElementValue(offer.address, addressElement);
  setElementCapacity(rooms, guests, capacityElement);
  setElementTime(offer.checkin, offer.checkout, timeElement);
  setElementValue(offer.type, typeElement);
  setElementValue(offer.description, descriptionElement);
  setElementPhotos(offer.photos, photoElements, photoElement);
  return cardElement;
}

export {getCard};
