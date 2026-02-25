import { remove, render, RenderPosition } from '../framework/render.js';
import EditFormView from '../view/edit-form-view.js';
import { nanoid } from 'nanoid';
import { UserAction, UpdateType } from '../const.js';

export default class NewPointPresenter {
  #getPointListContainer = null;
  #destinations = null;
  #offers = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #pointEditComponent = null;

  constructor({ getPointListContainer, pointListContainer, destinations, offers, onDataChange, onDestroy }) {
    this.#getPointListContainer = getPointListContainer ?? (() => pointListContainer);
    this.#destinations = destinations ?? [];
    this.#offers = offers ?? {};
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#pointEditComponent !== null) {
      return;
    }

    const defaultPoint = {
      type: 'Flight',
      destinationId: this.#destinations[0]?.id ?? null,
      cityName: this.#destinations[0]?.name ?? '',
      startTime: new Date(),
      endTime: new Date(),
      basePrice: 0,
      offers: []
    };

    this.#pointEditComponent = new EditFormView({
      point: defaultPoint,
      destinations: this.#destinations,
      offers: this.#offers,
      onFormSubmit: this.#handleFormSubmit,
      onFormClose: this.#handleFormClose,
      onDeleteClick: this.#handleDeleteClick
    });

    const container = this.#getPointListContainer();
    render(this.#pointEditComponent, container, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      { id: nanoid(), ...point },
    );
    this.destroy();
  };

  #handleFormClose = () => {
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
