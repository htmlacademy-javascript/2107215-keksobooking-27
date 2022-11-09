import {sendData} from './api.js';
import {showMessage, showErrorMessage} from './message.js';
import {setAddress, resetMarker} from './map.js';
import {DEFAULT_COORDS} from './data.js';

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

const guestsCapacity = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0'],
};

const TypesMinPrice = {
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

function validateCapacity() {
  return guestsCapacity[roomNumber.value].includes(capacity.value);
}
function roomNumberErrorMessage() {
  return 'Количество гостей не соответствует количеству комнат';
}

function capacityErrorMessage() {
  return 'Недопустимое количество гостей';
}

function validateMinPrice() {
  return TypesMinPrice[type.value] <= price.value;
}
function minPriceErrorMessage() {
  return `Минимальная цена для выбранного типа жилья ${TypesMinPrice[type.value]} руб.`;
}

resetButton.addEventListener('click', (evt) => resetButtonClick(evt));
capacity.addEventListener('change', () => pristine.validate(roomNumber));
roomNumber.addEventListener('change', () => pristine.validate(capacity));
type.addEventListener('change', () => {
  price.placeholder = TypesMinPrice[type.value];
  pristine.validate(price);
});
timein.addEventListener('change', () => {
  timeout.value = timein.value;
});
timeout.addEventListener('change', () => {
  timein.value = timeout.value;
});

pristine.addValidator(capacity, validateCapacity, capacityErrorMessage);
pristine.addValidator(roomNumber, validateCapacity, roomNumberErrorMessage);
pristine.addValidator(price, validateMinPrice, minPriceErrorMessage);

const resetForm = () => {
  adForm.reset();
  slider.noUiSlider.set(0);
  price.placeholder = TypesMinPrice[type.value];
  pristine.reset();
  setAddress(DEFAULT_COORDS);
  resetMarker(DEFAULT_COORDS);
};

function resetButtonClick(evt) {
  evt.preventDefault();
  resetForm();
}

adForm.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    submitButton.disabled = true;
    sendData(
      () => {
        showMessage();
        resetForm();
        submitButton.disabled = false;
      },
      () => {
        showErrorMessage();
        submitButton.disabled = false;
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

