import { render } from './framework/render.js';

import InfoPresenter from './presenter/info-presenter.js';
import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';

import PointModel from './model/point-model.js';
import FilterModel from './model/filter-model.js';

import NewPointBtnView from './view/new-point-btn-view.js';

const newPointBtnComponent = new NewPointBtnView();

const pointModel = new PointModel();
const filterModel = new FilterModel();

const tripMainElement = document.querySelector('.trip-main');
const tripControlsFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const infoPresenter = new InfoPresenter(tripMainElement, pointModel);
const boardPresenter = new BoardPresenter(tripEventsElement, pointModel, filterModel);
const filterPresenter = new FilterPresenter(tripControlsFiltersElement, filterModel, pointModel);

const handleCloseNewPointForm = () => {
  newPointBtnComponent.element.disabled = false;
};

const handleNewPointBtnClick = () => {
  boardPresenter.createPoint(handleCloseNewPointForm);
  newPointBtnComponent.element.disabled = true;
};

render(newPointBtnComponent, tripMainElement);
newPointBtnComponent.setClickHandler(handleNewPointBtnClick);

infoPresenter.init();
filterPresenter.init();
boardPresenter.init();


