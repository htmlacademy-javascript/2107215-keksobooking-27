import {getCard} from './popup.js'

const addressInput = document.querySelector('#address');

const ZOOM_DEFAULT = 10;
const COORDS_DIGITS = 5;
const map = L.map('map-canvas');
const markerGroup = L.layerGroup().addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainMarker = L.marker(
  {
    lat: 0,
    lng: 0,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  }
);

export const initMap = (defaultCoords) => {
  map.setView(defaultCoords, ZOOM_DEFAULT);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
    },
  ).addTo(map);
  mainMarker.setLatLng(defaultCoords);
  mainMarker.addTo(map);
};

const createAdPinMarkers = (offers) => {
  offers.forEach((point) => {
    const {location} = point;
    const marker = L.marker(
      {
        lat: location.lat,
        lng: location.lng,
      },
      {
        icon: pinIcon,
      },
    );

    marker
      .addTo(markerGroup)
      .bindPopup(getCard(point));
  });
};

export const setAddress = ({lat, lng}) => {
  addressInput.value = `${lat.toFixed(COORDS_DIGITS)}, ${lng.toFixed(COORDS_DIGITS)}`;
};

export const setOnMapLoad = (cd) => {
  map.on('load', cd);
};

export const setOnMainPinMove = () => {
  mainMarker.on('move', ({target}) => {
  const newCoordinates = target.getLatLng();
  setAddress(newCoordinates)
  })
};

export const setAdPins = (offers) => {
  markerGroup.clearLayers();
  createAdPinMarkers(offers.slice(0, ZOOM_DEFAULT));
};
