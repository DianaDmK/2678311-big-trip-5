import { POINTS } from '../mocks/points-mock.js';
import { DESTINATIONS } from '../mocks/destinations-mock.js';
import { OFFERS } from '../mocks/offers-mock.js';

function createModel() {
  return {
    points: POINTS,
    destinations: DESTINATIONS,
    offers: OFFERS
  };
}

const model = createModel();

export { model };
