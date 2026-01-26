import { getRandomIntInRange, getRandomArrayItem, getRandomDate, addRandomDuration, getRandomSubarray } from '../utils.js';
import {
  TYPES,
  MIN_BASE_PRICE,
  MAX_BASE_PRICE,
  MAX_DURATION_HOURS,
  POINT_COUNT
} from '../const.js';
import { DESTINATIONS } from './destinations-mock.js';
import { OFFERS } from './offers-mock.js';

function generateRoutePoint() {
  const type = getRandomArrayItem(TYPES);
  const destination = getRandomArrayItem(DESTINATIONS);
  const startTime = getRandomDate();
  const endTime = addRandomDuration(startTime, MAX_DURATION_HOURS);
  const basePrice = getRandomIntInRange(MIN_BASE_PRICE, MAX_BASE_PRICE);
  const availableOffers = OFFERS[type] || [];
  const selectedOffers = getRandomSubarray(availableOffers).map((o) => o.id);

  return {
    id: crypto.randomUUID(),
    type,
    destinationId: destination.id,
    startTime,
    endTime,
    basePrice,
    offers: selectedOffers
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
