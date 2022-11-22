import {debounce} from './util.js';

const mapFilters = document.querySelector('.map__filters');
const typeFilter = mapFilters.querySelector('#housing-type');
const priceFilter = mapFilters.querySelector('#housing-price');
const roomsFilter = mapFilters.querySelector('#housing-rooms');
const guestsFilter = mapFilters.querySelector('#housing-guests');
const featuresFilter = mapFilters.querySelector('#housing-features');

const priceLimits = {
  low: {
    min: 0,
    max: 9999,
  },
  middle: {
    min: 10000,
    max: 49999,
  },
  high: {
    min: 50000,
    max: 100000,
  }
};

const resetFilters = () => {
  mapFilters.reset();
};

const filterType = ({offer}) => typeFilter.value === 'any'
  || offer.type === typeFilter.value;

const filterPrice = ({offer}) => priceFilter.value === 'any'
  || (offer.price >= priceLimits[priceFilter.value].min && offer.price <= priceLimits[priceFilter.value].max);

const filterRooms = ({offer}) => roomsFilter.value === 'any'
  || offer.rooms.toString() === roomsFilter.value;

const filterGuests = ({offer}) => guestsFilter.value === 'any'
  || offer.guests.toString() === guestsFilter.value;

const filterFeatures = ({offer}) => {
  const checkedFilters = featuresFilter.querySelectorAll('input:checked');
  if (!checkedFilters) {
    return true;
  }

  return offer.features ? Array.from(checkedFilters).every((feature) => offer.features.includes(feature.value)) : false;
};

const filterOffers = (element) =>
  filterType(element)
  && filterPrice(element)
  && filterRooms(element)
  && filterGuests(element)
  && filterFeatures(element);

const useFilters = (offers, cb) => {
  const onFiltersChange = (element) => () => {
    const filteredCards = element.filter(filterOffers);

    cb(filteredCards);
  };

  mapFilters.addEventListener('change', debounce(onFiltersChange(offers)));
};

export {useFilters, resetFilters};
