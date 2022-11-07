import {initMap} from './map.js';
import {
  activePage,
  deactivePage
} from './form.js';
import {createOffers} from './create-offers.js';
import {
  setOnMapLoad,
  setOnMainPinMove,
  setAddress,
  setAdPins
} from './map.js';
import {DEFAULT_COORDS} from './data.js';

const offers = createOffers();

deactivePage();

setOnMapLoad(() => {
  setOnMainPinMove();
  setAddress(DEFAULT_COORDS);
  setAdPins(offers);
  activePage();
});

initMap(DEFAULT_COORDS);
