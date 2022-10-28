import {adForm} from './form.js';

const type = document.querySelector('#type');
const price = document.querySelector('#price');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const timein = adForm.querySelector('#timein');
const timeout = adForm.querySelector('#timeout');

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

function validatePrice() {
  return guestsCapacity[roomNumber.value].includes(capacity.value);
}
function capacityErrorMessage() {
  return 'Количество гостей не соответствует количеству комнат';
}

function validateMinPrice() {
  return TypesMinPrice[type.value] <= price.value;
}
function getMinPriceErrorMessage() {
  return `Минимальная цена для выбранного типа жилья ${TypesMinPrice[type.value]} руб.`;
}

capacity.addEventListener('change', () => pristine.validate(roomNumber));
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

pristine.addValidator(roomNumber, validatePrice, capacityErrorMessage);
pristine.addValidator(price, validateMinPrice, getMinPriceErrorMessage);

adForm.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    adForm.submit();
  }
});
