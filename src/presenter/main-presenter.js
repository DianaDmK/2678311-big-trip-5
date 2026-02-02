import TripInfoView from '../view/trip-info-view.js';
import EditFormView from '../view/edit-form-view.js';
import FiltersView from '../view/filters-view.js';
import RoutePointView from '../view/route-point-view.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import { render, RenderPosition, replace } from '../framework/render.js';

export default class MainPresenter {
  #tripModel = null;
  #pointListView = new PointListView();

  constructor(tripModel) {
    this.tripMainContainer = document.querySelector('.trip-main');
    this.filtersContainer = document.querySelector('.trip-controls__filters');
    this.tripEventsContainer = document.querySelector('.trip-events');

    this.#tripModel = tripModel;
  }

  init() {
    const { points, destination, offers } = this.#tripModel;

    render(new TripInfoView(), this.tripMainContainer, RenderPosition.AFTERBEGIN);
    render(new FiltersView(), this.filtersContainer);
    render(new SortView(), this.tripEventsContainer, RenderPosition.AFTERBEGIN);
    render(this.#pointListView, this.tripEventsContainer);

    const pointListViewContainer = this.#pointListView.element;

    points.forEach((point) => {
      this.#renderPointView(point, destination, offers, pointListViewContainer);
    });
  }

  #renderPointView(point, destination, offers) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };
    const pointComponent = new RoutePointView({
      point, destination, offers,
      onEditClick: () => {
        replaceCardToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });
    const pointEditComponent = new EditFormView({
      point, destination, offers,
      onFormSubmit: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replaceCardToForm() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceFormToCard() {
      replace(pointComponent, pointEditComponent);
    }
    render(pointComponent, this.#pointListView.element);
  }
}
