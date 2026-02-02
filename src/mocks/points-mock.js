import { getRandomIntInRange, getRandomArrayItem, getRandomDate, addRandomDuration } from '../utils.js';
import {
  TYPES,
  MIN_BASE_PRICE,
  MAX_BASE_PRICE,
  MAX_DURATION_HOURS,
  POINT_COUNT,
  CITIES
} from '../const.js';
import { DESTINATIONS } from './destinations-mock.js';

function generateRoutePoint() {
  const cityName = getRandomArrayItem(CITIES);
  const type = getRandomArrayItem(TYPES);
  const destination = getRandomArrayItem(DESTINATIONS);
  const startTime = getRandomDate();
  const endTime = addRandomDuration(startTime, MAX_DURATION_HOURS);
  const basePrice = getRandomIntInRange(MIN_BASE_PRICE, MAX_BASE_PRICE);
  const availableOffers = [];

  return {
    id: crypto.randomUUID(),
    cityName,
    type,
    destinationId: destination.id,
    startTime,
    endTime,
    basePrice,
    offers: availableOffers
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
