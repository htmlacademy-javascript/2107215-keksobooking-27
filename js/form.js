const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const slider = document.querySelector('.ad-form__slider');

function disableElement(elements) {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');
  for (const item of elements.children) {
    item.disabled = true;
  }
}

function enableElement(elements) {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');
  for (const item of elements.children) {
    item.disabled = false;
  }
}

function deactivePage() {
  disableElement(adForm);
  slider.setAttribute('disabled', true);
}

function activePage() {
  enableElement(adForm);
  slider.removeAttribute('disabled');
}

export {activePage, deactivePage};
