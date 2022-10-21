import {createOffers} from './create-offers.js';
import {outputNumWithWord} from './util.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const cardListFragment = document.createDocumentFragment();

const createCard = createOffers();

createCard.forEach((card) => {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${card.offer.price$} + ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = card.offer.type;
  const rooms = outputNumWithWord(card.offer.rooms, ['комната', 'комнаты', 'комнат']);
  const guests = outputNumWithWord(card.offer.guests, ['гостя', 'гостей']);
  cardElement.querySelector('.popup__text--capacity').textContent = `${rooms} для ${guests}`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;

  const cardListFeature = cardElement.querySelectorAll('.popup__feature');

  cardListFeature.forEach((featureListItem) => {
    const isNecessary = card.offer.features.some(
      (offerFeatures) => featureListItem.classList.contains(`popup__feature--${offerFeatures}`),
    );
    if (!isNecessary) {
      featureListItem.remove();
    }
  });

  const photoElements = cardElement.querySelector('.popup__photos');
  const photoElement = photoElements.querySelector('img');

  function getElementPhotos () {
    if(card.offer.photos.length < 1) {
      photoElements.remove();
    } else {
      cardElement.querySelector('.popup__photo').src = card.offer.photos[0];
      if (card.offer.photos.length >= 1) {
        for(let i = 1; i < card.offer.photos.length; i++) {
          const photo = photoElement.cloneNode(true);
          photo.src = card.offer.photos[i];
          photoElements.append(photo);
        }
      }
    }
  }
  getElementPhotos();

  const avatarElement = cardElement.querySelector('.popup__avatar');

  function getElementAvatar () {
    if (card.author.avatar) {
      avatarElement.src = card.author.avatar;
    } else {
      avatarElement.remove();
    }

    return avatarElement;
  }
  getElementAvatar();

  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  cardListFragment.append(cardElement);
});

document.querySelector('#map-canvas').append(cardListFragment);
