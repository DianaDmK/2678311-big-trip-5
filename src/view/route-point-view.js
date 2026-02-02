import dayjs from 'dayjs';
import AbstractView from '../framework/view/abstract-view.js';
import { formatDuration, getRandomSubarray } from '../utils.js';

const DATE_ATTR_FORMAT = 'YYYY-MM-DD';
const DATE_DISPLAY_FORMAT = 'MMM DD';
const TIME_FORMAT = 'HH:mm';

function createPointTemplate(point, allOffersByType) {
  const { type, cityName, basePrice, isFavorite } = point;

  const start = new Date(point.startTime);
  const end = new Date(point.endTime);

  const dateAttr = dayjs(start).format(DATE_ATTR_FORMAT);
  const dateDisplay = dayjs(start).format(DATE_DISPLAY_FORMAT).toUpperCase();
  const timeStart = dayjs(start).format(TIME_FORMAT);
  const timeEnd = dayjs(end).format(TIME_FORMAT);
  const duration = formatDuration(start, end);

  const availableOffers = allOffersByType[type] || [];
  const selectedOffers = getRandomSubarray(availableOffers);

  const offersList = selectedOffers.map((offer) => `
    <li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>
  `).join('');

  const favoriteBtnClass = isFavorite
    ? 'event__favorite-btn event__favorite-btn--active'
    : 'event__favorite-btn';

  return `
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dateAttr}">${dateDisplay}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${cityName}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dayjs(start).format('YYYY-MM-DDTHH:mm')}">${timeStart}</time>
            &mdash;
            <time class="event__end-time" datetime="${dayjs(end).format('YYYY-MM-DDTHH:mm')}">${timeEnd}</time>
          </p>
          <p class="event__duration">${duration}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
         <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offersList}
        </ul>
        <button class="${favoriteBtnClass}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z" />
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
  `;
}

export default class RoutePointView extends AbstractView {
  #point = null;
  #offers = null;
  #onOpenEditButtonClick = null;

  constructor({ point, offers, onEditClick }) {
    super();
    this.#point = point;
    this.#offers = offers;
    this.#onOpenEditButtonClick = onEditClick;
    this.#setEventListeners();
  }

  get template() {
    return createPointTemplate(this.#point, this.#offers);
  }

  #setEventListeners() {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onOpenEditButtonClickHandler);
  }

  #onOpenEditButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#onOpenEditButtonClick();
  };
}
