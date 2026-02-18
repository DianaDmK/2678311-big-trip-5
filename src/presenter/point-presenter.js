import RoutePointView from '../view/route-point-view.js';
import EditFormView from '../view/edit-form-view.js';
import { replace, remove, render } from '../framework/render.js';
import { MODE } from '../const.js';

export default class PointPresenter {
  #pointListContainer = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #point = null;
  #destinations = null;
  #offers = null;
  #handleDataChange = null;
  #handleModeChange = null;
  #mode = MODE.DEFAULT;

  constructor({ pointListContainer, onDataChange, onModeChange, destinations, offers }) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  init(point) {
    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;
    this.#point = point;

    this.#pointComponent = new RoutePointView({
      point: this.#point,
      offers: this.#offers,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#pointEditComponent = new EditFormView({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onFormSubmit: this.#handleFormSubmit,
      onFormClose: this.#handleRollupClick,
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if (this.#mode === MODE.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === MODE.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  resetView() {
    if (this.#mode !== MODE.DEFAULT) {
      this.#replaceFormToPoint();
    }
  }

  #replacePointToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = MODE.EDITING;
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = MODE.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({ ...this.#point, isFavorite: !this.#point.isFavorite, });
  };

  #handleEditClick = () => {
    this.#replacePointToForm();
  };

  #handleRollupClick = () => {
    this.#replaceFormToPoint();
  };

  #handleFormSubmit = (point) => {
    this.#handleDataChange(point);
    this.#replaceFormToPoint();
  };
}
