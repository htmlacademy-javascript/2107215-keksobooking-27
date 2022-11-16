import {sendData} from './api.js';
import {showMessage, showErrorMessage} from './message.js';
import {setAddress, resetMarker, map} from './map.js';
import {DEFAULT_COORDS} from './data.js';
import {resetFilters} from './filter.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const adForm = document.querySelector('.ad-form');
const type = document.querySelector('#type');
const price = document.querySelector('#price');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const timein = adForm.querySelector('#timein');
const timeout = adForm.querySelector('#timeout');
const slider = adForm.querySelector('.ad-form__slider');
const submitButton = adForm.querySelector('.ad-form__submit');
const resetButton = adForm.querySelector('.ad-form__reset');
const fileAvatar = adForm.querySelector('#avatar');
const avatarPreview = adForm.querySelector('.ad-form-header__preview img');
const filePhoto = adForm.querySelector('#images');
const photoPreviewHousing = adForm.querySelector('.ad-form__photo');
const avatarDefault = avatarPreview.src;

const guestsCapacity = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0'],
};

const typesMinPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
},);

const validateCapacity = () => guestsCapacity[roomNumber.value].includes(capacity.value);

const setRoomNumberErrorMessage = () => 'Количество гостей не соответствует количеству комнат';

const setCapacityErrorMessage = () => 'Недопустимое количество гостей';

const validateMinPrice = () => typesMinPrice[type.value] <= price.value;

const setMinPriceErrorMessage = () => `Минимальная цена для выбранного типа жилья ${typesMinPrice[type.value]} руб.`;

capacity.addEventListener('change', () => pristine.validate(roomNumber));
roomNumber.addEventListener('change', () => pristine.validate(capacity));
type.addEventListener('change', () => {
  price.placeholder = typesMinPrice[type.value];
  pristine.validate(price);
});
timein.addEventListener('change', () => {
  timeout.value = timein.value;
});
timeout.addEventListener('change', () => {
  timein.value = timeout.value;
});

pristine.addValidator(capacity, validateCapacity, setCapacityErrorMessage);
pristine.addValidator(roomNumber, validateCapacity, setRoomNumberErrorMessage);
pristine.addValidator(price, validateMinPrice, setMinPriceErrorMessage);

fileAvatar.addEventListener('change', () => {
  const file = fileAvatar.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

filePhoto.addEventListener('change', () => {
  const file = filePhoto.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    photoPreviewHousing.innerHTML = '';
    const photo = document.createElement('img');
    photo.src = URL.createObjectURL(file);
    photo.style.width = '70px';
    photo.style.height = '70px';
    photo.style.textAlign = 'center';
    photoPreviewHousing.appendChild(photo);
  }
});

const toggleSubmitButtonState = (flag) => {
  submitButton.disabled = flag;
};

const resetPhotos = () => {
  avatarPreview.src = avatarDefault;
  photoPreviewHousing.innerHTML = '';
};

const resetForm = () => {
  adForm.reset();
  slider.noUiSlider.set(0);
  price.placeholder = typesMinPrice[type.value];
  pristine.reset();
  setAddress(DEFAULT_COORDS);
  resetMarker(DEFAULT_COORDS);
  map.closePopup();
  resetFilters();
  resetPhotos();
};

const resetButtonClick = (evt) => {
  evt.preventDefault();
  resetForm();
};

resetButton.addEventListener('click', (evt) => resetButtonClick(evt));

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    toggleSubmitButtonState(true);
    sendData(
      () => {
        showMessage();
        resetForm();
        toggleSubmitButtonState(false);
      },
      () => {
        showErrorMessage();
        toggleSubmitButtonState(false);
      },
      new FormData(evt.target)
    );
  }
});

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 1000,
  step: 1000,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

slider.noUiSlider.on('slide', () => {
  price.value = slider.noUiSlider.get();
});
