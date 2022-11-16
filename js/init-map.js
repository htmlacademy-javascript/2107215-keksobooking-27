import {initMap} from './map.js';
import {togglePageContent, deactiveSlider, activeSlider} from './form.js';
import {setOnMapLoad, setOnMainPinMove, setAddress, setAdPins} from './map.js';
import {DEFAULT_COORDS} from './data.js';
import {getData} from './api.js';
import {showAlert} from './message.js';
import {useFilters} from './filter.js';

togglePageContent(true);
deactiveSlider();

getData((cards) => {
  setAdPins(cards);
  useFilters(cards, setAdPins);
}, () => {
  showAlert('Ошибка при загрузке данных');
});

setOnMapLoad(() => {
  setOnMainPinMove();
  setAddress(DEFAULT_COORDS);
  togglePageContent(false);
  activeSlider();
});

initMap(DEFAULT_COORDS);
