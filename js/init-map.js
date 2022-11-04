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

const DEFAULT_COORDS = {
  lat: 35.68256,
  lng: 139.75114
};

const offers = createOffers();

deactivePage();

setOnMapLoad(() => {
  setOnMainPinMove();
  setAddress(DEFAULT_COORDS);
  setAdPins(offers);
  activePage();
});

initMap(DEFAULT_COORDS);
