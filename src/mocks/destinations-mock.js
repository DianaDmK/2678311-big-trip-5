import { getRandomIntInRange, getRandomArrayItem, generatePictureUrl } from '../utils.js';
import {
  CITIES,
  DESCRIPTION,
  MIN_PICTURES,
  MAX_PICTURES,
  MIN_SENTENCES,
  MAX_SENTENCES
} from '../const.js';

function generateDescription() {
  const count = getRandomIntInRange(MIN_SENTENCES, MAX_SENTENCES);
  const sentences = [];
  for (let i = 0; i < count; i++) {
    sentences.push(getRandomArrayItem(DESCRIPTION));
  }
  return sentences.join(' ');
}

function generatePictures(count) {
  const pics = [];
  for (let i = 0; i < count; i++) {
    pics.push(generatePictureUrl(getRandomIntInRange(1, 10000)));
  }
  return pics;
}

function generateDestination(name) {
  return {
    id: crypto.randomUUID(),
    name,
    description: generateDescription(),
    pictures: generatePictures(getRandomIntInRange(MIN_PICTURES, MAX_PICTURES))
  };
}

function generateAllDestinations() {
  return CITIES.map(generateDestination);
}

const DESTINATIONS = generateAllDestinations();

export { DESTINATIONS };
