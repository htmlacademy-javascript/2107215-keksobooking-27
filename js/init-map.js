import {initMap} from './map.js';
import {activePage} from './form.js';
import {createOffers} from './create-offers.js';
import {
  setOnMapLoad,
  setOnMainPinMove,
  setAddress,
  setAdPins
} from './map.js';

const offers = createOffers();

const DEFAULT_COORDS = {
  lat: 35.68256,
  lng: 139.75114
};

setOnMapLoad(() => {
  setOnMainPinMove();
  setAddress(DEFAULT_COORDS);
  activePage();
  setAdPins(offers);
});

initMap(DEFAULT_COORDS);
