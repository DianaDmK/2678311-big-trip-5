const TYPES = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant'
];

const CITIES = [
  'Amsterdam',
  'Tokyo',
  'London',
  'Macau',
  'Dubai ',
  'Istanbul',
];

const DESCRIPTION = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.'
];

const OFFERS_TEMPLATES = {
  Taxi: ['Wi-Fi', 'Luggage'],
  Bus: ['Air conditioning', 'Window seat'],
  Train: ['Meal', 'Seat selection'],
  Ship: ['Excursion', 'VIP cabin'],
  Drive: ['GPS rental', 'Child seat'],
  Flight: ['Meal', 'Priority boarding'],
  'Check-in': ['Late check-out', 'Breakfast'],
  Sightseeing: ['Audio guide', 'Photo session'],
  Restaurant: ['Wine', 'Dessert']
};

const MIN_PRICE = 2;
const MAX_PRICE = 50;

const MIN_BASE_PRICE = 10;
const MAX_BASE_PRICE = 500;

const MIN_PICTURES = 1;
const MAX_PICTURES = 3;

const MIN_SENTENCES = 1;
const MAX_SENTENCES = 5;

const MAX_DURATION_HOURS = 12;

const POINT_COUNT = 3;

export {
  TYPES,
  DESCRIPTION,
  CITIES,
  OFFERS_TEMPLATES,
  MIN_PRICE,
  MAX_PRICE,
  MIN_BASE_PRICE,
  MAX_BASE_PRICE,
  MIN_PICTURES,
  MAX_PICTURES,
  MIN_SENTENCES,
  MAX_SENTENCES,
  MAX_DURATION_HOURS,
  POINT_COUNT
};
