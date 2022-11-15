const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const slider = document.querySelector('.ad-form__slider');

const togglePageContent = (flag) => {
  adForm.classList.toggle('ad-form--disabled');
  mapFilters.classList.toggle('map__filters--disabled');
  for (const item of adForm.children) {
    item.disabled = flag;
  }
};

const deactiveSlider = () => {
  slider.setAttribute('disabled', true);
};

const activeSlider = () => {
  slider.removeAttribute('disabled');
};

export {togglePageContent, deactiveSlider, activeSlider};
