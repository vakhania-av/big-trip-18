import { render } from './render.js';

import BoardPresenter from './presenter/board-presenter.js';
import EventPresenter from './presenter/event-presenter.js';

import InfoView from './view/info-view.js';
import EventEditView from './view/event-edit-view.js';
import EventItemView from './view/event-item-view.js';

import PointModel from './model/point-model.js';

// Константа для отрисовки компонента "Точка маршрута"
const TRIP_EVENTS_COUNT = 3;

const boardPresenter = new BoardPresenter();
const eventPresenter = new EventPresenter();

const pointModel = new PointModel();

const tripMainElement = document.querySelector('.trip-main');
const tripControlsFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

render(new InfoView(), tripEventsElement);

const tripInfoElement = document.querySelector('.trip-info');

boardPresenter.init(tripMainElement, pointModel);
eventPresenter.init(tripEventsElement);

const tripEventsListElement = tripEventsElement.querySelector('.trip-events__list');

render(new EventEditView(), tripEventsListElement, 'afterbegin');

for (let i = 0; i < TRIP_EVENTS_COUNT; i++) {
  render(new EventItemView(), tripEventsListElement);
}

export { tripInfoElement, tripControlsFiltersElement };
