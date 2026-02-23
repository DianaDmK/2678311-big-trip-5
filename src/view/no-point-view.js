import AbstractView from '../framework/view/abstract-view.js';
import { FILTER_TYPE } from '../const.js';

const NoPointsTextType = {
  [FILTER_TYPE.PAST]: 'There are no past events now',
  [FILTER_TYPE.EVERYTHING]: 'Click New Event to create your first point',
  [FILTER_TYPE.PRESENT]: 'There are no present events now',
  [FILTER_TYPE.FUTURE]: 'There are no future events now',
};

function createNoPointTemplate(filterType) {
  const text = NoPointsTextType[filterType] ?? NoPointsTextType[FILTER_TYPE.EVERYTHING];
  return (
    `<p class="trip-events__msg">
      ${text}
    </p>`
  );
}

export default class NoPointView extends AbstractView {
  #filterType = null;

  constructor({ filterType }) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoPointTemplate(this.#filterType);
  }
}
