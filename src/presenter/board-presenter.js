import { render, RenderPosition } from '../framework/render.js';

import EventListView from '../view/event-list-view.js';
import SortView from '../view/trip-sort-view.js';
import NoEventView from '../view/no-event-view.js';
import { EMPTY_POINT_MESSAGE } from '../const.js';
import PointPresenter from './point-presenter.js';
import updateItem from '../utils/common.js';

export default class BoardPresenter {

  #container = null;
  #pointModel = null;
  #emptyPointMessage = null;

  #boardPoints = [];

  #listComponent = new EventListView();
  #sortComponent = new SortView();
  #noPointComponent = null;
  #pointPresenter = new Map();

  #points = [];
  #offers = [];
  #destinations = [];

  constructor (container, pointModel) {
    this.#container = container;
    this.#pointModel = pointModel;
  }

  init = () => {
    this.#points = [...this.#pointModel.points];
    this.#offers = [...this.#pointModel.offers];
    this.#destinations = [...this.#pointModel.destinations];

    this.#renderBoard();
  };

  // Отрисовка доски (контейнера)
  #renderBoard = () => {
    this.#renderSort();
    this.#emptyPointMessage = EMPTY_POINT_MESSAGE.EVERYTHING;

    if (!this.#points.length) {
      this.#renderNoPoints(this.#emptyPointMessage);
      return;
    }

    this.#renderPointsList();
  };

  // Отрисовка компонентов точек маршрута и формы редактирования
  #renderPoint = (point, offers, destinations) => {
    const pointPresenter = new PointPresenter(this.#listComponent.element, this.#handlePointChange);
    pointPresenter.init(point, offers, destinations);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #renderPointsList = () => {
    render(this.#listComponent, this.#container);
    this.#renderPoints();
  };

  #handlePointChange = (updatedPoint, offers, destinations) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint, offers, destinations);
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);
  };

  #renderPoints = () => {
    this.#points.forEach((point) => this.#renderPoint(point, this.#offers, this.#destinations));
  };

  #renderNoPoints = (message) => {
    this.#noPointComponent = new NoEventView(message);
    render(this.#noPointComponent, this.#container, RenderPosition.AFTERBEGIN);
  };
}
