import { getRandomIntInRange } from '../utils.js';
import { OFFERS_TEMPLATES, MIN_PRICE, MAX_PRICE } from '../const.js';

function generateOffer(title) {
  return {
    id: crypto.randomUUID(),
    title,
    price: getRandomIntInRange(MIN_PRICE, MAX_PRICE),
  };
}

function generateOffersForType(type) {
  const titles = OFFERS_TEMPLATES[type] || [];
  return titles.map(generateOffer);
}

function generateAllOffers() {
  const result = {};
  for (const type of Object.keys(OFFERS_TEMPLATES)) {
    result[type] = generateOffersForType(type);
  }
  return result;
}

const OFFERS = generateAllOffers();

export { OFFERS };
