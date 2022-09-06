import { render } from './framework/render.js';

import InfoPresenter from './presenter/info-presenter.js';
import BoardPresenter from './presenter/board-presenter.js';

import FilterView from './view/trip-filters-view.js';

import PointModel from './model/point-model.js';
import { generateFilters } from './mock/filter.js';

const pointModel = new PointModel();

const tripMainElement = document.querySelector('.trip-main');
const tripControlsFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const infoPresenter = new InfoPresenter(tripMainElement);
const boardPresenter = new BoardPresenter(tripEventsElement, pointModel);

const filters = generateFilters(pointModel.points);

infoPresenter.init();
render(new FilterView(filters), tripControlsFiltersElement);
boardPresenter.init();


