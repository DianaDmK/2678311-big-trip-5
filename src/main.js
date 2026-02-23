import PointsModel from './model/points-model.js';
import MainPresenter from './presenter/main-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';
import NewPointButtonView from './view/new-point-button-view.js';
import { render } from './framework/render.js';

const tripMainContainer = document.querySelector('.trip-main');
const filtersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const tripModel = new PointsModel();
const filterModel = new FilterModel();
const mainPresenter = new MainPresenter({
  tripMainContainer: tripMainContainer,
  filtersContainer: filtersContainer,
  tripEventsContainer: tripEventsContainer,
  tripModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose
});

const filterPresenter = new FilterPresenter({
  filterContainer: filtersContainer,
  filterModel,
  tripModel
});

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  mainPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

render(newPointButtonComponent, tripMainContainer);

filterPresenter.init();
mainPresenter.init();
