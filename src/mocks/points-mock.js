import { getRandomIntInRange, getRandomArrayItem, getRandomDate, addRandomDuration, getRandomSubarray } from '../utils.js';
import {
  TYPES,
  MIN_BASE_PRICE,
  MAX_BASE_PRICE,
  MAX_DURATION_HOURS,
  POINT_COUNT,
} from '../const.js';
import { DESTINATIONS } from './destinations-mock.js';
import { OFFERS } from './offers-mock.js';
import { nanoid } from 'nanoid';

function generateRoutePoint() {
  const destination = getRandomArrayItem(DESTINATIONS);
  const cityName = destination.name;
  const type = getRandomArrayItem(TYPES);
  const startTime = getRandomDate();
  const endTime = addRandomDuration(startTime, MAX_DURATION_HOURS);
  const basePrice = getRandomIntInRange(MIN_BASE_PRICE, MAX_BASE_PRICE);

  const availableOffersForType = OFFERS[type] || [];
  const selectedOffers = getRandomSubarray(availableOffersForType);
  const selectedOfferIds = selectedOffers.map((offer) => offer.id);

  return {
    id: nanoid(),
    cityName,
    type,
    destinationId: destination.id,
    startTime,
    endTime,
    basePrice,
    offers: selectedOfferIds
  };
}

function generateAllPoints() {
  const points = [];
  for (let i = 0; i < POINT_COUNT; i++) {
    points.push(generateRoutePoint());
  }
  return points;
}

const POINTS = generateAllPoints();

export { POINTS };
