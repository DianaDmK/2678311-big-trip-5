import TripInfoView from '../view/trip-info-view.js';
// import CreateFormView from '../view/create-form-view.js';
import EditFormView from '../view/edit-form-view.js';
import FiltersView from '../view/filters-view.js';
import RoutePointView from '../view/route-point-view.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import { render, RenderPosition } from '../render.js';


export default class MainPresenter {
  constructor() {
    this.tripMainContainer = document.querySelector('.trip-main');
    this.filtersContainer = document.querySelector('.trip-controls__filters');
    this.tripEventsContainer = document.querySelector('.trip-events');
  }

  init() {
    const pointListView = new PointListView();

    render(new TripInfoView(), this.tripMainContainer, RenderPosition.AFTERBEGIN);
    render(new FiltersView(), this.filtersContainer);
    render(new SortView(), this.tripEventsContainer, RenderPosition.AFTERBEGIN);
    render(pointListView, this.tripEventsContainer);
    render(new EditFormView(), pointListView.getElement());

    for (let i = 0; i < 3; i++) {
      render(new RoutePointView(), pointListView.getElement());
    }
  }
}
