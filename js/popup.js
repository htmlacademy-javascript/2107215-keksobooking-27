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

function setElementPhotos (element, classElements) {
  if(!element) {
    classElements.remove();
  } else {
    const photoElement = classElements.querySelector('img');
    photoElement.remove();
    for(let i = 0; i < element.length; i++) {
      const photo = photoElement.cloneNode(true);
      photo.src = element[i];
      classElements.append(photo);
    }
  }
}

function getCard(point) {
  const {author, offer} = point;
  const card = cardTemplate.cloneNode(true);
  const avatar = card.querySelector('.popup__avatar');
  const title = card.querySelector('.popup__title');
  const address = card.querySelector('.popup__text--address');
  const price = card.querySelector('.popup__text--price');
  const type = card.querySelector('.popup__type');
  const rooms = createSentenceWithCount(offer.rooms, ['комната', 'комнаты', 'комнат']);
  const guests = createSentenceWithCount(offer.guests, ['гостя', 'гостей']);
  const capacity = card.querySelector('.popup__text--capacity');
  const time = card.querySelector('.popup__text--time');
  const features = card.querySelector('.popup__features');
  if (offer.features) {
    const cardListFeature = features.querySelectorAll('.popup__feature');

    cardListFeature.forEach((featureListItem) => {
      const isNecessary = offer.features.some(
        (offerFeatures) => featureListItem.classList.contains(`popup__feature--${offerFeatures}`),
      );
      if (!isNecessary) {
        featureListItem.remove();
      }
    });
  } else {
    features.remove();
  }

  const description = card.querySelector('.popup__description');
  const photo = card.querySelector('.popup__photos');

  setElementAvatar(author.avatar, avatar);
  setElementValue(offer.title, title);
  setElementPrice(offer.price, price);
  setElementValue(offer.address, address);
  setElementCapacity(rooms, guests, capacity);
  setElementTime(offer.checkin, offer.checkout, time);
  setElementValue(offer.type, type);
  setElementValue(offer.description, description);
  setElementPhotos(offer.photos, photo);
  return card;
}

export {getCard};
