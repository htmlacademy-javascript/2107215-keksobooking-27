import {createSentenceWithCount} from './util.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

function setElementValue (value, element) {
  if (value) {
    element.textContent = value;
  } else {
    element.remove();
  }
}

function setElementPrice (price, element) {
  if (price) {
    element.textContent = `${price} ₽/ночь`;
  } else {
    element.remove();
  }
}

function setElementCapacity (rooms, guests, element) {
  if (rooms && guests) {
    element.textContent = `${rooms} для ${guests}`;
  } else {
    element.remove();
  }
}

function setElementTime (checkin, checkout, element) {
  if (checkin && checkout) {
    element.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  } else {
    element.remove();
  }
}

function setElementAvatar (avatar, element) {
  if (avatar) {
    element.src = avatar;
  } else {
    element.remove();
  }
}

function setElementPhotos (photos, element) {
  if(!photos) {
    element.remove();
  } else {
    const photoElement = element.querySelector('img');
    photoElement.remove();
    for(let i = 0; i < photos.length; i++) {
      const photo = photoElement.cloneNode(true);
      photo.src = photos[i];
      element.append(photo);
    }
  }
}

function getCard (point) {
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
