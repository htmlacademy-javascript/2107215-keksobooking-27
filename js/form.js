const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const slider = document.querySelector('.ad-form__slider');

function disableElement(classElement) {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');
  for (const item of classElement.children) {
    item.disabled = true;
  }
}

function enableElement(classElement) {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');
  for (const item of classElement.children) {
    item.disabled = false;
  }
}

export function deactivePage() {
  disableElement(adForm);
  slider.setAttribute('disabled', true);
}

export function activePage() {
  enableElement(adForm);
  slider.removeAttribute('disabled');
}
