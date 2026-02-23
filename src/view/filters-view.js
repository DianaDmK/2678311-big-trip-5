import AbstractView from '../framework/view/abstract-view.js';
import { FILTER_TYPE } from '../const.js';

function createFiltersTemplate(currentFilterType) {
  const isChecked = (type) => currentFilterType === type ? 'checked' : '';
  return (
    `<form class="trip-filters" action="#" method="get">
        <div class="trip-filters__filter">
          <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${FILTER_TYPE.EVERYTHING}" ${isChecked(FILTER_TYPE.EVERYTHING)}>
          <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
        </div>
        <div class="trip-filters__filter">
          <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${FILTER_TYPE.FUTURE}" ${isChecked(FILTER_TYPE.FUTURE)}>
          <label class="trip-filters__filter-label" for="filter-future">Future</label>
        </div>

        <div class="trip-filters__filter">
          <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${FILTER_TYPE.PRESENT}" ${isChecked(FILTER_TYPE.PRESENT)}>
          <label class="trip-filters__filter-label" for="filter-present">Present</label>
        </div>

        <div class="trip-filters__filter">
          <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${FILTER_TYPE.PAST}" ${isChecked(FILTER_TYPE.PAST)}>
          <label class="trip-filters__filter-label" for="filter-past">Past</label>
        </div>
        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>`
  );
}

export default class FiltersView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor({ filters, currentFilterType, onFilterTypeChange }) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFiltersTemplate(this.#currentFilter, this.#filters);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}
