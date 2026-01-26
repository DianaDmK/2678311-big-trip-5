import TripInfoView from '../view/trip-info-view.js';
import EditFormView from '../view/edit-form-view.js';
import FiltersView from '../view/filters-view.js';
import RoutePointView from '../view/route-point-view.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import { render, RenderPosition } from '../render.js';

export default class MainPresenter {
  constructor(tripModel) {
    this.model = tripModel;

    this.tripMainContainer = document.querySelector('.trip-main');
    this.filtersContainer = document.querySelector('.trip-controls__filters');
    this.tripEventsContainer = document.querySelector('.trip-events');
  }

  init() {
    const pointListView = new PointListView();
    const { points, destination, offers } = this.model;

    render(new TripInfoView(), this.tripMainContainer, RenderPosition.AFTERBEGIN);
    render(new FiltersView(), this.filtersContainer);
    render(new SortView(), this.tripEventsContainer, RenderPosition.AFTERBEGIN);
    render(pointListView, this.tripEventsContainer);

    if (points.length > 0) {
      const editFormView = new EditFormView({ point: points[0], destination, offers });
      render(editFormView, pointListView.getElement());
    }
    const safeDestination = Array.isArray(destination) ? destination : [];

    points.forEach((point) => {
      const pointView = new RoutePointView(point, safeDestination);
      render(pointView, pointListView.getElement());
    });
  }
}
