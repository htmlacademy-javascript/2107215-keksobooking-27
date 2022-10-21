const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const slider = document.querySelector('.ad-form__slider');


function disableElement(classElement) {
  classElement.classList.add(`${classElement.classList[0]}--disabled`);
  for (const item of classElement.children) {
    item.disabled = true;
  }
}

export function deactivePage() {
  disableElement(adForm);
  disableElement(mapFilters);
  slider.setAttribute('disabled', true);
}

deactivePage();

function enableElement(classElement) {
  classElement.classList.remove(`${classElement.classList[0]}--disabled`);
  for (const item of classElement.children) {
    item.disabled = false;
  }
}

export function activePage() {
  disableElement(mapFilters);
  enableElement(adForm);
  slider.removeAttribute('disabled');
}

activePage();
