import TripInfoView from '../view/trip-info-view.js';
import FiltersView from '../view/filters-view.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import PointPresenter from './point-presenter.js';
import { render, RenderPosition } from '../framework/render.js';
import { sortPointByDay, sortPointByTime, sortPointByPrice, updateItem } from '../utils.js';
import { SORT_TYPE } from '../const.js';

export default class MainPresenter {
  #tripModel = null;
  #pointListComponent = new PointListView();
  #tripInfoComponent = new TripInfoView();
  #filtersComponent = new FiltersView();
  #sortComponent = null;
  #pointPresenters = new Map();
  #currentSortType = SORT_TYPE.DAY;
  #points = [];

  constructor(tripModel) {
    this.tripMainContainer = document.querySelector('.trip-main');
    this.filtersContainer = document.querySelector('.trip-controls__filters');
    this.tripEventsContainer = document.querySelector('.trip-events');

    this.#tripModel = tripModel;
  }

  init() {
    const { points, destinations, offers } = this.#tripModel;
    this.#points = [...points];

    this.#sortPoints(this.#currentSortType);

    this.#renderTripInfo();
    this.#renderFilters();
    this.#renderSort();
    this.#renderPointList();
    this.#renderPoint(points, destinations, offers);
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.tripEventsContainer, RenderPosition.AFTERBEGIN);
  }

  #renderTripInfo() {
    render(this.#tripInfoComponent, this.tripMainContainer, RenderPosition.AFTERBEGIN);
  }

  #renderFilters() {
    render(this.#filtersComponent, this.filtersContainer);
  }

  #renderPointList() {
    render(this.#pointListComponent, this.tripEventsContainer);
  }

  #renderPoint() {
    this.#points.forEach((point) => {
      const pointPresenter = new PointPresenter({
        pointListContainer: this.#pointListComponent.element,
        onDataChange: this.#handlePointChange,
        onModeChange: this.#handleModeChange,
        destinations: this.#tripModel.destinations,
        offers: this.#tripModel.offers
      });

      pointPresenter.init(point);
      this.#pointPresenters.set(point.id, pointPresenter);
    });
  }

  #handlePointChange = (updatedPoint) => {
    if (!updatedPoint || !updatedPoint.id) {
      return;
    }
    this.#points = updateItem(this.#points, updatedPoint);
    this.#sortPoints(this.#currentSortType);
    this.#clearPointList();
    this.#renderPoint();
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    // this.#sortComponent.updateSortType(sortType);
    this.#clearPointList();
    this.#renderPoint();
  };

  #sortPoints(sortType) {
    switch (sortType) {
      case SORT_TYPE.DAY:
        this.#points.sort(sortPointByDay);
        break;
      case SORT_TYPE.TIME:
        this.#points.sort(sortPointByTime);
        break;
      case SORT_TYPE.PRICE:
        this.#points.sort(sortPointByPrice);
        break;
      default:
        sortType = SORT_TYPE.DAY;
        this.#points = [...this.#points];
        break;
    }

    this.#currentSortType = sortType;
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }
}
