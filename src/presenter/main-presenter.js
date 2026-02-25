import TripInfoView from '../view/trip-info-view.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import { filter } from '../utils.js';
import { remove, render, RenderPosition } from '../framework/render.js';
import { sortPointByDay, sortPointByTime, sortPointByPrice } from '../utils.js';
import { SORT_TYPE, UpdateType, UserAction, FILTER_TYPE } from '../const.js';

export default class MainPresenter {
  #tripModel = null;
  #pointListComponent = new PointListView();
  #tripInfoComponent = new TripInfoView();
  #filtersComponent = null;
  #sortComponent = null;
  #pointPresenters = new Map();
  #newPointPresenter = null;
  #tripMainContainer = null;
  #filtersContainer = null;
  #tripEventsContainer = null;
  #noPointComponent = null;
  #filterModel = null;
  #currentSortType = SORT_TYPE.DAY;
  #filterType = FILTER_TYPE.EVERYTHING;

  constructor({ tripModel, tripMainContainer, filtersContainer, tripEventsContainer, filterModel, onNewPointDestroy }) {
    this.#tripMainContainer = tripMainContainer;
    this.#filtersContainer = filtersContainer;
    this.#tripEventsContainer = tripEventsContainer;
    this.#filterModel = filterModel;

    this.#tripModel = tripModel;

    this.#newPointPresenter = new NewPointPresenter({
      getPointListContainer: () => this.#pointListComponent.element,
      destinations: this.#tripModel.destinations,
      offers: this.#tripModel.offers,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy
    });

    this.#tripModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#tripModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SORT_TYPE.DAY:
        return filteredPoints.sort(sortPointByDay);
      case SORT_TYPE.TIME:
        return filteredPoints.sort(sortPointByTime);
      case SORT_TYPE.PRICE:
        return filteredPoints.sort(sortPointByPrice);
    }

    return filteredPoints;
  }

  init() {
    this.#renderMain();
  }

  createPoint() {
    this.#currentSortType = SORT_TYPE.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FILTER_TYPE.EVERYTHING);
    this.#newPointPresenter.init();
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#tripEventsContainer, RenderPosition.AFTERBEGIN);
  }

  #renderTripInfo() {
    render(this.#tripInfoComponent, this.#tripMainContainer, RenderPosition.AFTERBEGIN);
  }

  #renderMain() {
    render(this.#pointListComponent, this.#tripEventsContainer);
    const points = this.points;
    const pointCount = points.length;

    if (pointCount === 0) {
      this.#noPointComponent = new NoPointView({ filterType: this.#filterModel.filter });
      render(this.#noPointComponent, this.#tripEventsContainer, RenderPosition.AFTERBEGIN);
      return;
    }

    this.#renderPoints(points);
    this.#renderSort();
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
      destinations: this.#tripModel.destinations,
      offers: this.#tripModel.offers
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints(points) {
    points.forEach((point) => this.#renderPoint(point));
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#tripModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#tripModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#tripModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearMain();
        this.#renderMain();
        break;
      case UpdateType.MAJOR:
        this.#clearMain({ resetSortType: true });
        this.#renderMain();
        break;
    }
  };

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearMain();
    this.#renderMain();
  };

  #clearMain({ resetSortType = false } = {}) {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#pointListComponent);
    remove(this.#tripInfoComponent);
    if (this.#filtersComponent) {
      remove(this.#filtersComponent);
    }

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SORT_TYPE.DAY;
    }
  }

}
