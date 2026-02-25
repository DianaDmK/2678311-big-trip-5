import AbstractView from '../framework/view/abstract-view.js';
import { SORT_TYPE } from '../const.js';

function createSortTemplate(currentSortType) {
  const isChecked = (type) => currentSortType === type ? 'checked' : '';

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    <div class="trip-sort__item  trip-sort__item--day">
      <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" data-sort-type="${SORT_TYPE.DAY}" ${isChecked(SORT_TYPE.DAY)}>
        <label class="trip-sort__btn" for="sort-day">Day</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--event">
      <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
        <label class="trip-sort__btn" for="sort-event">Event</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--time">
      <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" data-sort-type="${SORT_TYPE.TIME}" ${isChecked(SORT_TYPE.TIME)}>
        <label class="trip-sort__btn" for="sort-time">Time</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--price">
      <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" data-sort-type="${SORT_TYPE.PRICE}" ${isChecked(SORT_TYPE.PRICE)}>
        <label class="trip-sort__btn" for="sort-price">Price</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--offer">
      <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
        <label class="trip-sort__btn" for="sort-offer">Offers</label>
    </div>
  </form>`
  );
}

export default class Sort extends AbstractView {
  #handleSortTypeChange = null;
  #currentSortType = null;

  constructor({ currentSortType, onSortTypeChange }) {
    super();
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT' || !evt.target.dataset.sortType) {
      return;
    }

    const newSortType = evt.target.dataset.sortType;
    this.#currentSortType = newSortType;
    this.#handleSortTypeChange(newSortType);
  };

  updateSortType(sortType) {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.updateElement();
  }
}
